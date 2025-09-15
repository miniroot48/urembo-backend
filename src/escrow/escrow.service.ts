import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import axios from 'axios';

export interface EscrowTransaction {
  orderId: string;
  customerId: string;
  vendorId: string;
  amount: number;
  currency: string;
  commissionRate: number;
  platformAmount: number;
  vendorAmount: number;
  status: 'pending' | 'held' | 'released' | 'refunded' | 'disputed';
  paystackReference?: string;
  vendorSubaccountId?: string;
  createdAt: Date;
  releasedAt?: Date;
}

export interface PaystackSubaccount {
  id: string;
  subaccount_code: string;
  business_name: string;
  description: string;
  primary_contact_email: string;
  primary_contact_name: string;
  primary_contact_phone: string;
  settlement_bank: string;
  account_number: string;
  percentage_charge: number;
  is_verified: boolean;
}

@Injectable()
export class EscrowService {
  private readonly logger = new Logger(EscrowService.name);
  private readonly paystackSecretKey: string;
  private readonly paystackBaseUrl = 'https://api.paystack.co';

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {
    this.paystackSecretKey = this.configService.get<string>('PAYSTACK_SECRET_KEY');
    if (!this.paystackSecretKey) {
      this.logger.error('PAYSTACK_SECRET_KEY is not configured');
    }
  }

