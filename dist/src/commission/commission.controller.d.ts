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
}
