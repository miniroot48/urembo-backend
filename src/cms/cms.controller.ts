import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CmsService } from './cms.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
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

@Controller('cms')
export class CmsController {
  constructor(private cmsService: CmsService) {}

  // Banner Management Endpoints
  @UseGuards(JwtAuthGuard)
  @Post('banners')
  async createBanner(
    @Body() createBannerDto: CreateCmsBannerDto,
    @Request() req: any,
  ) {
    return this.cmsService.createBanner(req.user.role, createBannerDto);
  }

  @Get('banners')
  async getAllBanners(@Query('isActive') isActive?: string) {
    const isActiveBool = isActive === undefined ? undefined : isActive === 'true';
    return this.cmsService.getAllBanners(isActiveBool);
  }

  @Get('banners/:id')
  async getBannerById(@Param('id') id: string) {
    return this.cmsService.getBannerById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('banners/:id')
  async updateBanner(
    @Param('id') id: string,
    @Body() updateBannerDto: UpdateCmsBannerDto,
    @Request() req: any,
  ) {
    return this.cmsService.updateBanner(id, req.user.role, updateBannerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('banners/:id')
  async deleteBanner(
    @Param('id') id: string,
    @Request() req: any,
  ) {
    return this.cmsService.deleteBanner(id, req.user.role);
  }

  // Featured Items Management Endpoints
  @UseGuards(JwtAuthGuard)
  @Post('featured-items')
  async createFeaturedItem(
    @Body() createFeaturedItemDto: CreateCmsFeaturedItemDto,
    @Request() req: any,
  ) {
    return this.cmsService.createFeaturedItem(req.user.role, createFeaturedItemDto);
  }

  @Get('featured-items')
  async getAllFeaturedItems(@Query('isActive') isActive?: string) {
    const isActiveBool = isActive === undefined ? undefined : isActive === 'true';
    return this.cmsService.getAllFeaturedItems(isActiveBool);
  }

  @Get('featured-items/:id')
  async getFeaturedItemById(@Param('id') id: string) {
    return this.cmsService.getFeaturedItemById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('featured-items/:id')
  async updateFeaturedItem(
    @Param('id') id: string,
    @Body() updateFeaturedItemDto: UpdateCmsFeaturedItemDto,
    @Request() req: any,
  ) {
    return this.cmsService.updateFeaturedItem(id, req.user.role, updateFeaturedItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('featured-items/:id')
  async deleteFeaturedItem(
    @Param('id') id: string,
    @Request() req: any,
  ) {
    return this.cmsService.deleteFeaturedItem(id, req.user.role);
  }

  // Footer Content Management Endpoints
  @UseGuards(JwtAuthGuard)
  @Post('footer-content')
  async createFooterContent(
    @Body() createFooterContentDto: CreateCmsFooterContentDto,
    @Request() req: any,
  ) {
    return this.cmsService.createFooterContent(req.user.role, createFooterContentDto);
  }

  @Get('footer-content')
  async getAllFooterContent(@Query('isActive') isActive?: string) {
    const isActiveBool = isActive === undefined ? undefined : isActive === 'true';
    return this.cmsService.getAllFooterContent(isActiveBool);
  }

  @Get('footer-content/section/:sectionKey')
  async getFooterContentBySectionKey(@Param('sectionKey') sectionKey: string) {
    return this.cmsService.getFooterContentBySectionKey(sectionKey);
  }

  @UseGuards(JwtAuthGuard)
  @Put('footer-content/section/:sectionKey')
  async updateFooterContent(
    @Param('sectionKey') sectionKey: string,
    @Body() updateFooterContentDto: UpdateCmsFooterContentDto,
    @Request() req: any,
  ) {
    return this.cmsService.updateFooterContent(sectionKey, req.user.role, updateFooterContentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('footer-content/section/:sectionKey')
  async deleteFooterContent(
    @Param('sectionKey') sectionKey: string,
    @Request() req: any,
  ) {
    return this.cmsService.deleteFooterContent(sectionKey, req.user.role);
  }

  // Page Banner Management Endpoints
  @UseGuards(JwtAuthGuard)
  @Post('page-banners')
  async createPageBanner(
    @Body() createPageBannerDto: CreateCmsPageBannerDto,
    @Request() req: any,
  ) {
    return this.cmsService.createPageBanner(req.user.role, createPageBannerDto);
  }

  @Get('page-banners')
  async getAllPageBanners(@Query('isActive') isActive?: string) {
    const isActiveBool = isActive === undefined ? undefined : isActive === 'true';
    return this.cmsService.getAllPageBanners(isActiveBool);
  }

  @Get('page-banners/route/:pageRoute')
  async getPageBannerByRoute(@Param('pageRoute') pageRoute: string) {
    return this.cmsService.getPageBannerByRoute(pageRoute);
  }

  @UseGuards(JwtAuthGuard)
  @Put('page-banners/:id')
  async updatePageBanner(
    @Param('id') id: string,
    @Body() updatePageBannerDto: UpdateCmsPageBannerDto,
    @Request() req: any,
  ) {
    return this.cmsService.updatePageBanner(id, req.user.role, updatePageBannerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('page-banners/:id')
  async deletePageBanner(
    @Param('id') id: string,
    @Request() req: any,
  ) {
    return this.cmsService.deletePageBanner(id, req.user.role);
  }

  // Popup Management Endpoints
  @UseGuards(JwtAuthGuard)
  @Post('popups')
  async createPopup(
    @Body() createPopupDto: CreateCmsPopupDto,
    @Request() req: any,
  ) {
    return this.cmsService.createPopup(req.user.role, createPopupDto);
  }

  @Get('popups')
  async getAllPopups(@Query('isActive') isActive?: string) {
    const isActiveBool = isActive === undefined ? undefined : isActive === 'true';
    return this.cmsService.getAllPopups(isActiveBool);
  }

  @Get('popups/:id')
  async getPopupById(@Param('id') id: string) {
    return this.cmsService.getPopupById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('popups/:id')
  async updatePopup(
    @Param('id') id: string,
    @Body() updatePopupDto: UpdateCmsPopupDto,
    @Request() req: any,
  ) {
    return this.cmsService.updatePopup(id, req.user.role, updatePopupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('popups/:id')
  async deletePopup(
    @Param('id') id: string,
    @Request() req: any,
  ) {
    return this.cmsService.deletePopup(id, req.user.role);
  }

  // Theme Settings Management Endpoints
  @UseGuards(JwtAuthGuard)
  @Post('theme-settings')
  async createThemeSetting(
    @Body() createThemeSettingDto: CreateCmsThemeSettingDto,
    @Request() req: any,
  ) {
    return this.cmsService.createThemeSetting(req.user.role, createThemeSettingDto);
  }

  @Get('theme-settings')
  async getAllThemeSettings(@Query('isActive') isActive?: string) {
    const isActiveBool = isActive === undefined ? undefined : isActive === 'true';
    return this.cmsService.getAllThemeSettings(isActiveBool);
  }

  @Get('theme-settings/:settingKey')
  async getThemeSettingByKey(@Param('settingKey') settingKey: string) {
    return this.cmsService.getThemeSettingByKey(settingKey);
  }

  @UseGuards(JwtAuthGuard)
  @Put('theme-settings/:settingKey')
  async updateThemeSetting(
    @Param('settingKey') settingKey: string,
    @Body('settingValue') settingValue: string,
    @Request() req: any,
  ) {
    return this.cmsService.updateThemeSetting(settingKey, req.user.role, settingValue);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('theme-settings/:settingKey')
  async deleteThemeSetting(
    @Param('settingKey') settingKey: string,
    @Request() req: any,
  ) {
    return this.cmsService.deleteThemeSetting(settingKey, req.user.role);
  }

  // Category Banner Management Endpoints
  @UseGuards(JwtAuthGuard)
  @Post('category-banners')
  async createCategoryBanner(
    @Body() createCategoryBannerDto: CreateCmsCategoryBannerDto,
    @Request() req: any,
  ) {
    return this.cmsService.createCategoryBanner(req.user.role, createCategoryBannerDto);
  }

  @Get('category-banners')
  async getAllCategoryBanners(@Query('isActive') isActive?: string) {
    const isActiveBool = isActive === undefined ? undefined : isActive === 'true';
    return this.cmsService.getAllCategoryBanners(isActiveBool);
  }

  @Get('category-banners/slug/:categorySlug')
  async getCategoryBannersBySlug(
    @Param('categorySlug') categorySlug: string,
    @Query('isActive') isActive?: string,
  ) {
    const isActiveBool = isActive === undefined ? true : isActive === 'true';
    return this.cmsService.getCategoryBannersBySlug(categorySlug, isActiveBool);
  }

  @Get('category-banners/:id')
  async getCategoryBannerById(@Param('id') id: string) {
    return this.cmsService.getCategoryBannerById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('category-banners/:id')
  async updateCategoryBanner(
    @Param('id') id: string,
    @Body() updateCategoryBannerDto: UpdateCmsCategoryBannerDto,
    @Request() req: any,
  ) {
    return this.cmsService.updateCategoryBanner(id, req.user.role, updateCategoryBannerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('category-banners/:id')
  async deleteCategoryBanner(
    @Param('id') id: string,
    @Request() req: any,
  ) {
    return this.cmsService.deleteCategoryBanner(id, req.user.role);
  }

  // Category Management Endpoints
  @UseGuards(JwtAuthGuard)
  @Post('categories')
  async createCategory(
    @Body() createCategoryDto: CreateCmsCategoryDto,
    @Request() req: any,
  ) {
    return this.cmsService.createCategory(req.user.role, createCategoryDto);
  }

  @Get('categories')
  async getAllCategories(@Query('isActive') isActive?: string) {
    const isActiveBool = isActive === undefined ? undefined : isActive === 'true';
    return this.cmsService.getAllCategories(isActiveBool);
  }

  @Get('categories/:id')
  async getCategoryById(@Param('id') id: string) {
    return this.cmsService.getCategoryById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('categories/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCmsCategoryDto,
    @Request() req: any,
  ) {
    return this.cmsService.updateCategory(id, req.user.role, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('categories/:id')
  async deleteCategory(
    @Param('id') id: string,
    @Request() req: any,
  ) {
    return this.cmsService.deleteCategory(id, req.user.role);
  }

  // Promotional Card Management Endpoints
  @UseGuards(JwtAuthGuard)
  @Post('promotional-cards')
  async createPromotionalCard(
    @Body() createPromotionalCardDto: CreateCmsPromotionalCardDto,
    @Request() req: any,
  ) {
    return this.cmsService.createPromotionalCard(req.user.role, createPromotionalCardDto);
  }

  @Get('promotional-cards')
  async getAllPromotionalCards(@Query('isActive') isActive?: string) {
    const isActiveBool = isActive === undefined ? undefined : isActive === 'true';
    return this.cmsService.getAllPromotionalCards(isActiveBool);
  }

  @Get('promotional-cards/:id')
  async getPromotionalCardById(@Param('id') id: string) {
    return this.cmsService.getPromotionalCardById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('promotional-cards/:id')
  async updatePromotionalCard(
    @Param('id') id: string,
    @Body() updatePromotionalCardDto: UpdateCmsPromotionalCardDto,
    @Request() req: any,
  ) {
    return this.cmsService.updatePromotionalCard(id, req.user.role, updatePromotionalCardDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('promotional-cards/:id')
  async deletePromotionalCard(
    @Param('id') id: string,
    @Request() req: any,
  ) {
    return this.cmsService.deletePromotionalCard(id, req.user.role);
  }

  // CMS Pages Management Endpoints
  @UseGuards(JwtAuthGuard)
  @Post('pages')
  async createCmsPage(
    @Body() createCmsPagesDto: CreateCmsPagesDto,
    @Request() req: any,
  ) {
    return this.cmsService.createCmsPage(req.user.role, createCmsPagesDto);
  }

  @Get('pages')
  async getAllCmsPages(@Query('isActive') isActive?: string) {
    const isActiveBool = isActive === undefined ? undefined : isActive === 'true';
    return this.cmsService.getAllCmsPages(isActiveBool);
  }

  @Get('pages/slug/:slug')
  async getCmsPageBySlug(@Param('slug') slug: string) {
    return this.cmsService.getCmsPageBySlug(slug);
  }

  @Get('pages/:id')
  async getCmsPageById(@Param('id') id: string) {
    return this.cmsService.getCmsPageById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('pages/:id')
  async updateCmsPage(
    @Param('id') id: string,
    @Body() updateCmsPagesDto: UpdateCmsPagesDto,
    @Request() req: any,
  ) {
    return this.cmsService.updateCmsPage(id, req.user.role, updateCmsPagesDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('pages/:id')
  async deleteCmsPage(
    @Param('id') id: string,
    @Request() req: any,
  ) {
    return this.cmsService.deleteCmsPage(id, req.user.role);
  }

  // Utility endpoint to get all CMS data
  @Get('all')
  async getAllCmsData() {
    return this.cmsService.getAllCmsData();
  }
}