  /**
   * Create a Paystack subaccount for a vendor
   */
  async createVendorSubaccount(vendorData: {
    businessName: string;
    email: string;
    contactName: string;
    phone: string;
    bankCode: string;
    accountNumber: string;
    percentageCharge?: number;
  }): Promise<PaystackSubaccount> {
    try {
      const response = await axios.post(
        `${this.paystackBaseUrl}/subaccount`,
        {
          business_name: vendorData.businessName,
          settlement_bank: vendorData.bankCode,
          account_number: vendorData.accountNumber,
          percentage_charge: vendorData.percentageCharge || 0,
          primary_contact_email: vendorData.email,
          primary_contact_name: vendorData.contactName,
          primary_contact_phone: vendorData.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${this.paystackSecretKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const subaccount = response.data.data;
      
      // Store subaccount info in vendor profile
      await this.prisma.profile.update({
        where: { email: vendorData.email },
        data: {
          paystackSubaccountId: subaccount.subaccount_code,
          paystackSubaccountVerified: subaccount.is_verified,
        },
      });

      this.logger.log(`Created Paystack subaccount for vendor: ${vendorData.businessName}`);
      return subaccount;
    } catch (error) {
      this.logger.error('Failed to create Paystack subaccount:', error.response?.data || error.message);
      throw new Error('Failed to create vendor subaccount');
    }
  }

  /**
   * Initialize escrow for an order
   */
  async initializeEscrow(orderId: string, paymentReference: string): Promise<EscrowTransaction> {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id: orderId },
        include: {
          user: true,
          orderItems: {
            include: {
              product: {
                include: {
                  retailer: true, // Vendor info
                },
              },
            },
          },
        },
      });

      if (!order) {
        throw new Error('Order not found');
      }

      // Calculate commission (default 10% platform fee)
      const commissionRate = 0.10; // 10%
      const platformAmount = Number(order.totalAmount) * commissionRate;
      const vendorAmount = Number(order.totalAmount) - platformAmount;

      // Get vendor's Paystack subaccount
      const vendor = order.orderItems[0]?.product?.retailer;
      if (!vendor) {
        throw new Error('Vendor not found for order');
      }

      const vendorProfile = await this.prisma.profile.findUnique({
        where: { id: vendor.id },
      });

      if (!vendorProfile?.paystackSubaccountId) {
        throw new Error('Vendor does not have a Paystack subaccount');
      }

      // Create escrow transaction
      const escrowTransaction: EscrowTransaction = {
        orderId,
        customerId: order.userId,
        vendorId: vendor.id,
        amount: Number(order.totalAmount),
        currency: order.currency,
        commissionRate,
        platformAmount: Number(platformAmount),
        vendorAmount: Number(vendorAmount),
        status: 'held',
        paystackReference: paymentReference,
        vendorSubaccountId: vendorProfile.paystackSubaccountId,
        createdAt: new Date(),
      };

      // Update order with escrow information
      await this.prisma.order.update({
        where: { id: orderId },
        data: {
          escrowAmount: order.totalAmount,
          escrowStatus: 'held',
          commissionAmount: platformAmount,
          commissionRate: commissionRate,
          autoReleaseAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days auto-release
        },
      });

      // Send escrow notification emails
      await this.sendEscrowNotificationEmails(escrowTransaction);

      this.logger.log(`Escrow initialized for order ${orderId}: ${vendorAmount} to vendor, ${platformAmount} to platform`);
      return escrowTransaction;
    } catch (error) {
      this.logger.error('Failed to initialize escrow:', error);
      throw error;
    }
  }

  /**
   * Release escrow funds to vendor
   */
  async releaseEscrow(orderId: string, reason?: string): Promise<boolean> {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id: orderId },
        include: {
          user: true,
          orderItems: {
            include: {
              product: {
                include: {
                  retailer: true,
                },
              },
            },
          },
        },
      });

      if (!order || order.escrowStatus !== 'held') {
        throw new Error('Order not found or escrow not held');
      }

      const vendor = order.orderItems[0]?.product?.retailer;
      const vendorProfile = await this.prisma.profile.findUnique({
        where: { id: vendor.id },
      });

      if (!vendorProfile?.paystackSubaccountId) {
        throw new Error('Vendor subaccount not found');
      }

      // Transfer funds to vendor's subaccount using Paystack transfer
      const transferResponse = await this.transferToVendor(
        vendorProfile.paystackSubaccountId,
        Number(order.escrowAmount) - Number(order.commissionAmount),
        order.currency,
        `Payment for order ${orderId}`,
        orderId
      );

      if (transferResponse.success) {
        // Update order escrow status
        await this.prisma.order.update({
          where: { id: orderId },
          data: {
            escrowStatus: 'released',
            completedAt: new Date(),
          },
        });

        // Send release notification emails
        await this.sendEscrowReleaseEmails(order, transferResponse.reference);

        this.logger.log(`Escrow released for order ${orderId}: ${transferResponse.amount} transferred to vendor`);
        return true;
      } else {
        throw new Error('Failed to transfer funds to vendor');
      }
    } catch (error) {
      this.logger.error('Failed to release escrow:', error);
      throw error;
    }
  }

  /**
   * Refund escrow funds to customer
   */
  async refundEscrow(orderId: string, reason: string): Promise<boolean> {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id: orderId },
      });

      if (!order || order.escrowStatus !== 'held') {
        throw new Error('Order not found or escrow not held');
      }

      // Process refund through Paystack
      const refundResponse = await this.processRefund(
        order.paystackReference || '',
        Number(order.escrowAmount),
        reason
      );

      if (refundResponse.success) {
        // Update order escrow status
        await this.prisma.order.update({
          where: { id: orderId },
          data: {
            escrowStatus: 'refunded',
            disputedAt: new Date(),
            notes: `${order.notes || ''}\nRefund reason: ${reason}`.trim(),
          },
        });

        // Send refund notification emails
        await this.sendEscrowRefundEmails(order, refundResponse.reference);

        this.logger.log(`Escrow refunded for order ${orderId}: ${refundResponse.amount} refunded to customer`);
        return true;
      } else {
        throw new Error('Failed to process refund');
      }
    } catch (error) {
      this.logger.error('Failed to refund escrow:', error);
      throw error;
    }
  }

  /**
   * Process automatic escrow release for completed orders
   */
  async processAutoRelease(): Promise<void> {
    try {
      const ordersToRelease = await this.prisma.order.findMany({
        where: {
          escrowStatus: 'held',
          autoReleaseAt: {
            lte: new Date(),
          },
          status: 'completed',
        },
      });

      for (const order of ordersToRelease) {
        try {
          await this.releaseEscrow(order.id, 'Automatic release after completion');
          this.logger.log(`Auto-released escrow for order ${order.id}`);
        } catch (error) {
          this.logger.error(`Failed to auto-release escrow for order ${order.id}:`, error);
        }
      }

      this.logger.log(`Processed ${ordersToRelease.length} auto-releases`);
    } catch (error) {
      this.logger.error('Failed to process auto-release:', error);
    }
  }

  /**
   * Get escrow statistics
   */
  async getEscrowStats(): Promise<{
    totalHeld: number;
    totalReleased: number;
    totalRefunded: number;
    pendingOrders: number;
  }> {
    const stats = await this.prisma.order.aggregate({
      where: {
        escrowAmount: { not: null },
      },
      _sum: {
        escrowAmount: true,
      },
    });

    const heldStats = await this.prisma.order.aggregate({
      where: {
        escrowStatus: 'held',
      },
      _sum: {
        escrowAmount: true,
      },
      _count: {
        id: true,
      },
    });

    const releasedStats = await this.prisma.order.aggregate({
      where: {
        escrowStatus: 'released',
      },
      _sum: {
        escrowAmount: true,
      },
    });

    const refundedStats = await this.prisma.order.aggregate({
      where: {
        escrowStatus: 'refunded',
      },
      _sum: {
        escrowAmount: true,
      },
    });

    return {
      totalHeld: Number(heldStats._sum.escrowAmount || 0),
      totalReleased: Number(releasedStats._sum.escrowAmount || 0),
      totalRefunded: Number(refundedStats._sum.escrowAmount || 0),
      pendingOrders: heldStats._count.id || 0,
    };
  }

  // Private helper methods

  private async transferToVendor(
    subaccountId: string,
    amount: number,
    currency: string,
    reason: string,
    orderId: string
  ): Promise<{ success: boolean; reference?: string; amount?: number }> {
    try {
      const response = await axios.post(
        `${this.paystackBaseUrl}/transfer`,
        {
          source: 'balance',
          amount: amount * 100, // Paystack expects amount in kobo
          recipient: subaccountId,
          reason,
          reference: `escrow_${orderId}_${Date.now()}`,
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
        amount,
      };
    } catch (error) {
      this.logger.error('Paystack transfer failed:', error.response?.data || error.message);
      return { success: false };
    }
  }

  private async processRefund(
    paymentReference: string,
    amount: number,
    reason: string
  ): Promise<{ success: boolean; reference?: string; amount?: number }> {
    try {
      const response = await axios.post(
        `${this.paystackBaseUrl}/refund`,
        {
          transaction: paymentReference,
          amount: amount * 100, // Paystack expects amount in kobo
          reason,
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
        amount,
      };
    } catch (error) {
      this.logger.error('Paystack refund failed:', error.response?.data || error.message);
      return { success: false };
    }
  }

  private async sendEscrowNotificationEmails(escrow: EscrowTransaction): Promise<void> {
    try {
      // Send email to customer
      await this.emailService.sendEmail({
        to: 'customer@example.com', // Get from order
        subject: 'Payment Secured in Escrow - Urembo Hub',
        html: `
          <h2>Payment Secured in Escrow</h2>
          <p>Your payment of ${escrow.currency} ${escrow.amount} has been secured in our escrow system.</p>
          <p>Funds will be released to the vendor upon successful completion of your order.</p>
          <p><strong>Order ID:</strong> ${escrow.orderId}</p>
        `,
      });

      // Send email to vendor
      await this.emailService.sendEmail({
        to: 'vendor@example.com', // Get from vendor profile
        subject: 'Payment Received in Escrow - Urembo Hub',
        html: `
          <h2>Payment Received in Escrow</h2>
          <p>A payment of ${escrow.currency} ${escrow.vendorAmount} has been received for your order.</p>
          <p>Funds will be released to your account upon order completion.</p>
          <p><strong>Order ID:</strong> ${escrow.orderId}</p>
        `,
      });
    } catch (error) {
      this.logger.error('Failed to send escrow notification emails:', error);
    }
  }

  private async sendEscrowReleaseEmails(order: any, transferReference: string): Promise<void> {
    try {
      // Send email to vendor
      await this.emailService.sendEmail({
        to: 'vendor@example.com',
        subject: 'Escrow Released - Payment Sent - Urembo Hub',
        html: `
          <h2>Escrow Released - Payment Sent</h2>
          <p>Your payment of ${order.currency} ${Number(order.escrowAmount) - Number(order.commissionAmount)} has been released and sent to your account.</p>
          <p><strong>Transfer Reference:</strong> ${transferReference}</p>
          <p><strong>Order ID:</strong> ${order.id}</p>
        `,
      });
    } catch (error) {
      this.logger.error('Failed to send escrow release emails:', error);
    }
  }

  private async sendEscrowRefundEmails(order: any, refundReference: string): Promise<void> {
    try {
      // Send email to customer
      await this.emailService.sendEmail({
        to: 'customer@example.com',
        subject: 'Escrow Refunded - Urembo Hub',
        html: `
          <h2>Escrow Refunded</h2>
          <p>Your payment of ${order.currency} ${order.escrowAmount} has been refunded to your original payment method.</p>
          <p><strong>Refund Reference:</strong> ${refundReference}</p>
          <p><strong>Order ID:</strong> ${order.id}</p>
        `,
      });
    } catch (error) {
      this.logger.error('Failed to send escrow refund emails:', error);
    }
  }
}
