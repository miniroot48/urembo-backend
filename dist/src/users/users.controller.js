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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const client_1 = require("@prisma/client");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const suspend_user_dto_1 = require("./dto/suspend-user.dto");
const update_onboarding_status_dto_1 = require("./dto/update-onboarding-status.dto");
const update_payment_details_dto_1 = require("./dto/update-payment-details.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getProfile(req) {
        return this.usersService.findById(req.user.sub);
    }
    async updateProfile(req, updateData) {
        return this.usersService.updateProfile(req.user.sub, updateData);
    }
    async getAllUsers(role, page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return this.usersService.getAllUsers(role, pageNum, limitNum);
    }
    async getUserById(id) {
        return this.usersService.findById(id);
    }
    async verifyUser(id) {
        return this.usersService.verifyUser(id);
    }
    async deleteUser(id) {
        return this.usersService.deleteUser(id);
    }
    async createUser(createData) {
        return this.usersService.createUser(createData);
    }
    async suspendUser(id, body, req) {
        return this.usersService.suspendUser(id, req.user.sub, body.reason);
    }
    async unsuspendUser(id) {
        return this.usersService.unsuspendUser(id);
    }
    async updateOnboardingStatus(id, body) {
        return this.usersService.updateOnboardingStatus(id, body.status);
    }
    async updatePaymentDetails(id, body) {
        return this.usersService.updatePaymentDetails(id, body.paymentAccountDetails, body.paymentAccountType);
    }
    async verifyPaymentDetails(id) {
        return this.usersService.verifyPaymentDetails(id);
    }
    async getUsersByRole(role, page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return this.usersService.getUsersByRole(role, pageNum, limitNum);
    }
    async getSuspendedUsers(page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return this.usersService.getSuspendedUsers(pageNum, limitNum);
    }
    async getUsersByOnboardingStatus(status, page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return this.usersService.getUsersByOnboardingStatus(status, pageNum, limitNum);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('profile'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('role')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Patch)(':id/verify'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "verifyUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Patch)(':id/suspend'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, suspend_user_dto_1.SuspendUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "suspendUser", null);
__decorate([
    (0, common_1.Patch)(':id/unsuspend'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "unsuspendUser", null);
__decorate([
    (0, common_1.Patch)(':id/onboarding-status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_onboarding_status_dto_1.UpdateOnboardingStatusDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateOnboardingStatus", null);
__decorate([
    (0, common_1.Put)(':id/payment-details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_payment_details_dto_1.UpdatePaymentDetailsDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePaymentDetails", null);
__decorate([
    (0, common_1.Patch)(':id/verify-payment'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "verifyPaymentDetails", null);
__decorate([
    (0, common_1.Get)('role/:role'),
    __param(0, (0, common_1.Param)('role')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsersByRole", null);
__decorate([
    (0, common_1.Get)('suspended'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getSuspendedUsers", null);
__decorate([
    (0, common_1.Get)('onboarding/:status'),
    __param(0, (0, common_1.Param)('status')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsersByOnboardingStatus", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map