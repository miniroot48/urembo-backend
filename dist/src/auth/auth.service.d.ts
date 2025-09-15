import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private usersService;
    private emailService;
    constructor(prisma: PrismaService, jwtService: JwtService, usersService: UsersService, emailService: EmailService);
    validateUser(email: string, password: string): Promise<any>;
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            fullName: any;
            role: any;
            businessName: any;
            isVerified: any;
            onboardingStatus: any;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            fullName: string;
            role: import(".prisma/client").$Enums.user_role;
            businessName: string;
            isVerified: boolean;
            onboardingStatus: import(".prisma/client").$Enums.onboarding_status;
        };
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        email: string;
        fullName: string;
        phone: string;
        avatarUrl: string;
        role: import(".prisma/client").$Enums.user_role;
        businessName: string;
        businessDescription: string;
        businessAddress: string;
        businessPhone: string;
        isVerified: boolean;
        isSuspended: boolean;
        suspendedAt: Date;
        suspendedBy: string;
        suspensionReason: string;
        onboardingStatus: import(".prisma/client").$Enums.onboarding_status;
        paymentAccountDetails: import("@prisma/client/runtime/library").JsonValue;
        paymentAccountType: string;
        paymentDetailsVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    refreshToken(userId: string): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.user_role;
        };
    }>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    resendVerificationEmail(userId: string): Promise<{
        message: string;
    }>;
}
