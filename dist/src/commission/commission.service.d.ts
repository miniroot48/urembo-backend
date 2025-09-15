import { PrismaService } from '../prisma/prisma.service';
export declare class CommissionService {
    private prisma;
    constructor(prisma: PrismaService);
    getCommissionSettings(): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.user_role;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        commissionRate: import("@prisma/client/runtime/library").Decimal;
        updatedBy: string | null;
    }[]>;
    getCommissionSettingByRole(role: string): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.user_role;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        commissionRate: import("@prisma/client/runtime/library").Decimal;
        updatedBy: string | null;
    }>;
    updateCommissionSetting(role: string, commissionRate: number, isActive?: boolean): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.user_role;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        commissionRate: import("@prisma/client/runtime/library").Decimal;
        updatedBy: string | null;
    }>;
    getCommissionTransactions(page?: number, limit?: number, role?: string, status?: string, dateFrom?: string, dateTo?: string): Promise<{
        transactions: ({
            businessUser: {
                id: string;
                email: string;
                fullName: string;
                businessName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            commissionAmount: import("@prisma/client/runtime/library").Decimal;
            commissionRate: import("@prisma/client/runtime/library").Decimal;
            businessUserId: string;
            businessRole: import(".prisma/client").$Enums.user_role;
            transactionType: string;
            transactionId: string;
            transactionAmount: import("@prisma/client/runtime/library").Decimal;
            paymentStatus: string;
            paymentMethodId: string | null;
            stripePaymentIntentId: string | null;
            processedAt: Date | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    createCommissionTransaction(data: {
        businessUserId: string;
        businessRole: string;
        transactionType: string;
        transactionId: string;
        transactionAmount: number;
        commissionAmount: number;
        commissionRate: number;
        paymentStatus: string;
        paymentMethodId?: string;
        stripePaymentIntentId?: string;
        metadata?: any;
    }): Promise<{
        businessUser: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal;
        commissionRate: import("@prisma/client/runtime/library").Decimal;
        businessUserId: string;
        businessRole: import(".prisma/client").$Enums.user_role;
        transactionType: string;
        transactionId: string;
        transactionAmount: import("@prisma/client/runtime/library").Decimal;
        paymentStatus: string;
        paymentMethodId: string | null;
        stripePaymentIntentId: string | null;
        processedAt: Date | null;
    }>;
    updateCommissionTransactionStatus(id: string, paymentStatus: string): Promise<{
        businessUser: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal;
        commissionRate: import("@prisma/client/runtime/library").Decimal;
        businessUserId: string;
        businessRole: import(".prisma/client").$Enums.user_role;
        transactionType: string;
        transactionId: string;
        transactionAmount: import("@prisma/client/runtime/library").Decimal;
        paymentStatus: string;
        paymentMethodId: string | null;
        stripePaymentIntentId: string | null;
        processedAt: Date | null;
    }>;
    getCommissionStats(role?: string, dateFrom?: string, dateTo?: string): Promise<{
        totalTransactions: number;
        totalCommissionAmount: number;
        paidTransactions: number;
        pendingTransactions: number;
        paidCommissionAmount: number;
        pendingCommissionAmount: number;
    }>;
    getUserCommissionTransactions(userId: string, page?: number, limit?: number): Promise<{
        transactions: {
            id: string;
            createdAt: Date;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            commissionAmount: import("@prisma/client/runtime/library").Decimal;
            commissionRate: import("@prisma/client/runtime/library").Decimal;
            businessUserId: string;
            businessRole: import(".prisma/client").$Enums.user_role;
            transactionType: string;
            transactionId: string;
            transactionAmount: import("@prisma/client/runtime/library").Decimal;
            paymentStatus: string;
            paymentMethodId: string | null;
            stripePaymentIntentId: string | null;
            processedAt: Date | null;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getUserCommissionStats(userId: string): Promise<{
        totalTransactions: number;
        totalCommissionAmount: number;
        paidCommissionAmount: number;
        pendingCommissionAmount: number;
    }>;
    calculateCommission(transactionAmount: number, role: string): Promise<{
        commissionRate: number;
        commissionAmount: number;
    }>;
}
