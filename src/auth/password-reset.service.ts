import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

export interface PasswordResetRequest {
  email: string;
  otp: string;
  expiresAt: Date;
}

@Injectable()
export class PasswordResetService {
  private readonly logger = new Logger(PasswordResetService.name);

  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private configService: ConfigService,
  ) {}

  async requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    try {
      // Find user by email
      const user = await this.prisma.profile.findUnique({
        where: { email },
      });

      if (!user) {
        // Don't reveal if email exists or not for security
        return {
          success: true,
          message: 'If an account with this email exists, a password reset OTP has been sent.',
        };
      }

      // Generate 6-digit OTP
      const otp = this.generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Store or update password reset request
      await this.prisma.passwordResetRequest.upsert({
        where: { email },
        update: {
          otp,
          expiresAt,
          createdAt: new Date(),
        },
        create: {
          email,
          otp,
          expiresAt,
        },
      });

      // Send OTP email
      await this.emailService.sendPasswordResetOTPEmail(
        user.email,
        user.fullName || 'User',
        otp,
      );

      this.logger.log(`Password reset OTP sent to ${email}`);
      return {
        success: true,
        message: 'Password reset OTP has been sent to your email.',
      };
    } catch (error) {
      this.logger.error('Error requesting password reset:', error);
      throw new BadRequestException('Failed to process password reset request');
    }
  }

  async verifyOTPAndResetPassword(
    email: string,
    otp: string,
    newPassword: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Find password reset request
      const resetRequest = await this.prisma.passwordResetRequest.findUnique({
        where: { email },
      });

      if (!resetRequest) {
        throw new NotFoundException('Password reset request not found');
      }

      // Check if OTP is expired
      if (new Date() > resetRequest.expiresAt) {
        throw new BadRequestException('OTP has expired. Please request a new one.');
      }

      // Verify OTP
      if (resetRequest.otp !== otp) {
        throw new BadRequestException('Invalid OTP');
      }

      // Find user
      const user = await this.prisma.profile.findUnique({
        where: { email },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Hash new password
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password
      await this.prisma.profile.update({
        where: { email },
        data: { password: hashedPassword },
      });

      // Delete password reset request
      await this.prisma.passwordResetRequest.delete({
        where: { email },
      });

      // Send password changed email
      await this.emailService.sendPasswordChangedEmail(
        user.email,
        user.fullName || 'User',
      );

      this.logger.log(`Password reset completed for ${email}`);
      return {
        success: true,
        message: 'Password has been reset successfully.',
      };
    } catch (error) {
      this.logger.error('Error verifying OTP and resetting password:', error);
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to reset password');
    }
  }

  async verifyOTP(email: string, otp: string): Promise<{ success: boolean; message: string }> {
    try {
      const resetRequest = await this.prisma.passwordResetRequest.findUnique({
        where: { email },
      });

      if (!resetRequest) {
        throw new NotFoundException('Password reset request not found');
      }

      if (new Date() > resetRequest.expiresAt) {
        throw new BadRequestException('OTP has expired');
      }

      if (resetRequest.otp !== otp) {
        throw new BadRequestException('Invalid OTP');
      }

      return {
        success: true,
        message: 'OTP verified successfully',
      };
    } catch (error) {
      this.logger.error('Error verifying OTP:', error);
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to verify OTP');
    }
  }

  private generateOTP(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  async cleanupExpiredRequests(): Promise<void> {
    try {
      await this.prisma.passwordResetRequest.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });
      this.logger.log('Cleaned up expired password reset requests');
    } catch (error) {
      this.logger.error('Error cleaning up expired requests:', error);
    }
  }
}
