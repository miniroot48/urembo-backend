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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const payments_service_1 = require("./payments.service");
let PaymentsController = class PaymentsController {
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    async initializePayment(paymentData) {
        return this.paymentsService.initializePayment(paymentData);
    }
    async processPayment(orderId, paymentData) {
        return this.paymentsService.processPayment(orderId, paymentData);
    }
    async verifyPayment(reference) {
        return this.paymentsService.verifyPayment(reference);
    }
    async handlePaymentCallback(reference) {
        return this.paymentsService.handlePaymentCallback(reference);
    }
    async processRefund(orderId, body) {
        return this.paymentsService.processRefund(orderId, body.reason);
    }
    async getPaymentStats() {
        return this.paymentsService.getPaymentStats();
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Post)('initialize'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "initializePayment", null);
__decorate([
    (0, common_1.Post)('process/:orderId'),
    __param(0, (0, common_1.Param)('orderId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "processPayment", null);
__decorate([
    (0, common_1.Get)('verify/:reference'),
    __param(0, (0, common_1.Param)('reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "verifyPayment", null);
__decorate([
    (0, common_1.Post)('callback/:reference'),
    __param(0, (0, common_1.Param)('reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "handlePaymentCallback", null);
__decorate([
    (0, common_1.Post)('refund/:orderId'),
    __param(0, (0, common_1.Param)('orderId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "processRefund", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getPaymentStats", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map