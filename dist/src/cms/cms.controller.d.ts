import { CmsService } from './cms.service';
export declare class CmsController {
    private cmsService;
    constructor(cmsService: CmsService);
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
