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
exports.CmsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let CmsService = class CmsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    checkAdminAccess(userRole) {
        if (userRole !== client_1.user_role.admin) {
            throw new common_1.ForbiddenException('Only admins can manage CMS content');
        }
    }
    async createBanner(userRole, createBannerDto) {
        this.checkAdminAccess(userRole);
        return this.prisma.cmsBanner.create({
            data: {
                title: createBannerDto.title,
                subtitle: createBannerDto.subtitle,
                imageUrl: createBannerDto.imageUrl,
                mobileImageUrl: createBannerDto.mobileImageUrl,
                ctaText: createBannerDto.ctaText,
                ctaLink: createBannerDto.ctaLink,
                position: createBannerDto.position || 0,
                isActive: createBannerDto.isActive !== undefined ? createBannerDto.isActive : true,
            },
        });
    }
    async getAllBanners(isActive) {
        const where = isActive !== undefined ? { isActive } : {};
        return this.prisma.cmsBanner.findMany({
            where,
            orderBy: { position: 'asc' },
        });
    }
    async getBannerById(id) {
        const banner = await this.prisma.cmsBanner.findUnique({
            where: { id },
        });
        if (!banner) {
            throw new common_1.NotFoundException('Banner not found');
        }
        return banner;
    }
    async updateBanner(id, userRole, updateBannerDto) {
        this.checkAdminAccess(userRole);
        const existingBanner = await this.prisma.cmsBanner.findUnique({
            where: { id },
        });
        if (!existingBanner) {
            throw new common_1.NotFoundException('Banner not found');
        }
        return this.prisma.cmsBanner.update({
            where: { id },
            data: updateBannerDto,
        });
    }
    async deleteBanner(id, userRole) {
        this.checkAdminAccess(userRole);
        const existingBanner = await this.prisma.cmsBanner.findUnique({
            where: { id },
        });
        if (!existingBanner) {
            throw new common_1.NotFoundException('Banner not found');
        }
        return this.prisma.cmsBanner.delete({
            where: { id },
        });
    }
    async createFeaturedItem(userRole, createFeaturedItemDto) {
        this.checkAdminAccess(userRole);
        return this.prisma.cmsFeaturedItem.create({
            data: {
                itemType: createFeaturedItemDto.itemType,
                itemId: createFeaturedItemDto.itemId,
                position: createFeaturedItemDto.position || 0,
                isActive: createFeaturedItemDto.isActive !== undefined ? createFeaturedItemDto.isActive : true,
            },
        });
    }
    async getAllFeaturedItems(isActive) {
        const where = isActive !== undefined ? { isActive } : {};
        return this.prisma.cmsFeaturedItem.findMany({
            where,
            orderBy: { position: 'asc' },
        });
    }
    async getFeaturedItemById(id) {
        const featuredItem = await this.prisma.cmsFeaturedItem.findUnique({
            where: { id },
        });
        if (!featuredItem) {
            throw new common_1.NotFoundException('Featured item not found');
        }
        return featuredItem;
    }
    async updateFeaturedItem(id, userRole, updateFeaturedItemDto) {
        this.checkAdminAccess(userRole);
        const existingItem = await this.prisma.cmsFeaturedItem.findUnique({
            where: { id },
        });
        if (!existingItem) {
            throw new common_1.NotFoundException('Featured item not found');
        }
        return this.prisma.cmsFeaturedItem.update({
            where: { id },
            data: updateFeaturedItemDto,
        });
    }
    async deleteFeaturedItem(id, userRole) {
        this.checkAdminAccess(userRole);
        const existingItem = await this.prisma.cmsFeaturedItem.findUnique({
            where: { id },
        });
        if (!existingItem) {
            throw new common_1.NotFoundException('Featured item not found');
        }
        return this.prisma.cmsFeaturedItem.delete({
            where: { id },
        });
    }
    async createFooterContent(userRole, createFooterContentDto) {
        this.checkAdminAccess(userRole);
        return this.prisma.cmsFooterContent.create({
            data: {
                sectionKey: createFooterContentDto.sectionKey,
                title: createFooterContentDto.title,
                content: createFooterContentDto.content || {},
                position: createFooterContentDto.position || 0,
                isActive: createFooterContentDto.isActive !== undefined ? createFooterContentDto.isActive : true,
            },
        });
    }
    async getAllFooterContent(isActive) {
        const where = isActive !== undefined ? { isActive } : {};
        return this.prisma.cmsFooterContent.findMany({
            where,
            orderBy: { position: 'asc' },
        });
    }
    async getFooterContentBySectionKey(sectionKey) {
        const footerContent = await this.prisma.cmsFooterContent.findUnique({
            where: { sectionKey },
        });
        if (!footerContent) {
            throw new common_1.NotFoundException('Footer content not found');
        }
        return footerContent;
    }
    async updateFooterContent(sectionKey, userRole, updateFooterContentDto) {
        this.checkAdminAccess(userRole);
        const existingContent = await this.prisma.cmsFooterContent.findUnique({
            where: { sectionKey },
        });
        if (!existingContent) {
            throw new common_1.NotFoundException('Footer content not found');
        }
        return this.prisma.cmsFooterContent.update({
            where: { sectionKey },
            data: updateFooterContentDto,
        });
    }
    async deleteFooterContent(sectionKey, userRole) {
        this.checkAdminAccess(userRole);
        const existingContent = await this.prisma.cmsFooterContent.findUnique({
            where: { sectionKey },
        });
        if (!existingContent) {
            throw new common_1.NotFoundException('Footer content not found');
        }
        return this.prisma.cmsFooterContent.delete({
            where: { sectionKey },
        });
    }
    async createPageBanner(userRole, createPageBannerDto) {
        this.checkAdminAccess(userRole);
        return this.prisma.cmsPageBanner.upsert({
            where: { pageRoute: createPageBannerDto.pageRoute },
            update: {
                title: createPageBannerDto.title,
                subtitle: createPageBannerDto.subtitle,
                imageUrl: createPageBannerDto.imageUrl,
                mobileImageUrl: createPageBannerDto.mobileImageUrl,
                isActive: createPageBannerDto.isActive !== undefined ? createPageBannerDto.isActive : true,
            },
            create: {
                pageRoute: createPageBannerDto.pageRoute,
                title: createPageBannerDto.title,
                subtitle: createPageBannerDto.subtitle,
                imageUrl: createPageBannerDto.imageUrl,
                mobileImageUrl: createPageBannerDto.mobileImageUrl,
                isActive: createPageBannerDto.isActive !== undefined ? createPageBannerDto.isActive : true,
            },
        });
    }
    async getAllPageBanners(isActive) {
        const where = isActive !== undefined ? { isActive } : {};
        return this.prisma.cmsPageBanner.findMany({
            where,
            orderBy: { pageRoute: 'asc' },
        });
    }
    async getPageBannerByRoute(pageRoute) {
        const pageBanner = await this.prisma.cmsPageBanner.findUnique({
            where: { pageRoute },
        });
        if (!pageBanner) {
            throw new common_1.NotFoundException('Page banner not found');
        }
        return pageBanner;
    }
    async updatePageBanner(id, userRole, updatePageBannerDto) {
        this.checkAdminAccess(userRole);
        const existingBanner = await this.prisma.cmsPageBanner.findUnique({
            where: { id },
        });
        if (!existingBanner) {
            throw new common_1.NotFoundException('Page banner not found');
        }
        return this.prisma.cmsPageBanner.update({
            where: { id },
            data: updatePageBannerDto,
        });
    }
    async deletePageBanner(id, userRole) {
        this.checkAdminAccess(userRole);
        const existingBanner = await this.prisma.cmsPageBanner.findUnique({
            where: { id },
        });
        if (!existingBanner) {
            throw new common_1.NotFoundException('Page banner not found');
        }
        return this.prisma.cmsPageBanner.delete({
            where: { id },
        });
    }
    async createPopup(userRole, createPopupDto) {
        this.checkAdminAccess(userRole);
        return this.prisma.cmsPopup.create({
            data: {
                title: createPopupDto.title,
                content: createPopupDto.content,
                popupType: createPopupDto.popupType,
                targetPages: createPopupDto.targetPages || [],
                startDate: createPopupDto.startDate ? new Date(createPopupDto.startDate) : null,
                endDate: createPopupDto.endDate ? new Date(createPopupDto.endDate) : null,
                maxDisplaysPerSession: createPopupDto.maxDisplaysPerSession || 1,
                isActive: createPopupDto.isActive !== undefined ? createPopupDto.isActive : true,
            },
        });
    }
    async getAllPopups(isActive) {
        const where = isActive !== undefined ? { isActive } : {};
        return this.prisma.cmsPopup.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }
    async getPopupById(id) {
        const popup = await this.prisma.cmsPopup.findUnique({
            where: { id },
        });
        if (!popup) {
            throw new common_1.NotFoundException('Popup not found');
        }
        return popup;
    }
    async updatePopup(id, userRole, updatePopupDto) {
        this.checkAdminAccess(userRole);
        const existingPopup = await this.prisma.cmsPopup.findUnique({
            where: { id },
        });
        if (!existingPopup) {
            throw new common_1.NotFoundException('Popup not found');
        }
        const updateData = { ...updatePopupDto };
        if (updatePopupDto.startDate) {
            updateData.startDate = new Date(updatePopupDto.startDate);
        }
        if (updatePopupDto.endDate) {
            updateData.endDate = new Date(updatePopupDto.endDate);
        }
        return this.prisma.cmsPopup.update({
            where: { id },
            data: updateData,
        });
    }
    async deletePopup(id, userRole) {
        this.checkAdminAccess(userRole);
        const existingPopup = await this.prisma.cmsPopup.findUnique({
            where: { id },
        });
        if (!existingPopup) {
            throw new common_1.NotFoundException('Popup not found');
        }
        return this.prisma.cmsPopup.delete({
            where: { id },
        });
    }
    async createThemeSetting(userRole, createThemeSettingDto) {
        this.checkAdminAccess(userRole);
        return this.prisma.cmsThemeSetting.create({
            data: {
                settingKey: createThemeSettingDto.settingKey,
                settingValue: createThemeSettingDto.settingValue,
                settingType: createThemeSettingDto.settingType,
                description: createThemeSettingDto.description,
                isActive: createThemeSettingDto.isActive !== undefined ? createThemeSettingDto.isActive : true,
            },
        });
    }
    async getAllThemeSettings(isActive) {
        const where = isActive !== undefined ? { isActive } : {};
        return this.prisma.cmsThemeSetting.findMany({
            where,
            orderBy: { settingKey: 'asc' },
        });
    }
    async getThemeSettingByKey(settingKey) {
        const themeSetting = await this.prisma.cmsThemeSetting.findUnique({
            where: { settingKey },
        });
        if (!themeSetting) {
            throw new common_1.NotFoundException('Theme setting not found');
        }
        return themeSetting;
    }
    async updateThemeSetting(settingKey, userRole, settingValue) {
        this.checkAdminAccess(userRole);
        const existingSetting = await this.prisma.cmsThemeSetting.findUnique({
            where: { settingKey },
        });
        if (!existingSetting) {
            throw new common_1.NotFoundException('Theme setting not found');
        }
        return this.prisma.cmsThemeSetting.update({
            where: { settingKey },
            data: { settingValue },
        });
    }
    async deleteThemeSetting(settingKey, userRole) {
        this.checkAdminAccess(userRole);
        const existingSetting = await this.prisma.cmsThemeSetting.findUnique({
            where: { settingKey },
        });
        if (!existingSetting) {
            throw new common_1.NotFoundException('Theme setting not found');
        }
        return this.prisma.cmsThemeSetting.delete({
            where: { settingKey },
        });
    }
    async createCategoryBanner(userRole, createCategoryBannerDto) {
        this.checkAdminAccess(userRole);
        return this.prisma.cmsCategoryBanner.create({
            data: {
                categorySlug: createCategoryBannerDto.categorySlug,
                title: createCategoryBannerDto.title,
                subtitle: createCategoryBannerDto.subtitle,
                imageUrl: createCategoryBannerDto.imageUrl,
                mobileImageUrl: createCategoryBannerDto.mobileImageUrl,
                ctaText: createCategoryBannerDto.ctaText,
                ctaUrl: createCategoryBannerDto.ctaUrl,
                position: createCategoryBannerDto.position || 0,
                isActive: createCategoryBannerDto.isActive !== undefined ? createCategoryBannerDto.isActive : true,
            },
        });
    }
    async getAllCategoryBanners(isActive) {
        const where = isActive !== undefined ? { isActive } : {};
        return this.prisma.cmsCategoryBanner.findMany({
            where,
            orderBy: [
                { categorySlug: 'asc' },
                { position: 'asc' },
            ],
        });
    }
    async getCategoryBannersBySlug(categorySlug, isActive = true) {
        return this.prisma.cmsCategoryBanner.findMany({
            where: {
                categorySlug,
                isActive,
            },
            orderBy: { position: 'asc' },
        });
    }
    async getCategoryBannerById(id) {
        const categoryBanner = await this.prisma.cmsCategoryBanner.findUnique({
            where: { id },
        });
        if (!categoryBanner) {
            throw new common_1.NotFoundException('Category banner not found');
        }
        return categoryBanner;
    }
    async updateCategoryBanner(id, userRole, updateCategoryBannerDto) {
        this.checkAdminAccess(userRole);
        const existingBanner = await this.prisma.cmsCategoryBanner.findUnique({
            where: { id },
        });
        if (!existingBanner) {
            throw new common_1.NotFoundException('Category banner not found');
        }
        return this.prisma.cmsCategoryBanner.update({
            where: { id },
            data: updateCategoryBannerDto,
        });
    }
    async deleteCategoryBanner(id, userRole) {
        this.checkAdminAccess(userRole);
        const existingBanner = await this.prisma.cmsCategoryBanner.findUnique({
            where: { id },
        });
        if (!existingBanner) {
            throw new common_1.NotFoundException('Category banner not found');
        }
        return this.prisma.cmsCategoryBanner.delete({
            where: { id },
        });
    }
    async createCategory(userRole, createCategoryDto) {
        this.checkAdminAccess(userRole);
        return this.prisma.cmsCategory.create({
            data: {
                categoryType: createCategoryDto.categoryType,
                imageUrl: createCategoryDto.imageUrl,
                providerCount: createCategoryDto.providerCount,
                position: createCategoryDto.position || 0,
                isActive: createCategoryDto.isActive !== undefined ? createCategoryDto.isActive : true,
                categoryId: createCategoryDto.categoryId,
                subcategoryId: createCategoryDto.subcategoryId,
                productCategoryId: createCategoryDto.productCategoryId,
                productSubcategoryId: createCategoryDto.productSubcategoryId,
            },
        });
    }
    async getAllCategories(isActive) {
        const where = isActive !== undefined ? { isActive } : {};
        return this.prisma.cmsCategory.findMany({
            where,
            orderBy: { position: 'asc' },
        });
    }
    async getCategoryById(id) {
        const category = await this.prisma.cmsCategory.findUnique({
            where: { id },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return category;
    }
    async updateCategory(id, userRole, updateCategoryDto) {
        this.checkAdminAccess(userRole);
        const existingCategory = await this.prisma.cmsCategory.findUnique({
            where: { id },
        });
        if (!existingCategory) {
            throw new common_1.NotFoundException('Category not found');
        }
        return this.prisma.cmsCategory.update({
            where: { id },
            data: updateCategoryDto,
        });
    }
    async deleteCategory(id, userRole) {
        this.checkAdminAccess(userRole);
        const existingCategory = await this.prisma.cmsCategory.findUnique({
            where: { id },
        });
        if (!existingCategory) {
            throw new common_1.NotFoundException('Category not found');
        }
        return this.prisma.cmsCategory.delete({
            where: { id },
        });
    }
    async createPromotionalCard(userRole, createPromotionalCardDto) {
        this.checkAdminAccess(userRole);
        return this.prisma.cmsPromotionalCard.create({
            data: {
                title: createPromotionalCardDto.title,
                subtitle: createPromotionalCardDto.subtitle,
                description: createPromotionalCardDto.description,
                imageUrl: createPromotionalCardDto.imageUrl,
                ctaText: createPromotionalCardDto.ctaText,
                ctaLink: createPromotionalCardDto.ctaLink,
                backgroundColor: createPromotionalCardDto.backgroundColor || '#ffffff',
                textColor: createPromotionalCardDto.textColor || '#000000',
                position: createPromotionalCardDto.position || 0,
                isActive: createPromotionalCardDto.isActive !== undefined ? createPromotionalCardDto.isActive : true,
            },
        });
    }
    async getAllPromotionalCards(isActive) {
        const where = isActive !== undefined ? { isActive } : {};
        return this.prisma.cmsPromotionalCard.findMany({
            where,
            orderBy: { position: 'asc' },
        });
    }
    async getPromotionalCardById(id) {
        const promotionalCard = await this.prisma.cmsPromotionalCard.findUnique({
            where: { id },
        });
        if (!promotionalCard) {
            throw new common_1.NotFoundException('Promotional card not found');
        }
        return promotionalCard;
    }
    async updatePromotionalCard(id, userRole, updatePromotionalCardDto) {
        this.checkAdminAccess(userRole);
        const existingCard = await this.prisma.cmsPromotionalCard.findUnique({
            where: { id },
        });
        if (!existingCard) {
            throw new common_1.NotFoundException('Promotional card not found');
        }
        return this.prisma.cmsPromotionalCard.update({
            where: { id },
            data: updatePromotionalCardDto,
        });
    }
    async deletePromotionalCard(id, userRole) {
        this.checkAdminAccess(userRole);
        const existingCard = await this.prisma.cmsPromotionalCard.findUnique({
            where: { id },
        });
        if (!existingCard) {
            throw new common_1.NotFoundException('Promotional card not found');
        }
        return this.prisma.cmsPromotionalCard.delete({
            where: { id },
        });
    }
    async getAllCmsData() {
        const [banners, featuredItems, footerContent, pageBanners, popups, themeSettings, categoryBanners, categories, promotionalCards,] = await Promise.all([
            this.getAllBanners(true),
            this.getAllFeaturedItems(true),
            this.getAllFooterContent(true),
            this.getAllPageBanners(true),
            this.getAllPopups(true),
            this.getAllThemeSettings(true),
            this.getAllCategoryBanners(true),
            this.getAllCategories(true),
            this.getAllPromotionalCards(true),
        ]);
        return {
            banners,
            featuredItems,
            footerContent,
            pageBanners,
            popups,
            themeSettings,
            categoryBanners,
            categories,
            promotionalCards,
        };
    }
    async createCmsPage(userRole, createCmsPagesDto) {
        this.checkAdminAccess(userRole);
        return this.prisma.cmsPages.create({
            data: {
                title: createCmsPagesDto.title,
                slug: createCmsPagesDto.slug,
                description: createCmsPagesDto.description,
                content: createCmsPagesDto.content,
                contentType: createCmsPagesDto.contentType || 'text',
                pdfUrl: createCmsPagesDto.pdfUrl,
                isActive: createCmsPagesDto.isActive !== undefined ? createCmsPagesDto.isActive : true,
            },
        });
    }
    async getAllCmsPages(isActive) {
        const where = isActive !== undefined ? { isActive } : {};
        return this.prisma.cmsPages.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }
    async getCmsPageBySlug(slug) {
        const cmsPage = await this.prisma.cmsPages.findUnique({
            where: { slug },
        });
        if (!cmsPage) {
            throw new common_1.NotFoundException('CMS page not found');
        }
        return cmsPage;
    }
    async getCmsPageById(id) {
        const cmsPage = await this.prisma.cmsPages.findUnique({
            where: { id },
        });
        if (!cmsPage) {
            throw new common_1.NotFoundException('CMS page not found');
        }
        return cmsPage;
    }
    async updateCmsPage(id, userRole, updateCmsPagesDto) {
        this.checkAdminAccess(userRole);
        const existingPage = await this.prisma.cmsPages.findUnique({
            where: { id },
        });
        if (!existingPage) {
            throw new common_1.NotFoundException('CMS page not found');
        }
        return this.prisma.cmsPages.update({
            where: { id },
            data: updateCmsPagesDto,
        });
    }
    async deleteCmsPage(id, userRole) {
        this.checkAdminAccess(userRole);
        const existingPage = await this.prisma.cmsPages.findUnique({
            where: { id },
        });
        if (!existingPage) {
            throw new common_1.NotFoundException('CMS page not found');
        }
        return this.prisma.cmsPages.delete({
            where: { id },
        });
    }
};
exports.CmsService = CmsService;
exports.CmsService = CmsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CmsService);
//# sourceMappingURL=cms.service.js.map