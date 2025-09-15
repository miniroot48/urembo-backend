import { PaymentsService, PaystackPaymentData } from './payments.service';
export declare class PaymentsController {
    private paymentsService;
    constructor(paymentsService: PaymentsService);
    initializePayment(paymentData: PaystackPaymentData): Promise<import("./payments.service").PaystackResponse>;
    processPayment(orderId: string, paymentData: PaystackPaymentData): Promise<{
        success: boolean;
        reference?: string;
        authorization_url?: string;
        message?: string;
    }>;
    verifyPayment(reference: string): Promise<{
        success: boolean;
        data?: any;
        message?: string;
    }>;
    handlePaymentCallback(reference: string): Promise<{
        success: boolean;
        orderId?: string;
        message?: string;
    }>;
    processRefund(orderId: string, body: {
        reason: string;
    }): Promise<{
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
