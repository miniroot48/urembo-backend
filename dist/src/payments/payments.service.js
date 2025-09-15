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
var PaymentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const escrow_service_1 = require("../escrow/escrow.service");
const axios_1 = require("axios");
let PaymentsService = PaymentsService_1 = class PaymentsService {
    constructor(prisma, configService, escrowService) {
        this.prisma = prisma;
        this.configService = configService;
        this.escrowService = escrowService;
        this.logger = new common_1.Logger(PaymentsService_1.name);
        this.paystackBaseUrl = 'https://api.paystack.co';
        this.paystackSecretKey = this.configService.get('PAYSTACK_SECRET_KEY');
        this.paystackPublicKey = this.configService.get('PAYSTACK_PUBLIC_KEY');
        if (!this.paystackSecretKey || !this.paystackPublicKey) {
            this.logger.error('Paystack keys not configured');
        }
    }
    async initializePayment(paymentData) {
        try {
            const response = await axios_1.default.post(`${this.paystackBaseUrl}/transaction/initialize`, {
                amount: paymentData.amount * 100,
                currency: paymentData.currency,
                email: paymentData.email,
                reference: paymentData.reference,
                metadata: paymentData.metadata,
                callback_url: `${this.configService.get('FRONTEND_URL')}/payment/callback`,
            }, {
                headers: {
                    Authorization: `Bearer ${this.paystackSecretKey}`,
                    'Content-Type': 'application/json',
                },
            });
            return {
                success: true,
                reference: response.data.data.reference,
                authorization_url: response.data.data.authorization_url,
                access_code: response.data.data.access_code,
                message: response.data.message,
            };
        }
        catch (error) {
            this.logger.error('Paystack payment initialization failed:', error.response?.data || error.message);
            return {
                success: false,
                reference: paymentData.reference,
                message: error.response?.data?.message || 'Payment initialization failed',
            };
        }
    }
    async verifyPayment(reference) {
        try {
            const response = await axios_1.default.get(`${this.paystackBaseUrl}/transaction/verify/${reference}`, {
                headers: {
                    Authorization: `Bearer ${this.paystackSecretKey}`,
                },
            });
            const transaction = response.data.data;
            if (transaction.status === 'success') {
                return {
                    success: true,
                    data: transaction,
                    message: 'Payment verified successfully',
                };
            }
            else {
                return {
                    success: false,
                    message: 'Payment not successful',
                };
            }
        }
        catch (error) {
            this.logger.error('Paystack payment verification failed:', error.response?.data || error.message);
            return {
                success: false,
                message: error.response?.data?.message || 'Payment verification failed',
            };
        }
    }
    async processPayment(orderId, paymentData) {
        try {
            const paymentResponse = await this.initializePayment(paymentData);
            if (!paymentResponse.success) {
                return {
                    success: false,
                    message: paymentResponse.message || 'Payment initialization failed',
                };
            }
            await this.prisma.order.update({
                where: { id: orderId },
                data: {
                    paystackReference: paymentResponse.reference,
                    status: 'pending',
                },
            });
            return {
                success: true,
                reference: paymentResponse.reference,
                authorization_url: paymentResponse.authorization_url,
                message: 'Payment initialized successfully',
            };
        }
        catch (error) {
            this.logger.error('Payment processing failed:', error);
            return {
                success: false,
                message: 'Payment processing failed',
            };
        }
    }
    async handlePaymentCallback(reference) {
        try {
            const verification = await this.verifyPayment(reference);
            if (!verification.success) {
                return {
                    success: false,
                    message: verification.message || 'Payment verification failed',
                };
            }
            const order = await this.prisma.order.findFirst({
                where: { paystackReference: reference },
            });
            if (!order) {
                return {
                    success: false,
                    message: 'Order not found',
                };
            }
            await this.prisma.order.update({
                where: { id: order.id },
                data: {
                    status: 'confirmed',
                    confirmedAt: new Date(),
                },
            });
            await this.escrowService.initializeEscrow(order.id, reference);
            return {
                success: true,
                orderId: order.id,
                message: 'Payment processed and escrow initialized',
            };
        }
        catch (error) {
            this.logger.error('Payment callback handling failed:', error);
            return {
                success: false,
                message: 'Payment callback handling failed',
            };
        }
    }
    async processRefund(orderId, reason) {
        try {
            const order = await this.prisma.order.findUnique({
                where: { id: orderId },
            });
            if (!order || !order.paystackReference) {
                return {
                    success: false,
                    message: 'Order or payment reference not found',
                };
            }
            const refundSuccess = await this.escrowService.refundEscrow(orderId, reason);
            return {
                success: refundSuccess,
                message: refundSuccess ? 'Refund processed successfully' : 'Refund processing failed',
            };
        }
        catch (error) {
            this.logger.error('Refund processing failed:', error);
            return {
                success: false,
                message: 'Refund processing failed',
            };
        }
    }
    async getPaymentStats() {
        const stats = await this.prisma.order.aggregate({
            _count: { id: true },
            _sum: { totalAmount: true },
        });
        const successfulStats = await this.prisma.order.aggregate({
            where: { status: 'confirmed' },
            _count: { id: true },
        });
        const failedStats = await this.prisma.order.aggregate({
            where: { status: 'cancelled' },
            _count: { id: true },
        });
        return {
            totalTransactions: stats._count.id || 0,
            totalAmount: Number(stats._sum.totalAmount || 0),
            successfulTransactions: successfulStats._count.id || 0,
            failedTransactions: failedStats._count.id || 0,
        };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = PaymentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        escrow_service_1.EscrowService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map