import { OnboardingService } from './onboarding.service';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { SubmitRequirementDto } from './dto/submit-requirement.dto';
import { ReviewSubmissionDto } from './dto/review-submission.dto';
import { BulkSubmitDto } from './dto/bulk-submit.dto';
import { user_role, onboarding_status } from '@prisma/client';
export declare class OnboardingController {
    private onboardingService;
    constructor(onboardingService: OnboardingService);
    createRequirement(createRequirementDto: CreateRequirementDto, req: any): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.user_role;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        fieldType: import(".prisma/client").$Enums.onboarding_field_type;
        isMandatory: boolean;
        description: string | null;
        placeholder: string | null;
        selectOptions: import("@prisma/client/runtime/library").JsonValue | null;
        position: number;
        isActive: boolean;
        isPaymentRelated: boolean | null;
        validationRules: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    getAllRequirements(): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.user_role;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        fieldType: import(".prisma/client").$Enums.onboarding_field_type;
        isMandatory: boolean;
        description: string | null;
        placeholder: string | null;
        selectOptions: import("@prisma/client/runtime/library").JsonValue | null;
        position: number;
        isActive: boolean;
        isPaymentRelated: boolean | null;
        validationRules: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
    getRequirementsByRole(role: user_role): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.user_role;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        fieldType: import(".prisma/client").$Enums.onboarding_field_type;
        isMandatory: boolean;
        description: string | null;
        placeholder: string | null;
        selectOptions: import("@prisma/client/runtime/library").JsonValue | null;
        position: number;
        isActive: boolean;
        isPaymentRelated: boolean | null;
        validationRules: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
    getRequirementById(id: string): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.user_role;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        fieldType: import(".prisma/client").$Enums.onboarding_field_type;
        isMandatory: boolean;
        description: string | null;
        placeholder: string | null;
        selectOptions: import("@prisma/client/runtime/library").JsonValue | null;
        position: number;
        isActive: boolean;
        isPaymentRelated: boolean | null;
        validationRules: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    updateRequirement(id: string, updateRequirementDto: UpdateRequirementDto, req: any): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.user_role;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        fieldType: import(".prisma/client").$Enums.onboarding_field_type;
        isMandatory: boolean;
        description: string | null;
        placeholder: string | null;
        selectOptions: import("@prisma/client/runtime/library").JsonValue | null;
        position: number;
        isActive: boolean;
        isPaymentRelated: boolean | null;
        validationRules: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    deleteRequirement(id: string, req: any): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.user_role;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        fieldType: import(".prisma/client").$Enums.onboarding_field_type;
        isMandatory: boolean;
        description: string | null;
        placeholder: string | null;
        selectOptions: import("@prisma/client/runtime/library").JsonValue | null;
        position: number;
        isActive: boolean;
        isPaymentRelated: boolean | null;
        validationRules: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    submitRequirement(submitRequirementDto: SubmitRequirementDto, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        requirementId: string;
        value: string | null;
        fileUrl: string | null;
        userId: string;
    }>;
    bulkSubmitRequirements(bulkSubmitDto: BulkSubmitDto, req: any): Promise<any[]>;
    getMySubmissions(req: any): Promise<({
        requirement: {
            id: string;
            role: import(".prisma/client").$Enums.user_role;
            createdAt: Date;
            updatedAt: Date;
            label: string;
            fieldType: import(".prisma/client").$Enums.onboarding_field_type;
            isMandatory: boolean;
            description: string | null;
            placeholder: string | null;
            selectOptions: import("@prisma/client/runtime/library").JsonValue | null;
            position: number;
            isActive: boolean;
            isPaymentRelated: boolean | null;
            validationRules: import("@prisma/client/runtime/library").JsonValue | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        requirementId: string;
        value: string | null;
        fileUrl: string | null;
        userId: string;
    })[]>;
    getMyIncompleteSubmissions(req: any): Promise<{
        totalRequirements: number;
        completedRequirements: number;
        incompleteRequirements: {
            id: string;
            role: import(".prisma/client").$Enums.user_role;
            createdAt: Date;
            updatedAt: Date;
            label: string;
            fieldType: import(".prisma/client").$Enums.onboarding_field_type;
            isMandatory: boolean;
            description: string | null;
            placeholder: string | null;
            selectOptions: import("@prisma/client/runtime/library").JsonValue | null;
            position: number;
            isActive: boolean;
            isPaymentRelated: boolean | null;
            validationRules: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
        completionPercentage: number;
    }>;
    getSubmissionById(id: string, req: any): Promise<{
        user: {
            id: string;
            email: string;
            fullName: string;
            role: import(".prisma/client").$Enums.user_role;
            businessName: string;
        };
        requirement: {
            id: string;
            role: import(".prisma/client").$Enums.user_role;
            createdAt: Date;
            updatedAt: Date;
            label: string;
            fieldType: import(".prisma/client").$Enums.onboarding_field_type;
            isMandatory: boolean;
            description: string | null;
            placeholder: string | null;
            selectOptions: import("@prisma/client/runtime/library").JsonValue | null;
            position: number;
            isActive: boolean;
            isPaymentRelated: boolean | null;
            validationRules: import("@prisma/client/runtime/library").JsonValue | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        requirementId: string;
        value: string | null;
        fileUrl: string | null;
        userId: string;
    }>;
    getUserSubmissions(userId: string, req: any): Promise<({
        requirement: {
            id: string;
            role: import(".prisma/client").$Enums.user_role;
            createdAt: Date;
            updatedAt: Date;
            label: string;
            fieldType: import(".prisma/client").$Enums.onboarding_field_type;
            isMandatory: boolean;
            description: string | null;
            placeholder: string | null;
            selectOptions: import("@prisma/client/runtime/library").JsonValue | null;
            position: number;
            isActive: boolean;
            isPaymentRelated: boolean | null;
            validationRules: import("@prisma/client/runtime/library").JsonValue | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        requirementId: string;
        value: string | null;
        fileUrl: string | null;
        userId: string;
    })[]>;
    createReview(reviewSubmissionDto: ReviewSubmissionDto, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.onboarding_status;
        userId: string;
        notes: string | null;
        rejectionReason: string | null;
        adminId: string;
    }>;
    getMyReviews(req: any): Promise<({
        admin: {
            id: string;
            email: string;
            fullName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.onboarding_status;
        userId: string;
        notes: string | null;
        rejectionReason: string | null;
        adminId: string;
    })[]>;
    getAllReviews(req: any): Promise<({
        admin: {
            id: string;
            email: string;
            fullName: string;
        };
        user: {
            id: string;
            email: string;
            fullName: string;
            role: import(".prisma/client").$Enums.user_role;
            businessName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.onboarding_status;
        userId: string;
        notes: string | null;
        rejectionReason: string | null;
        adminId: string;
    })[]>;
    getReviewById(id: string, req: any): Promise<{
        admin: {
            id: string;
            email: string;
            fullName: string;
        };
        user: {
            id: string;
            email: string;
            fullName: string;
            role: import(".prisma/client").$Enums.user_role;
            businessName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.onboarding_status;
        userId: string;
        notes: string | null;
        rejectionReason: string | null;
        adminId: string;
    }>;
    updateUserOnboardingStatus(userId: string, body: {
        status: onboarding_status;
        notes?: string;
        rejectionReason?: string;
    }, req: any): Promise<{
        user: {
            id: string;
            email: string;
            password: string;
            fullName: string | null;
            phone: string | null;
            avatarUrl: string | null;
            role: import(".prisma/client").$Enums.user_role;
            businessName: string | null;
            businessDescription: string | null;
            businessAddress: string | null;
            businessPhone: string | null;
            isVerified: boolean;
            isSuspended: boolean;
            suspendedAt: Date | null;
            suspendedBy: string | null;
            suspensionReason: string | null;
            onboardingStatus: import(".prisma/client").$Enums.onboarding_status | null;
            paymentAccountDetails: import("@prisma/client/runtime/library").JsonValue | null;
            paymentAccountType: string | null;
            paymentDetailsVerified: boolean | null;
            createdAt: Date | null;
            updatedAt: Date | null;
        };
        review: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.onboarding_status;
            userId: string;
            notes: string | null;
            rejectionReason: string | null;
            adminId: string;
        };
    }>;
    getOnboardingStats(req: any): Promise<{
        totalUsers: number;
        usersByStatus: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.ProfileGroupByOutputType, "onboardingStatus"[]> & {
            _count: {
                onboardingStatus: number;
            };
        })[];
        requirementsByRole: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.OnboardingRequirementGroupByOutputType, "role"[]> & {
            _count: {
                role: number;
            };
        })[];
        pendingReviews: number;
    }>;
    getUsersByOnboardingStatus(status: onboarding_status, req: any): Promise<{
        id: string;
        email: string;
        fullName: string;
        role: import(".prisma/client").$Enums.user_role;
        businessName: string;
        onboardingStatus: import(".prisma/client").$Enums.onboarding_status;
        createdAt: Date;
    }[]>;
    getPublicRequirementsByRole(role: user_role): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.user_role;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        fieldType: import(".prisma/client").$Enums.onboarding_field_type;
        isMandatory: boolean;
        description: string | null;
        placeholder: string | null;
        selectOptions: import("@prisma/client/runtime/library").JsonValue | null;
        position: number;
        isActive: boolean;
        isPaymentRelated: boolean | null;
        validationRules: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
}
