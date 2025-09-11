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
exports.CmsController = void 0;
const common_1 = require("@nestjs/common");
const cms_service_1 = require("./cms.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const dto_1 = require("./dto");
let CmsController = class CmsController {
    constructor(cmsService) {
        this.cmsService = cmsService;
    }
    async createBanner(createBannerDto, req) {
        return this.cmsService.createBanner(req.user.role, createBannerDto);
    }
    async getAllBanners(isActive) {
        const isActiveBool = isActive === undefined ? undefined : isActive === 'true';
        return this.cmsService.getAllBanners(isActiveBool);
    }
    async getBannerById(id) {
        return this.cmsService.getBannerById(id);
    }
    async updateBanner(id, updateBannerDto, req) {
        return this.cmsService.updateBanner(id, req.user.role, updateBannerDto);
    }
    async deleteBanner(id, req) {
        return this.cmsService.deleteBanner(id, req.user.role);
    }
    async createFeaturedItem(createFeaturedItemDto, req) {
        return this.cmsService.createFeaturedItem(req.user.role, createFeaturedItemDto);
    }
    async getAllFeaturedItems(isActive) {
        const isActiveBool = isActive === undefined ? undefined : isActive === 'true';
        return this.cmsService.getAllFeaturedItems(isActiveBool);
    }
    async getFeaturedItemById(id) {
        return this.cmsService.getFeaturedItemById(id);
    }
    async updateFeaturedItem(id, updateFeaturedItemDto, req) {
        return this.cmsService.updateFeaturedItem(id, req.user.role, updateFeaturedItemDto);
    }
    async deleteFeaturedItem(id, req) {
        return this.cmsService.deleteFeaturedItem(id, req.user.role);
    }
    async createFooterContent(createFooterContentDto, req) {
        return this.cmsService.createFooterContent(req.user.role, createFooterContentDto);
    }
    async getAllFooterContent(isActive) {
        const isActiveBool = isActive === undefined ? undefined : isActive === 'true';
        return this.cmsService.getAllFooterContent(isActiveBool);
    }
    async getFooterContentBySectionKey(sectionKey) {
        return this.cmsService.getFooterContentBySectionKey(sectionKey);
    }
    async updateFooterContent(sectionKey, updateFooterContentDto, req) {
        return this.cmsService.updateFooterContent(sectionKey, req.user.role, updateFooterContentDto);
    }
    async deleteFooterContent(sectionKey, req) {
        return this.cmsService.deleteFooterContent(sectionKey, req.user.role);
    }
    async createPageBanner(createPageBannerDto, req) {
        return this.cmsService.createPageBanner(req.user.role, createPageBannerDto);
    }
    async getAllPageBanners(isActive) {
        const isActiveBool = isActive === undefined ? undefined : isActive === 'true';
        return this.cmsService.getAllPageBanners(isActiveBool);
    }
    async getPageBannerByRoute(pageRoute) {
        return this.cmsService.getPageBannerByRoute(pageRoute);
    }
    async updatePageBanner(id, updatePageBannerDto, req) {
        return this.cmsService.updatePageBanner(id, req.user.role, updatePageBannerDto);
    }
    async deletePageBanner(id, req) {
        return this.cmsService.deletePageBanner(id, req.user.role);
    }
    async createPopup(createPopupDto, req) {
        return this.cmsService.createPopup(req.user.role, createPopupDto);
    }
    async getAllPopups(isActive) {
        const isActiveBool = isActive === undefined ? undefined : isActive === 'true';
        return this.cmsService.getAllPopups(isActiveBool);
    }
    async getPopupById(id) {
        return this.cmsService.getPopupById(id);
    }
    async updatePopup(id, updatePopupDto, req) {
        return this.cmsService.updatePopup(id, req.user.role, updatePopupDto);
    }
    async deletePopup(id, req) {
        return this.cmsService.deletePopup(id, req.user.role);
    }
    async createThemeSetting(createThemeSettingDto, req) {
        return this.cmsService.createThemeSetting(req.user.role, createThemeSettingDto);
    }
    async getAllThemeSettings(isActive) {
        const isActiveBool = isActive === undefined ? undefined : isActive === 'true';
        return this.cmsService.getAllThemeSettings(isActiveBool);
    }
    async getThemeSettingByKey(settingKey) {
        return this.cmsService.getThemeSettingByKey(settingKey);
    }
    async updateThemeSetting(settingKey, settingValue, req) {
        return this.cmsService.updateThemeSetting(settingKey, req.user.role, settingValue);
    }
    async deleteThemeSetting(settingKey, req) {
        return this.cmsService.deleteThemeSetting(settingKey, req.user.role);
    }
    async createCategoryBanner(createCategoryBannerDto, req) {
        return this.cmsService.createCategoryBanner(req.user.role, createCategoryBannerDto);
    }
    async getAllCategoryBanners(isActive) {
        const isActiveBool = isActive === undefined ? undefined : isActive === 'true';
        return this.cmsService.getAllCategoryBanners(isActiveBool);
    }
    async getCategoryBannersBySlug(categorySlug, isActive) {
        const isActiveBool = isActive === undefined ? true : isActive === 'true';
        return this.cmsService.getCategoryBannersBySlug(categorySlug, isActiveBool);
    }
    async getCategoryBannerById(id) {
        return this.cmsService.getCategoryBannerById(id);
    }
    async updateCategoryBanner(id, updateCategoryBannerDto, req) {
        return this.cmsService.updateCategoryBanner(id, req.user.role, updateCategoryBannerDto);
    }
    async deleteCategoryBanner(id, req) {
        return this.cmsService.deleteCategoryBanner(id, req.user.role);
    }
    async createCategory(createCategoryDto, req) {
        return this.cmsService.createCategory(req.user.role, createCategoryDto);
    }
    async getAllCategories(isActive) {
        const isActiveBool = isActive === undefined ? undefined : isActive === 'true';
        return this.cmsService.getAllCategories(isActiveBool);
    }
    async getCategoryById(id) {
        return this.cmsService.getCategoryById(id);
    }
    async updateCategory(id, updateCategoryDto, req) {
        return this.cmsService.updateCategory(id, req.user.role, updateCategoryDto);
    }
    async deleteCategory(id, req) {
        return this.cmsService.deleteCategory(id, req.user.role);
    }
    async createPromotionalCard(createPromotionalCardDto, req) {
        return this.cmsService.createPromotionalCard(req.user.role, createPromotionalCardDto);
    }
    async getAllPromotionalCards(isActive) {
        const isActiveBool = isActive === undefined ? undefined : isActive === 'true';
        return this.cmsService.getAllPromotionalCards(isActiveBool);
    }
    async getPromotionalCardById(id) {
        return this.cmsService.getPromotionalCardById(id);
    }
    async updatePromotionalCard(id, updatePromotionalCardDto, req) {
        return this.cmsService.updatePromotionalCard(id, req.user.role, updatePromotionalCardDto);
    }
    async deletePromotionalCard(id, req) {
        return this.cmsService.deletePromotionalCard(id, req.user.role);
    }
    async createCmsPage(createCmsPagesDto, req) {
        return this.cmsService.createCmsPage(req.user.role, createCmsPagesDto);
    }
    async getAllCmsPages(isActive) {
        const isActiveBool = isActive === undefined ? undefined : isActive === 'true';
        return this.cmsService.getAllCmsPages(isActiveBool);
    }
    async getCmsPageBySlug(slug) {
        return this.cmsService.getCmsPageBySlug(slug);
    }
    async getCmsPageById(id) {
        return this.cmsService.getCmsPageById(id);
    }
    async updateCmsPage(id, updateCmsPagesDto, req) {
        return this.cmsService.updateCmsPage(id, req.user.role, updateCmsPagesDto);
    }
    async deleteCmsPage(id, req) {
        return this.cmsService.deleteCmsPage(id, req.user.role);
    }
    async getAllCmsData() {
        return this.cmsService.getAllCmsData();
    }
};
exports.CmsController = CmsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('banners'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCmsBannerDto, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createBanner", null);
__decorate([
    (0, common_1.Get)('banners'),
    __param(0, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getAllBanners", null);
__decorate([
    (0, common_1.Get)('banners/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getBannerById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('banners/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCmsBannerDto, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "updateBanner", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('banners/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "deleteBanner", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('featured-items'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCmsFeaturedItemDto, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createFeaturedItem", null);
__decorate([
    (0, common_1.Get)('featured-items'),
    __param(0, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getAllFeaturedItems", null);
__decorate([
    (0, common_1.Get)('featured-items/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getFeaturedItemById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('featured-items/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCmsFeaturedItemDto, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "updateFeaturedItem", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('featured-items/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "deleteFeaturedItem", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('footer-content'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCmsFooterContentDto, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createFooterContent", null);
__decorate([
    (0, common_1.Get)('footer-content'),
    __param(0, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getAllFooterContent", null);
__decorate([
    (0, common_1.Get)('footer-content/section/:sectionKey'),
    __param(0, (0, common_1.Param)('sectionKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getFooterContentBySectionKey", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('footer-content/section/:sectionKey'),
    __param(0, (0, common_1.Param)('sectionKey')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCmsFooterContentDto, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "updateFooterContent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('footer-content/section/:sectionKey'),
    __param(0, (0, common_1.Param)('sectionKey')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "deleteFooterContent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('page-banners'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCmsPageBannerDto, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createPageBanner", null);
__decorate([
    (0, common_1.Get)('page-banners'),
    __param(0, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getAllPageBanners", null);
__decorate([
    (0, common_1.Get)('page-banners/route/:pageRoute'),
    __param(0, (0, common_1.Param)('pageRoute')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getPageBannerByRoute", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('page-banners/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCmsPageBannerDto, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "updatePageBanner", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('page-banners/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "deletePageBanner", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('popups'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCmsPopupDto, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createPopup", null);
__decorate([
    (0, common_1.Get)('popups'),
    __param(0, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getAllPopups", null);
__decorate([
    (0, common_1.Get)('popups/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getPopupById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('popups/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCmsPopupDto, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "updatePopup", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('popups/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "deletePopup", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('theme-settings'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCmsThemeSettingDto, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createThemeSetting", null);
__decorate([
    (0, common_1.Get)('theme-settings'),
    __param(0, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getAllThemeSettings", null);
__decorate([
    (0, common_1.Get)('theme-settings/:settingKey'),
    __param(0, (0, common_1.Param)('settingKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getThemeSettingByKey", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('theme-settings/:settingKey'),
    __param(0, (0, common_1.Param)('settingKey')),
    __param(1, (0, common_1.Body)('settingValue')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "updateThemeSetting", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('theme-settings/:settingKey'),
    __param(0, (0, common_1.Param)('settingKey')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "deleteThemeSetting", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('category-banners'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCmsCategoryBannerDto, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createCategoryBanner", null);
__decorate([
    (0, common_1.Get)('category-banners'),
    __param(0, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getAllCategoryBanners", null);
__decorate([
    (0, common_1.Get)('category-banners/slug/:categorySlug'),
    __param(0, (0, common_1.Param)('categorySlug')),
    __param(1, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getCategoryBannersBySlug", null);
__decorate([
    (0, common_1.Get)('category-banners/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getCategoryBannerById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('category-banners/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCmsCategoryBannerDto, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "updateCategoryBanner", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('category-banners/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "deleteCategoryBanner", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('categories'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCmsCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)('categories'),
    __param(0, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getAllCategories", null);
__decorate([
    (0, common_1.Get)('categories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getCategoryById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('categories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCmsCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('categories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('promotional-cards'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCmsPromotionalCardDto, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createPromotionalCard", null);
__decorate([
    (0, common_1.Get)('promotional-cards'),
    __param(0, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getAllPromotionalCards", null);
__decorate([
    (0, common_1.Get)('promotional-cards/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getPromotionalCardById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('promotional-cards/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCmsPromotionalCardDto, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "updatePromotionalCard", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('promotional-cards/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "deletePromotionalCard", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('pages'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCmsPagesDto, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createCmsPage", null);
__decorate([
    (0, common_1.Get)('pages'),
    __param(0, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getAllCmsPages", null);
__decorate([
    (0, common_1.Get)('pages/slug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getCmsPageBySlug", null);
__decorate([
    (0, common_1.Get)('pages/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getCmsPageById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('pages/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCmsPagesDto, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "updateCmsPage", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('pages/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "deleteCmsPage", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getAllCmsData", null);
exports.CmsController = CmsController = __decorate([
    (0, common_1.Controller)('cms'),
    __metadata("design:paramtypes", [cms_service_1.CmsService])
], CmsController);
//# sourceMappingURL=cms.controller.js.map