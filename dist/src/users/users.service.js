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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
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
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }
    async findByEmail(email) {
        return this.prisma.profile.findUnique({
            where: { email },
        });
    }
    async updateProfile(id, updateData) {
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
    async getAllUsers(role, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const where = role ? { role } : {};
        const [users, total] = await Promise.all([
            this.prisma.profile.findMany({
                where,
                skip,
                take: limit,
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
            }),
            this.prisma.profile.count({ where }),
        ]);
        return {
            users,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async verifyUser(id) {
        return this.prisma.profile.update({
            where: { id },
            data: { isVerified: true },
        });
    }
    async deleteUser(id) {
        return this.prisma.profile.delete({
            where: { id },
        });
    }
    async createUser(createData) {
        const existingUser = await this.findByEmail(createData.email);
        if (existingUser) {
            throw new common_1.BadRequestException('User with this email already exists');
        }
        const password = createData.fullName.toLowerCase().trim() + '@123';
        const hashedPassword = await this.hashPassword(password);
        return this.prisma.profile.create({
            data: {
                email: createData.email,
                password: hashedPassword,
                fullName: createData.fullName,
                phone: createData.phone,
                role: createData.role || client_1.user_role.client,
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
    async suspendUser(id, suspendedBy, reason) {
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
    async unsuspendUser(id) {
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
    async updateOnboardingStatus(id, status) {
        return this.prisma.profile.update({
            where: { id },
            data: { onboardingStatus: status },
        });
    }
    async updatePaymentDetails(id, paymentAccountDetails, paymentAccountType) {
        return this.prisma.profile.update({
            where: { id },
            data: {
                paymentAccountDetails,
                paymentAccountType,
                paymentDetailsVerified: false,
            },
        });
    }
    async verifyPaymentDetails(id) {
        return this.prisma.profile.update({
            where: { id },
            data: { paymentDetailsVerified: true },
        });
    }
    async getUsersByRole(role, page = 1, limit = 10) {
        return this.getAllUsers(role, page, limit);
    }
    async getSuspendedUsers(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            this.prisma.profile.findMany({
                where: { isSuspended: true },
                skip,
                take: limit,
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
            }),
            this.prisma.profile.count({ where: { isSuspended: true } }),
        ]);
        return {
            users,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async getUsersByOnboardingStatus(status, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            this.prisma.profile.findMany({
                where: { onboardingStatus: status },
                skip,
                take: limit,
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
            }),
            this.prisma.profile.count({ where: { onboardingStatus: status } }),
        ]);
        return {
            users,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map