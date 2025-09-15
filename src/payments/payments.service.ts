import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { EscrowService } from '../escrow/escrow.service';
import axios from 'axios';

export interface PaystackPaymentData {
  amount: number;
  currency: string;
  email: string;
  reference: string;
  metadata?: any;
}

export interface PaystackResponse {
  success: boolean;
  reference: string;
  authorization_url?: string;
  access_code?: string;
  message?: string;
}

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private readonly paystackSecretKey: string;
  private readonly paystackPublicKey: string;
  private readonly paystackBaseUrl = 'https://api.paystack.co';

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private escrowService: EscrowService,
  ) {
    this.paystackSecretKey = this.configService.get<string>('PAYSTACK_SECRET_KEY');
    this.paystackPublicKey = this.configService.get<string>('PAYSTACK_PUBLIC_KEY');
    
    if (!this.paystackSecretKey || !this.paystackPublicKey) {
      this.logger.error('Paystack keys not configured');
    }
  }

  /**
   * Initialize payment with Paystack
   */
  async initializePayment(paymentData: PaystackPaymentData): Promise<PaystackResponse> {
    try {
      const response = await axios.post(
        `${this.paystackBaseUrl}/transaction/initialize`,
        {
          amount: paymentData.amount * 100, // Convert to kobo
          currency: paymentData.currency,
          email: paymentData.email,
          reference: paymentData.reference,
          metadata: paymentData.metadata,
          callback_url: `${this.configService.get('FRONTEND_URL')}/payment/callback`,
        },
        {
          headers: {
            Authorization: `Bearer ${this.paystackSecretKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        reference: response.data.data.reference,
        authorization_url: response.data.data.authorization_url,
        access_code: response.data.data.access_code,
        message: response.data.message,
      };
    } catch (error) {
      this.logger.error('Paystack payment initialization failed:', error.response?.data || error.message);
      return {
        success: false,
        reference: paymentData.reference,
        message: error.response?.data?.message || 'Payment initialization failed',
      };
    }
  }

  /**
   * Verify payment with Paystack
   */
  async verifyPayment(reference: string): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
      const response = await axios.get(
        `${this.paystackBaseUrl}/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${this.paystackSecretKey}`,
          },
        }
      );

      const transaction = response.data.data;
      
      if (transaction.status === 'success') {
        return {
          success: true,
          data: transaction,
          message: 'Payment verified successfully',
        };
      } else {
        return {
          success: false,
          message: 'Payment not successful',
        };
      }
    } catch (error) {
      this.logger.error('Paystack payment verification failed:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'Payment verification failed',
      };
    }
  }

  /**
   * Process payment and initialize escrow
   */
  async processPayment(orderId: string, paymentData: PaystackPaymentData): Promise<{
    success: boolean;
    reference?: string;
    authorization_url?: string;
    message?: string;
  }> {
    try {
      // Initialize payment with Paystack
      const paymentResponse = await this.initializePayment(paymentData);
      
      if (!paymentResponse.success) {
        return {
          success: false,
          message: paymentResponse.message || 'Payment initialization failed',
        };
      }

      // Store payment reference in order
      await this.prisma.order.update({
        where: { id: orderId },
        data: {
          paystackReference: paymentResponse.reference,
          status: 'pending',
        },
      });

      return {
        success: true,
        reference: paymentResponse.reference,
        authorization_url: paymentResponse.authorization_url,
        message: 'Payment initialized successfully',
      };
    } catch (error) {
      this.logger.error('Payment processing failed:', error);
      return {
        success: false,
        message: 'Payment processing failed',
      };
    }
  }

  /**
   * Handle payment callback and initialize escrow
   */
  async handlePaymentCallback(reference: string): Promise<{
    success: boolean;
    orderId?: string;
    message?: string;
  }> {
    try {
      // Verify payment with Paystack
      const verification = await this.verifyPayment(reference);
      
      if (!verification.success) {
        return {
          success: false,
          message: verification.message || 'Payment verification failed',
        };
      }

      // Find order by payment reference
      const order = await this.prisma.order.findFirst({
        where: { paystackReference: reference },
      });

      if (!order) {
        return {
          success: false,
          message: 'Order not found',
        };
      }

      // Update order status
      await this.prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'confirmed',
          confirmedAt: new Date(),
        },
      });

      // Initialize escrow
      await this.escrowService.initializeEscrow(order.id, reference);

      return {
        success: true,
        orderId: order.id,
        message: 'Payment processed and escrow initialized',
      };
    } catch (error) {
      this.logger.error('Payment callback handling failed:', error);
      return {
        success: false,
        message: 'Payment callback handling failed',
      };
    }
  }

  /**
   * Process refund
   */
  async processRefund(orderId: string, reason: string): Promise<{
    success: boolean;
    message?: string;
  }> {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id: orderId },
      });

      if (!order || !order.paystackReference) {
        return {
          success: false,
          message: 'Order or payment reference not found',
        };
      }

      // Process refund through escrow service
      const refundSuccess = await this.escrowService.refundEscrow(orderId, reason);

      return {
        success: refundSuccess,
        message: refundSuccess ? 'Refund processed successfully' : 'Refund processing failed',
      };
    } catch (error) {
      this.logger.error('Refund processing failed:', error);
      return {
        success: false,
        message: 'Refund processing failed',
      };
    }
  }

  /**
   * Get payment statistics
   */
  async getPaymentStats(): Promise<{
    totalTransactions: number;
    totalAmount: number;
    successfulTransactions: number;
    failedTransactions: number;
  }> {
    const stats = await this.prisma.order.aggregate({
      _count: { id: true },
      _sum: { totalAmount: true },
    });

    const successfulStats = await this.prisma.order.aggregate({
      where: { status: 'confirmed' },
      _count: { id: true },
    });

    const failedStats = await this.prisma.order.aggregate({
      where: { status: 'cancelled' },
      _count: { id: true },
    });

    return {
      totalTransactions: stats._count.id || 0,
      totalAmount: Number(stats._sum.totalAmount || 0),
      successfulTransactions: successfulStats._count.id || 0,
      failedTransactions: failedStats._count.id || 0,
    };
  }
}
