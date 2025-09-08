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
}
