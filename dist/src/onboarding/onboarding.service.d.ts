import { PrismaService } from '../prisma/prisma.service';
import { user_role, onboarding_status } from '@prisma/client';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { SubmitRequirementDto } from './dto/submit-requirement.dto';
import { ReviewSubmissionDto } from './dto/review-submission.dto';
import { BulkSubmitDto } from './dto/bulk-submit.dto';
export declare class OnboardingService {
    private prisma;
    constructor(prisma: PrismaService);
    createRequirement(createRequirementDto: CreateRequirementDto): Promise<{
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
    updateRequirement(id: string, updateRequirementDto: UpdateRequirementDto): Promise<{
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
    deleteRequirement(id: string): Promise<{
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
    submitRequirement(userId: string, submitRequirementDto: SubmitRequirementDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        requirementId: string;
        value: string | null;
        fileUrl: string | null;
        userId: string;
    }>;
    bulkSubmitRequirements(userId: string, bulkSubmitDto: BulkSubmitDto): Promise<any[]>;
    getUserSubmissions(userId: string): Promise<({
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
    getUserSubmissionByRequirement(userId: string, requirementId: string): Promise<{
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
    getSubmissionById(id: string): Promise<{
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
    createReview(adminId: string, reviewSubmissionDto: ReviewSubmissionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.onboarding_status;
        userId: string;
        notes: string | null;
        rejectionReason: string | null;
        adminId: string;
    }>;
    getUserReviews(userId: string): Promise<({
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
    getAllReviews(): Promise<({
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
    getReviewById(id: string): Promise<{
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
    updateUserOnboardingStatus(userId: string, status: onboarding_status, adminId: string, notes?: string, rejectionReason?: string): Promise<{
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
    getOnboardingStats(): Promise<{
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
    getUsersByOnboardingStatus(status: onboarding_status): Promise<{
        id: string;
        email: string;
        fullName: string;
        role: import(".prisma/client").$Enums.user_role;
        businessName: string;
        onboardingStatus: import(".prisma/client").$Enums.onboarding_status;
        createdAt: Date;
    }[]>;
    getIncompleteSubmissions(userId: string): Promise<{
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
    validateSubmission(userId: string, requirementId: string, value?: string, fileUrl?: string): Promise<boolean>;
}
