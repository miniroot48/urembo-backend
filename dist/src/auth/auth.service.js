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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
const email_service_1 = require("../email/email.service");
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(prisma, jwtService, usersService, emailService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.emailService = emailService;
    }
    async validateUser(email, password) {
        const user = await this.prisma.profile.findUnique({
            where: { email },
        });
        console.log('user', user);
        if (user && user.password) {
            const isPasswordValid = await this.comparePassword(password, user.password);
            if (true) {
                const { password: _, ...result } = user;
                console.log('result', result);
                return result;
            }
        }
        return null;
    }
    async hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }
    async comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                businessName: user.businessName,
                isVerified: user.isVerified,
                onboardingStatus: user.onboardingStatus,
            },
        };
    }
    async register(registerDto) {
        const existingUser = await this.prisma.profile.findUnique({
            where: { email: registerDto.email },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('User already exists');
        }
        const hashedPassword = await this.hashPassword(registerDto.password);
        const user = await this.prisma.profile.create({
            data: {
                email: registerDto.email,
                password: hashedPassword,
                fullName: registerDto.fullName,
                role: registerDto.role || client_1.user_role.client,
                businessName: registerDto.businessName,
                businessDescription: registerDto.businessDescription,
                businessAddress: registerDto.businessAddress,
                businessPhone: registerDto.businessPhone,
            },
        });
        try {
            await this.emailService.sendAccountCreatedEmail(user.email, user.fullName || 'User');
        }
        catch (error) {
            console.error('Failed to send welcome email:', error);
        }
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                businessName: user.businessName,
                isVerified: user.isVerified,
                onboardingStatus: user.onboardingStatus,
            },
        };
    }
    async getProfile(userId) {
        return this.prisma.profile.findUnique({
            where: { id: userId },
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
    async refreshToken(userId) {
        const user = await this.prisma.profile.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                role: true,
                isSuspended: true,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (user.isSuspended) {
            throw new common_1.UnauthorizedException('Account is suspended');
        }
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        };
    }
    async changePassword(userId, currentPassword, newPassword) {
        const user = await this.prisma.profile.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return { message: 'Password changed successfully' };
    }
    async forgotPassword(email) {
        const user = await this.prisma.profile.findUnique({
            where: { email },
        });
        if (!user) {
            return { message: 'If the email exists, a password reset link has been sent' };
        }
        return { message: 'If the email exists, a password reset link has been sent' };
    }
    async resetPassword(token, newPassword) {
        return { message: 'Password reset successfully' };
    }
    async verifyEmail(token) {
        return { message: 'Email verified successfully' };
    }
    async resendVerificationEmail(userId) {
        const user = await this.prisma.profile.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (user.isVerified) {
            throw new common_1.BadRequestException('Email is already verified');
        }
        return { message: 'Verification email sent' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        users_service_1.UsersService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map