import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { user_role, onboarding_status, onboarding_field_type } from '@prisma/client';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { SubmitRequirementDto } from './dto/submit-requirement.dto';
import { ReviewSubmissionDto } from './dto/review-submission.dto';
import { BulkSubmitDto } from './dto/bulk-submit.dto';

@Injectable()
export class OnboardingService {
  constructor(private prisma: PrismaService) {}

  // Requirements Management
  async createRequirement(createRequirementDto: CreateRequirementDto) {
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

  async getRequirementsByRole(role: user_role) {
    return this.prisma.onboardingRequirement.findMany({
      where: {
        role,
        isActive: true,
      },
      orderBy: { position: 'asc' },
    });
  }

  async getRequirementById(id: string) {
    const requirement = await this.prisma.onboardingRequirement.findUnique({
      where: { id },
    });

    if (!requirement) {
      throw new NotFoundException('Onboarding requirement not found');
    }

    return requirement;
  }

  async updateRequirement(id: string, updateRequirementDto: UpdateRequirementDto) {
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

  async deleteRequirement(id: string) {
    await this.getRequirementById(id);

    return this.prisma.onboardingRequirement.delete({
      where: { id },
    });
  }

  // Submissions Management
  async submitRequirement(userId: string, submitRequirementDto: SubmitRequirementDto) {
    // Verify requirement exists and is active
    const requirement = await this.prisma.onboardingRequirement.findFirst({
      where: {
        id: submitRequirementDto.requirementId,
        isActive: true,
      },
    });

    if (!requirement) {
      throw new NotFoundException('Onboarding requirement not found or inactive');
    }

    // Check if user has already submitted for this requirement
    const existingSubmission = await this.prisma.onboardingSubmission.findUnique({
      where: {
        userId_requirementId: {
          userId,
          requirementId: submitRequirementDto.requirementId,
        },
      },
    });

    if (existingSubmission) {
      // Update existing submission
      return this.prisma.onboardingSubmission.update({
        where: { id: existingSubmission.id },
        data: {
          value: submitRequirementDto.value,
          fileUrl: submitRequirementDto.fileUrl,
        },
      });
    } else {
      // Create new submission
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

  async bulkSubmitRequirements(userId: string, bulkSubmitDto: BulkSubmitDto) {
    const results = [];
    let hasSuccessfulSubmissions = false;

    for (const submission of bulkSubmitDto.submissions) {
      try {
        const result = await this.submitRequirement(userId, submission);
        results.push({ success: true, data: result });
        hasSuccessfulSubmissions = true;
      } catch (error) {
        results.push({ 
          success: false, 
          error: error.message,
          requirementId: submission.requirementId 
        });
      }
    }

    // Update user's onboarding status to submitted if there were successful submissions
    if (hasSuccessfulSubmissions) {
      await this.prisma.profile.update({
        where: { id: userId },
        data: { onboardingStatus: 'submitted' },
      });
    }

    return results;
  }

  async getUserSubmissions(userId: string) {
    return this.prisma.onboardingSubmission.findMany({
      where: { userId },
      include: {
        requirement: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getUserSubmissionByRequirement(userId: string, requirementId: string) {
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

  async getSubmissionById(id: string) {
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
      throw new NotFoundException('Onboarding submission not found');
    }

    return submission;
  }

  // Reviews Management
  async createReview(adminId: string, reviewSubmissionDto: ReviewSubmissionDto) {
    // Verify user exists
    const user = await this.prisma.profile.findUnique({
      where: { id: reviewSubmissionDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Create review
    const review = await this.prisma.onboardingReview.create({
      data: {
        userId: reviewSubmissionDto.userId,
        adminId,
        status: reviewSubmissionDto.status,
        notes: reviewSubmissionDto.notes,
        rejectionReason: reviewSubmissionDto.rejectionReason,
      },
    });

    // Update user's onboarding status
    await this.prisma.profile.update({
      where: { id: reviewSubmissionDto.userId },
      data: {
        onboardingStatus: reviewSubmissionDto.status,
      },
    });

    return review;
  }

  async getUserReviews(userId: string) {
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

  async getReviewById(id: string) {
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
      throw new NotFoundException('Onboarding review not found');
    }

    return review;
  }

  // Onboarding Status Management
  async updateUserOnboardingStatus(userId: string, status: onboarding_status, adminId: string, notes?: string, rejectionReason?: string) {
    // Verify user exists
    const user = await this.prisma.profile.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update user status
    const updatedUser = await this.prisma.profile.update({
      where: { id: userId },
      data: {
        onboardingStatus: status,
      },
    });

    // Create review record
    const review = await this.prisma.onboardingReview.create({
      data: {
        userId,
        adminId,
        status,
        notes,
        rejectionReason,
      },
    });

    return {
      user: updatedUser,
      review,
    };
  }

  // Dashboard and Analytics
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
        status: onboarding_status.submitted,
      },
    });

    return {
      totalUsers,
      usersByStatus,
      requirementsByRole,
      pendingReviews,
    };
  }

  async getUsersByOnboardingStatus(status: onboarding_status) {
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

  async getIncompleteSubmissions(userId: string) {
    // Get user's role
    const user = await this.prisma.profile.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get all active requirements for user's role
    const requirements = await this.prisma.onboardingRequirement.findMany({
      where: {
        role: user.role,
        isActive: true,
        isMandatory: true,
      },
      orderBy: { position: 'asc' },
    });

    // Get user's submissions
    const submissions = await this.prisma.onboardingSubmission.findMany({
      where: { userId },
    });

    // Find incomplete requirements
    const submittedRequirementIds = submissions.map(s => s.requirementId);
    const incompleteRequirements = requirements.filter(
      req => !submittedRequirementIds.includes(req.id)
    );

    return {
      totalRequirements: requirements.length,
      completedRequirements: submissions.length,
      incompleteRequirements,
      completionPercentage: requirements.length > 0 ? (submissions.length / requirements.length) * 100 : 0,
    };
  }

  // Validation helpers
  async validateSubmission(userId: string, requirementId: string, value?: string, fileUrl?: string) {
    const requirement = await this.getRequirementById(requirementId);

    // Check if user has permission to submit for this requirement
    const user = await this.prisma.profile.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (user?.role !== requirement.role) {
      throw new ForbiddenException('User role does not match requirement role');
    }

    // Validate based on field type
    if (requirement.fieldType === onboarding_field_type.file && !fileUrl) {
      throw new BadRequestException('File upload is required for this field type');
    }

    if (requirement.fieldType !== onboarding_field_type.file && !value) {
      throw new BadRequestException('Value is required for this field type');
    }

    // Apply validation rules if present
    if (requirement.validationRules) {
      // TODO: Implement custom validation logic based on validationRules
    }

    return true;
  }
}
