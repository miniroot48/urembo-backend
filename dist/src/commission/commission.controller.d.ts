import { CommissionService } from './commission.service';
export declare class CommissionController {
    private commissionService;
    constructor(commissionService: CommissionService);
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
    updateCommissionSetting(role: string, body: {
        commissionRate: number;
        isActive?: boolean;
    }, req: any): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.user_role;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        commissionRate: import("@prisma/client/runtime/library").Decimal;
        updatedBy: string | null;
    }>;
    getCommissionTransactions(page?: string, limit?: string, role?: string, status?: string, dateFrom?: string, dateTo?: string): Promise<{
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
    }, req: any): Promise<{
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
    updateCommissionTransactionStatus(id: string, body: {
        paymentStatus: string;
    }, req: any): Promise<{
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
    getUserCommissionTransactions(req: any, page?: string, limit?: string): Promise<{
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
    getUserCommissionStats(req: any): Promise<{
        totalTransactions: number;
        totalCommissionAmount: number;
        paidCommissionAmount: number;
        pendingCommissionAmount: number;
    }>;
    calculateCommission(body: {
        transactionAmount: number;
        role: string;
    }, req: any): Promise<{
        commissionRate: number;
        commissionAmount: number;
    }>;
}
