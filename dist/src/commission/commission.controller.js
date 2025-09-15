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
exports.CommissionController = void 0;
const common_1 = require("@nestjs/common");
const commission_service_1 = require("./commission.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let CommissionController = class CommissionController {
    constructor(commissionService) {
        this.commissionService = commissionService;
    }
    async getCommissionSettings() {
        return this.commissionService.getCommissionSettings();
    }
    async getCommissionSettingByRole(role) {
        return this.commissionService.getCommissionSettingByRole(role);
    }
    async updateCommissionSetting(role, body, req) {
        return this.commissionService.updateCommissionSetting(role, body.commissionRate, body.isActive);
    }
    async getCommissionTransactions(page, limit, role, status, dateFrom, dateTo) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return this.commissionService.getCommissionTransactions(pageNum, limitNum, role, status, dateFrom, dateTo);
    }
    async createCommissionTransaction(data, req) {
        return this.commissionService.createCommissionTransaction(data);
    }
    async updateCommissionTransactionStatus(id, body, req) {
        return this.commissionService.updateCommissionTransactionStatus(id, body.paymentStatus);
    }
    async getCommissionStats(role, dateFrom, dateTo) {
        return this.commissionService.getCommissionStats(role, dateFrom, dateTo);
    }
    async getUserCommissionTransactions(req, page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return this.commissionService.getUserCommissionTransactions(req.user.sub, pageNum, limitNum);
    }
    async getUserCommissionStats(req) {
        return this.commissionService.getUserCommissionStats(req.user.sub);
    }
    async calculateCommission(body, req) {
        return this.commissionService.calculateCommission(body.transactionAmount, body.role);
    }
};
exports.CommissionController = CommissionController;
__decorate([
    (0, common_1.Get)('settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommissionController.prototype, "getCommissionSettings", null);
__decorate([
    (0, common_1.Get)('settings/:role'),
    __param(0, (0, common_1.Param)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommissionController.prototype, "getCommissionSettingByRole", null);
__decorate([
    (0, common_1.Put)('settings/:role'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('role')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CommissionController.prototype, "updateCommissionSetting", null);
__decorate([
    (0, common_1.Get)('transactions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('role')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Query)('dateFrom')),
    __param(5, (0, common_1.Query)('dateTo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], CommissionController.prototype, "getCommissionTransactions", null);
__decorate([
    (0, common_1.Post)('transactions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommissionController.prototype, "createCommissionTransaction", null);
__decorate([
    (0, common_1.Put)('transactions/:id/status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CommissionController.prototype, "updateCommissionTransactionStatus", null);
__decorate([
    (0, common_1.Get)('stats/overview'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('role')),
    __param(1, (0, common_1.Query)('dateFrom')),
    __param(2, (0, common_1.Query)('dateTo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CommissionController.prototype, "getCommissionStats", null);
__decorate([
    (0, common_1.Get)('my/transactions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], CommissionController.prototype, "getUserCommissionTransactions", null);
__decorate([
    (0, common_1.Get)('my/stats'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommissionController.prototype, "getUserCommissionStats", null);
__decorate([
    (0, common_1.Post)('calculate'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommissionController.prototype, "calculateCommission", null);
exports.CommissionController = CommissionController = __decorate([
    (0, common_1.Controller)('commission'),
    __metadata("design:paramtypes", [commission_service_1.CommissionService])
], CommissionController);
//# sourceMappingURL=commission.controller.js.map