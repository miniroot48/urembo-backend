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
exports.OnboardingController = void 0;
const common_1 = require("@nestjs/common");
const onboarding_service_1 = require("./onboarding.service");
const create_requirement_dto_1 = require("./dto/create-requirement.dto");
const update_requirement_dto_1 = require("./dto/update-requirement.dto");
const submit_requirement_dto_1 = require("./dto/submit-requirement.dto");
const review_submission_dto_1 = require("./dto/review-submission.dto");
const bulk_submit_dto_1 = require("./dto/bulk-submit.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const client_1 = require("@prisma/client");
let OnboardingController = class OnboardingController {
    constructor(onboardingService) {
        this.onboardingService = onboardingService;
    }
    async createRequirement(createRequirementDto, req) {
        return this.onboardingService.createRequirement(createRequirementDto);
    }
    async getAllRequirements() {
        return this.onboardingService.getAllRequirements();
    }
    async getRequirementsByRole(role) {
        return this.onboardingService.getRequirementsByRole(role);
    }
    async getRequirementById(id) {
        return this.onboardingService.getRequirementById(id);
    }
    async updateRequirement(id, updateRequirementDto, req) {
        return this.onboardingService.updateRequirement(id, updateRequirementDto);
    }
    async deleteRequirement(id, req) {
        return this.onboardingService.deleteRequirement(id);
    }
    async submitRequirement(submitRequirementDto, req) {
        return this.onboardingService.submitRequirement(req.user.sub, submitRequirementDto);
    }
    async bulkSubmitRequirements(bulkSubmitDto, req) {
        console.log('bulkSubmitDto', bulkSubmitDto);
        return this.onboardingService.bulkSubmitRequirements(req.user.sub, bulkSubmitDto);
    }
    async getMySubmissions(req) {
        return this.onboardingService.getUserSubmissions(req.user.sub);
    }
    async getMyIncompleteSubmissions(req) {
        return this.onboardingService.getIncompleteSubmissions(req.user.sub);
    }
    async getSubmissionById(id, req) {
        return this.onboardingService.getSubmissionById(id);
    }
    async getUserSubmissions(userId, req) {
        return this.onboardingService.getUserSubmissions(userId);
    }
    async createReview(reviewSubmissionDto, req) {
        return this.onboardingService.createReview(req.user.sub, reviewSubmissionDto);
    }
    async getMyReviews(req) {
        return this.onboardingService.getUserReviews(req.user.sub);
    }
    async getAllReviews(req) {
        return this.onboardingService.getAllReviews();
    }
    async getReviewById(id, req) {
        return this.onboardingService.getReviewById(id);
    }
    async updateUserOnboardingStatus(userId, body, req) {
        return this.onboardingService.updateUserOnboardingStatus(userId, body.status, req.user.sub, body.notes, body.rejectionReason);
    }
    async getOnboardingStats(req) {
        return this.onboardingService.getOnboardingStats();
    }
    async getUsersByOnboardingStatus(status, req) {
        return this.onboardingService.getUsersByOnboardingStatus(status);
    }
    async getPublicRequirementsByRole(role) {
        return this.onboardingService.getRequirementsByRole(role);
    }
};
exports.OnboardingController = OnboardingController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('requirements'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_requirement_dto_1.CreateRequirementDto, Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "createRequirement", null);
__decorate([
    (0, common_1.Get)('requirements'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getAllRequirements", null);
__decorate([
    (0, common_1.Get)('requirements/role/:role'),
    __param(0, (0, common_1.Param)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getRequirementsByRole", null);
__decorate([
    (0, common_1.Get)('requirements/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getRequirementById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('requirements/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_requirement_dto_1.UpdateRequirementDto, Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "updateRequirement", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('requirements/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "deleteRequirement", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('submissions'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [submit_requirement_dto_1.SubmitRequirementDto, Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "submitRequirement", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('submissions/bulk'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_submit_dto_1.BulkSubmitDto, Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "bulkSubmitRequirements", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('submissions/my'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getMySubmissions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('submissions/my/incomplete'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getMyIncompleteSubmissions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('submissions/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getSubmissionById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('submissions/user/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getUserSubmissions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('reviews'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_submission_dto_1.ReviewSubmissionDto, Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "createReview", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('reviews/my'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getMyReviews", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('reviews'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getAllReviews", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('reviews/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getReviewById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('status/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "updateUserOnboardingStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('stats'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getOnboardingStats", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('users/status/:status'),
    __param(0, (0, common_1.Param)('status')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getUsersByOnboardingStatus", null);
__decorate([
    (0, common_1.Get)('requirements/public/:role'),
    __param(0, (0, common_1.Param)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getPublicRequirementsByRole", null);
exports.OnboardingController = OnboardingController = __decorate([
    (0, common_1.Controller)('onboarding'),
    __metadata("design:paramtypes", [onboarding_service_1.OnboardingService])
], OnboardingController);
//# sourceMappingURL=onboarding.controller.js.map