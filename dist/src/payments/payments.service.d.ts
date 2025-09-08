import { PrismaService } from '../prisma/prisma.service';
export declare class PaymentsService {
    private prisma;
    constructor(prisma: PrismaService);
    processPayment(orderId: string, paymentData: any): Promise<{
        success: boolean;
        orderId: string;
        paymentData: any;
    }>;
}
