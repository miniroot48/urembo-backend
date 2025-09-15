import { 
  Controller, 
  Get, 
  Query, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  // Get comprehensive dashboard analytics
  @Get('dashboard')
  @UseGuards(JwtAuthGuard)
  async getDashboardAnalytics(
    @Request() req,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const dateRange = dateFrom && dateTo ? { from: dateFrom, to: dateTo } : undefined;
    return this.analyticsService.getDashboardAnalytics(req.user.sub, req.user.role, dateRange);
  }

  // Get order analytics
  @Get('orders')
  @UseGuards(JwtAuthGuard)
  async getOrderAnalytics(
    @Request() req,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const dateRange = dateFrom && dateTo ? { from: dateFrom, to: dateTo } : undefined;
    const analytics = await this.analyticsService.getDashboardAnalytics(req.user.sub, req.user.role, dateRange);
    return analytics.orders;
  }

  // Get revenue analytics
  @Get('revenue')
  @UseGuards(JwtAuthGuard)
  async getRevenueAnalytics(
    @Request() req,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const dateRange = dateFrom && dateTo ? { from: dateFrom, to: dateTo } : undefined;
    const analytics = await this.analyticsService.getDashboardAnalytics(req.user.sub, req.user.role, dateRange);
    return analytics.revenue;
  }

  // Get product analytics
  @Get('products')
  @UseGuards(JwtAuthGuard)
  async getProductAnalytics(
    @Request() req,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const dateRange = dateFrom && dateTo ? { from: dateFrom, to: dateTo } : undefined;
    const analytics = await this.analyticsService.getDashboardAnalytics(req.user.sub, req.user.role, dateRange);
    return analytics.products;
  }

  // Get service analytics
  @Get('services')
  @UseGuards(JwtAuthGuard)
  async getServiceAnalytics(
    @Request() req,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const dateRange = dateFrom && dateTo ? { from: dateFrom, to: dateTo } : undefined;
    const analytics = await this.analyticsService.getDashboardAnalytics(req.user.sub, req.user.role, dateRange);
    return analytics.services;
  }

  // Get user analytics
  @Get('users')
  @UseGuards(JwtAuthGuard)
  async getUserAnalytics(
    @Request() req,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const dateRange = dateFrom && dateTo ? { from: dateFrom, to: dateTo } : undefined;
    const analytics = await this.analyticsService.getDashboardAnalytics(req.user.sub, req.user.role, dateRange);
    return analytics.users;
  }

  // Get payment analytics
  @Get('payments')
  @UseGuards(JwtAuthGuard)
  async getPaymentAnalytics(
    @Request() req,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const dateRange = dateFrom && dateTo ? { from: dateFrom, to: dateTo } : undefined;
    const analytics = await this.analyticsService.getDashboardAnalytics(req.user.sub, req.user.role, dateRange);
    return analytics.payments;
  }

  // Get ticket analytics
  @Get('tickets')
  @UseGuards(JwtAuthGuard)
  async getTicketAnalytics(
    @Request() req,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const dateRange = dateFrom && dateTo ? { from: dateFrom, to: dateTo } : undefined;
    const analytics = await this.analyticsService.getDashboardAnalytics(req.user.sub, req.user.role, dateRange);
    return analytics.tickets;
  }

  // Get review analytics
  @Get('reviews')
  @UseGuards(JwtAuthGuard)
  async getReviewAnalytics(
    @Request() req,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const dateRange = dateFrom && dateTo ? { from: dateFrom, to: dateTo } : undefined;
    const analytics = await this.analyticsService.getDashboardAnalytics(req.user.sub, req.user.role, dateRange);
    return analytics.reviews;
  }

  // Get live shopping analytics
  @Get('live-shopping')
  @UseGuards(JwtAuthGuard)
  async getLiveShoppingAnalytics(
    @Request() req,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const dateRange = dateFrom && dateTo ? { from: dateFrom, to: dateTo } : undefined;
    const analytics = await this.analyticsService.getDashboardAnalytics(req.user.sub, req.user.role, dateRange);
    return analytics.liveShopping;
  }

  // Get manufacturer order analytics
  @Get('manufacturer-orders')
  @UseGuards(JwtAuthGuard)
  async getManufacturerOrderAnalytics(
    @Request() req,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const dateRange = dateFrom && dateTo ? { from: dateFrom, to: dateTo } : undefined;
    const analytics = await this.analyticsService.getDashboardAnalytics(req.user.sub, req.user.role, dateRange);
    return analytics.manufacturerOrders;
  }

  // Get onboarding analytics
  @Get('onboarding')
  @UseGuards(JwtAuthGuard)
  async getOnboardingAnalytics(
    @Request() req,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const dateRange = dateFrom && dateTo ? { from: dateFrom, to: dateTo } : undefined;
    const analytics = await this.analyticsService.getDashboardAnalytics(req.user.sub, req.user.role, dateRange);
    return analytics.onboarding;
  }

  // Get summary analytics
  @Get('summary')
  @UseGuards(JwtAuthGuard)
  async getSummaryAnalytics(
    @Request() req,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const dateRange = dateFrom && dateTo ? { from: dateFrom, to: dateTo } : undefined;
    const analytics = await this.analyticsService.getDashboardAnalytics(req.user.sub, req.user.role, dateRange);
    return analytics.summary;
  }
}
