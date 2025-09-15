"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const email_service_1 = require("../email/email.service");
const client_1 = require("@prisma/client");
let OnboardingService = class OnboardingService {
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async createRequirement(createRequirementDto) {
        return this.prisma.onboardingRequirement.create({
            data: {
                role: createRequirementDto.role,
                label: createRequirementDto.label,
                fieldType: createRequirementDto.fieldType,
                isMandatory: createRequirementDto.isMandatory ?? true,
                description: createRequirementDto.description,
                placeholder: createRequirementDto.placeholder,
                selectOptions: createRequirementDto.selectOptions,
                position: createRequirementDto.position ?? 0,
                isActive: createRequirementDto.isActive ?? true,
                isPaymentRelated: createRequirementDto.isPaymentRelated ?? false,
                validationRules: createRequirementDto.validationRules,
            },
        });
    }
    async getAllRequirements() {
        return this.prisma.onboardingRequirement.findMany({
            orderBy: [
                { role: 'asc' },
                { position: 'asc' },
            ],
        });
    }
    async getRequirementsByRole(role) {
        return this.prisma.onboardingRequirement.findMany({
            where: {
                role,
                isActive: true,
            },
            orderBy: { position: 'asc' },
        });
    }
    async getRequirementById(id) {
        const requirement = await this.prisma.onboardingRequirement.findUnique({
            where: { id },
        });
        if (!requirement) {
            throw new common_1.NotFoundException('Onboarding requirement not found');
        }
        return requirement;
    }
    async updateRequirement(id, updateRequirementDto) {
        const requirement = await this.getRequirementById(id);
        return this.prisma.onboardingRequirement.update({
            where: { id },
            data: {
                role: updateRequirementDto.role,
                label: updateRequirementDto.label,
                fieldType: updateRequirementDto.fieldType,
                isMandatory: updateRequirementDto.isMandatory,
                description: updateRequirementDto.description,
                placeholder: updateRequirementDto.placeholder,
                selectOptions: updateRequirementDto.selectOptions,
                position: updateRequirementDto.position,
                isActive: updateRequirementDto.isActive,
                isPaymentRelated: updateRequirementDto.isPaymentRelated,
                validationRules: updateRequirementDto.validationRules,
            },
        });
    }
    async deleteRequirement(id) {
        await this.getRequirementById(id);
        return this.prisma.onboardingRequirement.delete({
            where: { id },
        });
    }
    async submitRequirement(userId, submitRequirementDto) {
        const requirement = await this.prisma.onboardingRequirement.findFirst({
            where: {
                id: submitRequirementDto.requirementId,
                isActive: true,
            },
        });
        if (!requirement) {
            throw new common_1.NotFoundException('Onboarding requirement not found or inactive');
        }
        const existingSubmission = await this.prisma.onboardingSubmission.findUnique({
            where: {
                userId_requirementId: {
                    userId,
                    requirementId: submitRequirementDto.requirementId,
                },
            },
        });
        if (existingSubmission) {
            return this.prisma.onboardingSubmission.update({
                where: { id: existingSubmission.id },
                data: {
                    value: submitRequirementDto.value,
                    fileUrl: submitRequirementDto.fileUrl,
                },
            });
        }
        else {
            return this.prisma.onboardingSubmission.create({
                data: {
                    userId,
                    requirementId: submitRequirementDto.requirementId,
                    value: submitRequirementDto.value,
                    fileUrl: submitRequirementDto.fileUrl,
                },
            });
        }
    }
    async bulkSubmitRequirements(userId, bulkSubmitDto) {
        const results = [];
        let hasSuccessfulSubmissions = false;
        for (const submission of bulkSubmitDto.submissions) {
            try {
                const result = await this.submitRequirement(userId, submission);
                results.push({ success: true, data: result });
                hasSuccessfulSubmissions = true;
            }
            catch (error) {
                results.push({
                    success: false,
                    error: error.message,
                    requirementId: submission.requirementId
                });
            }
        }
        if (hasSuccessfulSubmissions) {
            await this.prisma.profile.update({
                where: { id: userId },
                data: { onboardingStatus: 'submitted' },
            });
        }
        return results;
    }
    async getUserSubmissions(userId) {
        return this.prisma.onboardingSubmission.findMany({
            where: { userId },
            include: {
                requirement: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getUserSubmissionByRequirement(userId, requirementId) {
        return this.prisma.onboardingSubmission.findUnique({
            where: {
                userId_requirementId: {
                    userId,
                    requirementId,
                },
            },
            include: {
                requirement: true,
            },
        });
    }
    async getSubmissionById(id) {
        const submission = await this.prisma.onboardingSubmission.findUnique({
            where: { id },
            include: {
                requirement: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        role: true,
                        businessName: true,
                    },
                },
            },
        });
        if (!submission) {
            throw new common_1.NotFoundException('Onboarding submission not found');
        }
        return submission;
    }
    async createReview(adminId, reviewSubmissionDto) {
        const user = await this.prisma.profile.findUnique({
            where: { id: reviewSubmissionDto.userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const review = await this.prisma.onboardingReview.create({
            data: {
                userId: reviewSubmissionDto.userId,
                adminId,
                status: reviewSubmissionDto.status,
                notes: reviewSubmissionDto.notes,
                rejectionReason: reviewSubmissionDto.rejectionReason,
            },
        });
        await this.prisma.profile.update({
            where: { id: reviewSubmissionDto.userId },
            data: {
                onboardingStatus: reviewSubmissionDto.status,
            },
        });
        return review;
    }
    async getUserReviews(userId) {
        return this.prisma.onboardingReview.findMany({
            where: { userId },
            include: {
                admin: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getAllReviews() {
        return this.prisma.onboardingReview.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        role: true,
                        businessName: true,
                    },
                },
                admin: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getReviewById(id) {
        const review = await this.prisma.onboardingReview.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        role: true,
                        businessName: true,
                    },
                },
                admin: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                    },
                },
            },
        });
        if (!review) {
            throw new common_1.NotFoundException('Onboarding review not found');
        }
        return review;
    }
    async updateUserOnboardingStatus(userId, status, adminId, notes, rejectionReason) {
        const user = await this.prisma.profile.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const updatedUser = await this.prisma.profile.update({
            where: { id: userId },
            data: {
                onboardingStatus: status,
            },
        });
        const review = await this.prisma.onboardingReview.create({
            data: {
                userId,
                adminId,
                status,
                notes,
                rejectionReason,
            },
        });
        try {
            if (status === client_1.onboarding_status.approved) {
                await this.emailService.sendProfileApprovedEmail(user.email, user.fullName || 'User');
            }
            else if (status === client_1.onboarding_status.rejected) {
                await this.emailService.sendProfileRejectedEmail(user.email, user.fullName || 'User', rejectionReason || 'Profile requirements not met');
            }
        }
        catch (error) {
            console.error('Failed to send onboarding status email:', error);
        }
        return {
            user: updatedUser,
            review,
        };
    }
    async getOnboardingStats() {
        const totalUsers = await this.prisma.profile.count();
        const usersByStatus = await this.prisma.profile.groupBy({
            by: ['onboardingStatus'],
            _count: {
                onboardingStatus: true,
            },
        });
        const requirementsByRole = await this.prisma.onboardingRequirement.groupBy({
            by: ['role'],
            _count: {
                role: true,
            },
            where: {
                isActive: true,
            },
        });
        const pendingReviews = await this.prisma.onboardingReview.count({
            where: {
                status: client_1.onboarding_status.submitted,
            },
        });
        return {
            totalUsers,
            usersByStatus,
            requirementsByRole,
            pendingReviews,
        };
    }
    async getUsersByOnboardingStatus(status) {
        return this.prisma.profile.findMany({
            where: {
                onboardingStatus: status,
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                role: true,
                businessName: true,
                onboardingStatus: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getIncompleteSubmissions(userId) {
        const user = await this.prisma.profile.findUnique({
            where: { id: userId },
            select: { role: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const requirements = await this.prisma.onboardingRequirement.findMany({
            where: {
                role: user.role,
                isActive: true,
                isMandatory: true,
            },
            orderBy: { position: 'asc' },
        });
        const submissions = await this.prisma.onboardingSubmission.findMany({
            where: { userId },
        });
        const submittedRequirementIds = submissions.map(s => s.requirementId);
        const incompleteRequirements = requirements.filter(req => !submittedRequirementIds.includes(req.id));
        return {
            totalRequirements: requirements.length,
            completedRequirements: submissions.length,
            incompleteRequirements,
            completionPercentage: requirements.length > 0 ? (submissions.length / requirements.length) * 100 : 0,
        };
    }
    async validateSubmission(userId, requirementId, value, fileUrl) {
        const requirement = await this.getRequirementById(requirementId);
        const user = await this.prisma.profile.findUnique({
            where: { id: userId },
            select: { role: true },
        });
        if (user?.role !== requirement.role) {
            throw new common_1.ForbiddenException('User role does not match requirement role');
        }
        if (requirement.fieldType === client_1.onboarding_field_type.file && !fileUrl) {
            throw new common_1.BadRequestException('File upload is required for this field type');
        }
        if (requirement.fieldType !== client_1.onboarding_field_type.file && !value) {
            throw new common_1.BadRequestException('Value is required for this field type');
        }
        if (requirement.validationRules) {
        }
        return true;
    }
};
exports.OnboardingService = OnboardingService;
exports.OnboardingService = OnboardingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], OnboardingService);
//# sourceMappingURL=onboarding.service.js.map