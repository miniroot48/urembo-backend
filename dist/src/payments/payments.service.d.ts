import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { EscrowService } from '../escrow/escrow.service';
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
export declare class PaymentsService {
    private prisma;
    private configService;
    private escrowService;
    private readonly logger;
    private readonly paystackSecretKey;
    private readonly paystackPublicKey;
    private readonly paystackBaseUrl;
    constructor(prisma: PrismaService, configService: ConfigService, escrowService: EscrowService);
    initializePayment(paymentData: PaystackPaymentData): Promise<PaystackResponse>;
    verifyPayment(reference: string): Promise<{
        success: boolean;
        data?: any;
        message?: string;
    }>;
    processPayment(orderId: string, paymentData: PaystackPaymentData): Promise<{
        success: boolean;
        reference?: string;
        authorization_url?: string;
        message?: string;
    }>;
    handlePaymentCallback(reference: string): Promise<{
        success: boolean;
        orderId?: string;
        message?: string;
    }>;
    processRefund(orderId: string, reason: string): Promise<{
        success: boolean;
        message?: string;
    }>;
    getPaymentStats(): Promise<{
        totalTransactions: number;
        totalAmount: number;
        successfulTransactions: number;
        failedTransactions: number;
    }>;
}
