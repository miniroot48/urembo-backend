import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private paymentsService;
    constructor(paymentsService: PaymentsService);
    processPayment(paymentData: any): Promise<{
        success: boolean;
        orderId: string;
        paymentData: any;
    }>;
}
