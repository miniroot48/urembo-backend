import { PrismaService } from '../prisma/prisma.service';
export declare class CmsService {
    private prisma;
    constructor(prisma: PrismaService);
    getSettings(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        isActive: boolean;
        settingKey: string;
        settingValue: string;
        settingType: string;
    }[]>;
}
