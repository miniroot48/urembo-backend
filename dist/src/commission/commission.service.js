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
exports.CommissionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CommissionService = class CommissionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCommissionSettings() {
        return this.prisma.commissionSettings.findMany({
            orderBy: { role: 'asc' },
        });
    }
    async getCommissionSettingByRole(role) {
        const setting = await this.prisma.commissionSettings.findFirst({
            where: { role: role },
        });
        if (!setting) {
            throw new common_1.NotFoundException(`Commission setting for role ${role} not found`);
        }
        return setting;
    }
    async updateCommissionSetting(role, commissionRate, isActive = true) {
        const setting = await this.prisma.commissionSettings.findFirst({
            where: { role: role },
        });
        if (!setting) {
            return this.prisma.commissionSettings.create({
                data: {
                    role: role,
                    commissionRate,
                    isActive,
                },
            });
        }
        return this.prisma.commissionSettings.update({
            where: { id: setting.id },
            data: {
                commissionRate,
                isActive,
            },
        });
    }
    async getCommissionTransactions(page = 1, limit = 10, role, status, dateFrom, dateTo) {
        const skip = (page - 1) * limit;
        const where = {};
        if (role)
            where.businessRole = role;
        if (status)
            where.paymentStatus = status;
        if (dateFrom)
            where.createdAt = { gte: new Date(dateFrom) };
        if (dateTo)
            where.createdAt = { ...where.createdAt, lte: new Date(dateTo) };
        const [transactions, total] = await Promise.all([
            this.prisma.commissionTransaction.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    businessUser: {
                        select: {
                            id: true,
                            fullName: true,
                            email: true,
                            businessName: true,
                        },
                    },
                },
            }),
            this.prisma.commissionTransaction.count({ where }),
        ]);
        return {
            transactions,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async createCommissionTransaction(data) {
        return this.prisma.commissionTransaction.create({
            data: {
                businessUserId: data.businessUserId,
                businessRole: data.businessRole,
                transactionType: data.transactionType,
                transactionId: data.transactionId,
                transactionAmount: data.transactionAmount,
                commissionAmount: data.commissionAmount,
                commissionRate: data.commissionRate,
                paymentStatus: data.paymentStatus,
                paymentMethodId: data.paymentMethodId,
                stripePaymentIntentId: data.stripePaymentIntentId,
                metadata: data.metadata,
            },
            include: {
                businessUser: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        businessName: true,
                    },
                },
            },
        });
    }
    async updateCommissionTransactionStatus(id, paymentStatus) {
        const transaction = await this.prisma.commissionTransaction.findUnique({
            where: { id },
        });
        if (!transaction) {
            throw new common_1.NotFoundException('Commission transaction not found');
        }
        return this.prisma.commissionTransaction.update({
            where: { id },
            data: {
                paymentStatus,
                processedAt: paymentStatus === 'paid' ? new Date() : null,
            },
            include: {
                businessUser: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        businessName: true,
                    },
                },
            },
        });
    }
    async getCommissionStats(role, dateFrom, dateTo) {
        const where = {};
        if (role)
            where.businessRole = role;
        if (dateFrom)
            where.createdAt = { gte: new Date(dateFrom) };
        if (dateTo)
            where.createdAt = { ...where.createdAt, lte: new Date(dateTo) };
        const [totalTransactions, totalCommissionAmount, paidTransactions, pendingTransactions, paidCommissionAmount, pendingCommissionAmount,] = await Promise.all([
            this.prisma.commissionTransaction.count({ where }),
            this.prisma.commissionTransaction.aggregate({
                where,
                _sum: { commissionAmount: true },
            }),
            this.prisma.commissionTransaction.count({
                where: { ...where, paymentStatus: 'paid' },
            }),
            this.prisma.commissionTransaction.count({
                where: { ...where, paymentStatus: 'pending' },
            }),
            this.prisma.commissionTransaction.aggregate({
                where: { ...where, paymentStatus: 'paid' },
                _sum: { commissionAmount: true },
            }),
            this.prisma.commissionTransaction.aggregate({
                where: { ...where, paymentStatus: 'pending' },
                _sum: { commissionAmount: true },
            }),
        ]);
        return {
            totalTransactions,
            totalCommissionAmount: Number(totalCommissionAmount._sum.commissionAmount || 0),
            paidTransactions,
            pendingTransactions,
            paidCommissionAmount: Number(paidCommissionAmount._sum.commissionAmount || 0),
            pendingCommissionAmount: Number(pendingCommissionAmount._sum.commissionAmount || 0),
        };
    }
    async getUserCommissionTransactions(userId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [transactions, total] = await Promise.all([
            this.prisma.commissionTransaction.findMany({
                where: { businessUserId: userId },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.commissionTransaction.count({ where: { businessUserId: userId } }),
        ]);
        return {
            transactions,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async getUserCommissionStats(userId) {
        const [totalTransactions, totalCommissionAmount, paidCommissionAmount, pendingCommissionAmount,] = await Promise.all([
            this.prisma.commissionTransaction.count({ where: { businessUserId: userId } }),
            this.prisma.commissionTransaction.aggregate({
                where: { businessUserId: userId },
                _sum: { commissionAmount: true },
            }),
            this.prisma.commissionTransaction.aggregate({
                where: { businessUserId: userId, paymentStatus: 'paid' },
                _sum: { commissionAmount: true },
            }),
            this.prisma.commissionTransaction.aggregate({
                where: { businessUserId: userId, paymentStatus: 'pending' },
                _sum: { commissionAmount: true },
            }),
        ]);
        return {
            totalTransactions,
            totalCommissionAmount: Number(totalCommissionAmount._sum.commissionAmount || 0),
            paidCommissionAmount: Number(paidCommissionAmount._sum.commissionAmount || 0),
            pendingCommissionAmount: Number(pendingCommissionAmount._sum.commissionAmount || 0),
        };
    }
    async calculateCommission(transactionAmount, role) {
        const setting = await this.getCommissionSettingByRole(role);
        if (!setting.isActive) {
            return { commissionRate: 0, commissionAmount: 0 };
        }
        const commissionAmount = (transactionAmount * Number(setting.commissionRate)) / 100;
        return {
            commissionRate: Number(setting.commissionRate),
            commissionAmount,
        };
    }
};
exports.CommissionService = CommissionService;
exports.CommissionService = CommissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommissionService);
//# sourceMappingURL=commission.service.js.map