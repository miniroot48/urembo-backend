import { onboarding_status } from '@prisma/client';
export declare class ReviewSubmissionDto {
    userId: string;
    status: onboarding_status;
    notes?: string;
    rejectionReason?: string;
}
