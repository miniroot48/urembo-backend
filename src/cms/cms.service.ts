import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { user_role } from '@prisma/client';
import {
  CreateCmsBannerDto,
  UpdateCmsBannerDto,
  CreateCmsFeaturedItemDto,
  UpdateCmsFeaturedItemDto,
  CreateCmsFooterContentDto,
  UpdateCmsFooterContentDto,
  CreateCmsPageBannerDto,
  UpdateCmsPageBannerDto,
  CreateCmsPopupDto,
  UpdateCmsPopupDto,
  CreateCmsThemeSettingDto,
  UpdateCmsThemeSettingDto,
  CreateCmsCategoryBannerDto,
  UpdateCmsCategoryBannerDto,
  CreateCmsCategoryDto,
  UpdateCmsCategoryDto,
  CreateCmsPromotionalCardDto,
  UpdateCmsPromotionalCardDto,
  CreateCmsPagesDto,
  UpdateCmsPagesDto,
} from './dto';

@Injectable()
export class CmsService {
  constructor(private prisma: PrismaService) {}

  // Helper method to check admin access
  private checkAdminAccess(userRole: user_role) {
    if (userRole !== user_role.admin) {
      throw new ForbiddenException('Only admins can manage CMS content');
    }
  }

  // Banner Management
  async createBanner(userRole: user_role, createBannerDto: CreateCmsBannerDto) {
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

  async getAllBanners(isActive?: boolean) {
    const where = isActive !== undefined ? { isActive } : {};
    return this.prisma.cmsBanner.findMany({
      where,
      orderBy: { position: 'asc' },
    });
  }

  async getBannerById(id: string) {
    const banner = await this.prisma.cmsBanner.findUnique({
      where: { id },
    });

    if (!banner) {
      throw new NotFoundException('Banner not found');
    }

    return banner;
  }

  async updateBanner(id: string, userRole: user_role, updateBannerDto: UpdateCmsBannerDto) {
    this.checkAdminAccess(userRole);

    const existingBanner = await this.prisma.cmsBanner.findUnique({
      where: { id },
    });

    if (!existingBanner) {
      throw new NotFoundException('Banner not found');
    }

    return this.prisma.cmsBanner.update({
      where: { id },
      data: updateBannerDto,
    });
  }

  async deleteBanner(id: string, userRole: user_role) {
    this.checkAdminAccess(userRole);

    const existingBanner = await this.prisma.cmsBanner.findUnique({
      where: { id },
    });

    if (!existingBanner) {
      throw new NotFoundException('Banner not found');
    }

    return this.prisma.cmsBanner.delete({
      where: { id },
    });
  }

  // Featured Items Management
  async createFeaturedItem(userRole: user_role, createFeaturedItemDto: CreateCmsFeaturedItemDto) {
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

  async getAllFeaturedItems(isActive?: boolean) {
    const where = isActive !== undefined ? { isActive } : {};
    return this.prisma.cmsFeaturedItem.findMany({
      where,
      orderBy: { position: 'asc' },
    });
  }

  async getFeaturedItemById(id: string) {
    const featuredItem = await this.prisma.cmsFeaturedItem.findUnique({
      where: { id },
    });

    if (!featuredItem) {
      throw new NotFoundException('Featured item not found');
    }

    return featuredItem;
  }

  async updateFeaturedItem(id: string, userRole: user_role, updateFeaturedItemDto: UpdateCmsFeaturedItemDto) {
    this.checkAdminAccess(userRole);

    const existingItem = await this.prisma.cmsFeaturedItem.findUnique({
      where: { id },
    });

    if (!existingItem) {
      throw new NotFoundException('Featured item not found');
    }

    return this.prisma.cmsFeaturedItem.update({
      where: { id },
      data: updateFeaturedItemDto,
    });
  }

  async deleteFeaturedItem(id: string, userRole: user_role) {
    this.checkAdminAccess(userRole);

    const existingItem = await this.prisma.cmsFeaturedItem.findUnique({
      where: { id },
    });

    if (!existingItem) {
      throw new NotFoundException('Featured item not found');
    }

    return this.prisma.cmsFeaturedItem.delete({
      where: { id },
    });
  }

  // Footer Content Management
  async createFooterContent(userRole: user_role, createFooterContentDto: CreateCmsFooterContentDto) {
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

  async getAllFooterContent(isActive?: boolean) {
    const where = isActive !== undefined ? { isActive } : {};
    return this.prisma.cmsFooterContent.findMany({
      where,
      orderBy: { position: 'asc' },
    });
  }

  async getFooterContentBySectionKey(sectionKey: string) {
    const footerContent = await this.prisma.cmsFooterContent.findUnique({
      where: { sectionKey },
    });

    if (!footerContent) {
      throw new NotFoundException('Footer content not found');
    }

    return footerContent;
  }

  async updateFooterContent(sectionKey: string, userRole: user_role, updateFooterContentDto: UpdateCmsFooterContentDto) {
    this.checkAdminAccess(userRole);

    const existingContent = await this.prisma.cmsFooterContent.findUnique({
      where: { sectionKey },
    });

    if (!existingContent) {
      throw new NotFoundException('Footer content not found');
    }

    return this.prisma.cmsFooterContent.update({
      where: { sectionKey },
      data: updateFooterContentDto,
    });
  }

  async deleteFooterContent(sectionKey: string, userRole: user_role) {
    this.checkAdminAccess(userRole);

    const existingContent = await this.prisma.cmsFooterContent.findUnique({
      where: { sectionKey },
    });

    if (!existingContent) {
      throw new NotFoundException('Footer content not found');
    }

    return this.prisma.cmsFooterContent.delete({
      where: { sectionKey },
    });
  }

  // Page Banner Management
  async createPageBanner(userRole: user_role, createPageBannerDto: CreateCmsPageBannerDto) {
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

  async getAllPageBanners(isActive?: boolean) {
    const where = isActive !== undefined ? { isActive } : {};
    return this.prisma.cmsPageBanner.findMany({
      where,
      orderBy: { pageRoute: 'asc' },
    });
  }

  async getPageBannerByRoute(pageRoute: string) {
    const pageBanner = await this.prisma.cmsPageBanner.findUnique({
      where: { pageRoute },
    });

    if (!pageBanner) {
      throw new NotFoundException('Page banner not found');
    }

    return pageBanner;
  }

  async updatePageBanner(id: string, userRole: user_role, updatePageBannerDto: UpdateCmsPageBannerDto) {
    this.checkAdminAccess(userRole);

    const existingBanner = await this.prisma.cmsPageBanner.findUnique({
      where: { id },
    });

    if (!existingBanner) {
      throw new NotFoundException('Page banner not found');
    }

    return this.prisma.cmsPageBanner.update({
      where: { id },
      data: updatePageBannerDto,
    });
  }

  async deletePageBanner(id: string, userRole: user_role) {
    this.checkAdminAccess(userRole);

    const existingBanner = await this.prisma.cmsPageBanner.findUnique({
      where: { id },
    });

    if (!existingBanner) {
      throw new NotFoundException('Page banner not found');
    }

    return this.prisma.cmsPageBanner.delete({
      where: { id },
    });
  }

  // Popup Management
  async createPopup(userRole: user_role, createPopupDto: CreateCmsPopupDto) {
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

  async getAllPopups(isActive?: boolean) {
    const where = isActive !== undefined ? { isActive } : {};
    return this.prisma.cmsPopup.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPopupById(id: string) {
    const popup = await this.prisma.cmsPopup.findUnique({
      where: { id },
    });

    if (!popup) {
      throw new NotFoundException('Popup not found');
    }

    return popup;
  }

  async updatePopup(id: string, userRole: user_role, updatePopupDto: UpdateCmsPopupDto) {
    this.checkAdminAccess(userRole);

    const existingPopup = await this.prisma.cmsPopup.findUnique({
      where: { id },
    });

    if (!existingPopup) {
      throw new NotFoundException('Popup not found');
    }

    const updateData: any = { ...updatePopupDto };
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

  async deletePopup(id: string, userRole: user_role) {
    this.checkAdminAccess(userRole);

    const existingPopup = await this.prisma.cmsPopup.findUnique({
      where: { id },
    });

    if (!existingPopup) {
      throw new NotFoundException('Popup not found');
    }

    return this.prisma.cmsPopup.delete({
      where: { id },
    });
  }

  // Theme Settings Management
  async createThemeSetting(userRole: user_role, createThemeSettingDto: CreateCmsThemeSettingDto) {
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

  async getAllThemeSettings(isActive?: boolean) {
    const where = isActive !== undefined ? { isActive } : {};
    return this.prisma.cmsThemeSetting.findMany({
      where,
      orderBy: { settingKey: 'asc' },
    });
  }

  async getThemeSettingByKey(settingKey: string) {
    const themeSetting = await this.prisma.cmsThemeSetting.findUnique({
      where: { settingKey },
    });

    if (!themeSetting) {
      throw new NotFoundException('Theme setting not found');
    }

    return themeSetting;
  }

  async updateThemeSetting(settingKey: string, userRole: user_role, settingValue: string) {
    this.checkAdminAccess(userRole);

    const existingSetting = await this.prisma.cmsThemeSetting.findUnique({
      where: { settingKey },
    });

    if (!existingSetting) {
      throw new NotFoundException('Theme setting not found');
    }

    return this.prisma.cmsThemeSetting.update({
      where: { settingKey },
      data: { settingValue },
    });
  }

  async deleteThemeSetting(settingKey: string, userRole: user_role) {
    this.checkAdminAccess(userRole);

    const existingSetting = await this.prisma.cmsThemeSetting.findUnique({
      where: { settingKey },
    });

    if (!existingSetting) {
      throw new NotFoundException('Theme setting not found');
    }

    return this.prisma.cmsThemeSetting.delete({
      where: { settingKey },
    });
  }

  // Category Banner Management
  async createCategoryBanner(userRole: user_role, createCategoryBannerDto: CreateCmsCategoryBannerDto) {
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

  async getAllCategoryBanners(isActive?: boolean) {
    const where = isActive !== undefined ? { isActive } : {};
    return this.prisma.cmsCategoryBanner.findMany({
      where,
      orderBy: [
        { categorySlug: 'asc' },
        { position: 'asc' },
      ],
    });
  }

  async getCategoryBannersBySlug(categorySlug: string, isActive = true) {
    return this.prisma.cmsCategoryBanner.findMany({
      where: {
        categorySlug,
        isActive,
      },
      orderBy: { position: 'asc' },
    });
  }

  async getCategoryBannerById(id: string) {
    const categoryBanner = await this.prisma.cmsCategoryBanner.findUnique({
      where: { id },
    });

    if (!categoryBanner) {
      throw new NotFoundException('Category banner not found');
    }

    return categoryBanner;
  }

  async updateCategoryBanner(id: string, userRole: user_role, updateCategoryBannerDto: UpdateCmsCategoryBannerDto) {
    this.checkAdminAccess(userRole);

    const existingBanner = await this.prisma.cmsCategoryBanner.findUnique({
      where: { id },
    });

    if (!existingBanner) {
      throw new NotFoundException('Category banner not found');
    }

    return this.prisma.cmsCategoryBanner.update({
      where: { id },
      data: updateCategoryBannerDto,
    });
  }

  async deleteCategoryBanner(id: string, userRole: user_role) {
    this.checkAdminAccess(userRole);

    const existingBanner = await this.prisma.cmsCategoryBanner.findUnique({
      where: { id },
    });

    if (!existingBanner) {
      throw new NotFoundException('Category banner not found');
    }

    return this.prisma.cmsCategoryBanner.delete({
      where: { id },
    });
  }

  // Category Management
  async createCategory(userRole: user_role, createCategoryDto: CreateCmsCategoryDto) {
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

  async getAllCategories(isActive?: boolean) {
    const where = isActive !== undefined ? { isActive } : {};
    return this.prisma.cmsCategory.findMany({
      where,
      orderBy: { position: 'asc' },
    });
  }

  async getCategoryById(id: string) {
    const category = await this.prisma.cmsCategory.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async updateCategory(id: string, userRole: user_role, updateCategoryDto: UpdateCmsCategoryDto) {
    this.checkAdminAccess(userRole);

    const existingCategory = await this.prisma.cmsCategory.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      throw new NotFoundException('Category not found');
    }

    return this.prisma.cmsCategory.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async deleteCategory(id: string, userRole: user_role) {
    this.checkAdminAccess(userRole);

    const existingCategory = await this.prisma.cmsCategory.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      throw new NotFoundException('Category not found');
    }

    return this.prisma.cmsCategory.delete({
      where: { id },
    });
  }

  // Promotional Card Management
  async createPromotionalCard(userRole: user_role, createPromotionalCardDto: CreateCmsPromotionalCardDto) {
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

  async getAllPromotionalCards(isActive?: boolean) {
    const where = isActive !== undefined ? { isActive } : {};
    return this.prisma.cmsPromotionalCard.findMany({
      where,
      orderBy: { position: 'asc' },
    });
  }

  async getPromotionalCardById(id: string) {
    const promotionalCard = await this.prisma.cmsPromotionalCard.findUnique({
      where: { id },
    });

    if (!promotionalCard) {
      throw new NotFoundException('Promotional card not found');
    }

    return promotionalCard;
  }

  async updatePromotionalCard(id: string, userRole: user_role, updatePromotionalCardDto: UpdateCmsPromotionalCardDto) {
    this.checkAdminAccess(userRole);

    const existingCard = await this.prisma.cmsPromotionalCard.findUnique({
      where: { id },
    });

    if (!existingCard) {
      throw new NotFoundException('Promotional card not found');
    }

    return this.prisma.cmsPromotionalCard.update({
      where: { id },
      data: updatePromotionalCardDto,
    });
  }

  async deletePromotionalCard(id: string, userRole: user_role) {
    this.checkAdminAccess(userRole);

    const existingCard = await this.prisma.cmsPromotionalCard.findUnique({
      where: { id },
    });

    if (!existingCard) {
      throw new NotFoundException('Promotional card not found');
    }

    return this.prisma.cmsPromotionalCard.delete({
      where: { id },
    });
  }

  // Utility method to get all CMS data
  async getAllCmsData() {
    const [
      banners,
      featuredItems,
      footerContent,
      pageBanners,
      popups,
      themeSettings,
      categoryBanners,
      categories,
      promotionalCards,
    ] = await Promise.all([
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

  // CMS Pages Management
  async createCmsPage(userRole: user_role, createCmsPagesDto: CreateCmsPagesDto) {
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

  async getAllCmsPages(isActive?: boolean) {
    const where = isActive !== undefined ? { isActive } : {};
    return this.prisma.cmsPages.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCmsPageBySlug(slug: string) {
    const cmsPage = await this.prisma.cmsPages.findUnique({
      where: { slug },
    });

    if (!cmsPage) {
      throw new NotFoundException('CMS page not found');
    }

    return cmsPage;
  }

  async getCmsPageById(id: string) {
    const cmsPage = await this.prisma.cmsPages.findUnique({
      where: { id },
    });

    if (!cmsPage) {
      throw new NotFoundException('CMS page not found');
    }

    return cmsPage;
  }

  async updateCmsPage(id: string, userRole: user_role, updateCmsPagesDto: UpdateCmsPagesDto) {
    this.checkAdminAccess(userRole);

    const existingPage = await this.prisma.cmsPages.findUnique({
      where: { id },
    });

    if (!existingPage) {
      throw new NotFoundException('CMS page not found');
    }

    return this.prisma.cmsPages.update({
      where: { id },
      data: updateCmsPagesDto,
    });
  }

  async deleteCmsPage(id: string, userRole: user_role) {
    this.checkAdminAccess(userRole);

    const existingPage = await this.prisma.cmsPages.findUnique({
      where: { id },
    });

    if (!existingPage) {
      throw new NotFoundException('CMS page not found');
    }

    return this.prisma.cmsPages.delete({
      where: { id },
    });
  }
}