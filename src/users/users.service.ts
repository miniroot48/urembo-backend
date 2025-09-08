import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { user_role, onboarding_status } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.profile.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        avatarUrl: true,
        role: true,
        businessName: true,
        businessDescription: true,
        businessAddress: true,
        businessPhone: true,
        isVerified: true,
        isSuspended: true,
        suspendedAt: true,
        suspendedBy: true,
        suspensionReason: true,
        onboardingStatus: true,
        paymentAccountDetails: true,
        paymentAccountType: true,
        paymentDetailsVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async findByEmail(email: string) {
    return this.prisma.profile.findUnique({
      where: { email },
    });
  }

  async updateProfile(id: string, updateData: UpdateProfileDto) {
    return this.prisma.profile.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        avatarUrl: true,
        role: true,
        businessName: true,
        businessDescription: true,
        businessAddress: true,
        businessPhone: true,
        isVerified: true,
        isSuspended: true,
        suspendedAt: true,
        suspendedBy: true,
        suspensionReason: true,
        onboardingStatus: true,
        paymentAccountDetails: true,
        paymentAccountType: true,
        paymentDetailsVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getAllUsers(role?: user_role) {
    const where = role ? { role } : {};
    
    const users = await this.prisma.profile.findMany({
      where,
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        avatarUrl: true,
        role: true,
        businessName: true,
        businessDescription: true,
        businessAddress: true,
        businessPhone: true,
        isVerified: true,
        isSuspended: true,
        suspendedAt: true,
        suspendedBy: true,
        suspensionReason: true,
        onboardingStatus: true,
        paymentAccountDetails: true,
        paymentAccountType: true,
        paymentDetailsVerified: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return users;
  }

  async verifyUser(id: string) {
    return this.prisma.profile.update({
      where: { id },
      data: { isVerified: true },
    });
  }

  async deleteUser(id: string) {
    return this.prisma.profile.delete({
      where: { id },
    });
  }

  async createUser(createData: CreateUserDto) {
    // Check if user already exists
    const existingUser = await this.findByEmail(createData.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const password = createData.fullName.toLowerCase().trim() + '@123';
    const hashedPassword = await this.hashPassword(password);

    return this.prisma.profile.create({
      data: {
        email: createData.email,
        password: hashedPassword,
        fullName: createData.fullName,
        phone: createData.phone,
        role: createData.role || user_role.client,
        businessName: createData.businessName,
        businessDescription: createData.businessDescription,
        businessAddress: createData.businessAddress,
        businessPhone: createData.businessPhone,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        avatarUrl: true,
        role: true,
        businessName: true,
        businessDescription: true,
        businessAddress: true,
        businessPhone: true,
        isVerified: true,
        isSuspended: true,
        onboardingStatus: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async suspendUser(id: string, suspendedBy: string, reason: string) {
    return this.prisma.profile.update({
      where: { id },
      data: {
        isSuspended: true,
        suspendedAt: new Date(),
        suspendedBy,
        suspensionReason: reason,
      },
    });
  }

  async unsuspendUser(id: string) {
    return this.prisma.profile.update({
      where: { id },
      data: {
        isSuspended: false,
        suspendedAt: null,
        suspendedBy: null,
        suspensionReason: null,
      },
    });
  }

  async updateOnboardingStatus(id: string, status: onboarding_status) {
    if (status === onboarding_status.approved) {
      return this.prisma.profile.update({
        where: { id },
        data: { isVerified: true, onboardingStatus: status   },
      });
    }
    return this.prisma.profile.update({
      where: { id },
      data: { onboardingStatus: status },
    });
  }

  async updatePaymentDetails(id: string, paymentAccountDetails: any, paymentAccountType: string) {
    return this.prisma.profile.update({
      where: { id },
      data: {
        paymentAccountDetails,
        paymentAccountType,
        paymentDetailsVerified: false, // Reset verification status when details change
      },
    });
  }

  async verifyPaymentDetails(id: string) {
    return this.prisma.profile.update({
      where: { id },
      data: { paymentDetailsVerified: true },
    });
  }

  async getUsersByRole(role: user_role) {
    return this.getAllUsers(role);
  }

  async getSuspendedUsers() {
    const users = await this.prisma.profile.findMany({
      where: { isSuspended: true },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
        businessName: true,
        isSuspended: true,
        suspendedAt: true,
        suspendedBy: true,
        suspensionReason: true,
        createdAt: true,
      },
      orderBy: { suspendedAt: 'desc' },
    });

    return users;
  }

  async getUsersByOnboardingStatus(status: onboarding_status) {
    const users = await this.prisma.profile.findMany({
      where: { onboardingStatus: status },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
        businessName: true,
        onboardingStatus: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return users;
  }

  async getUnverifiedUsers(limit?: number) {
    const queryOptions: any = {
      where: { isVerified: false },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        avatarUrl: true,
        role: true,
        businessName: true,
        businessDescription: true,
        businessAddress: true,
        businessPhone: true,
        isVerified: true,
        isSuspended: true,
        suspendedAt: true,
        suspendedBy: true,
        suspensionReason: true,
        onboardingStatus: true,
        paymentAccountDetails: true,
        paymentAccountType: true,
        paymentDetailsVerified: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    };

    if (limit && limit > 0) {
      queryOptions.take = limit;
    }

    console.log('queryOptions*******************************', this.prisma.profile.findMany(queryOptions));

    return this.prisma.profile.findMany(queryOptions);
  }
}
