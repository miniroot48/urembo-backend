import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    getProfile(req: any): Promise<{
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
    refreshToken(req: any): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.user_role;
        };
    }>;
    changePassword(req: any, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    verifyEmail(verifyEmailDto: VerifyEmailDto): Promise<{
        message: string;
    }>;
    resendVerificationEmail(req: any): Promise<{
        message: string;
    }>;
}
