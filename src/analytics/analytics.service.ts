import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  // Get comprehensive analytics dashboard data
  async getDashboardAnalytics(userId?: string, userRole?: string, dateRange?: { from: string; to: string }) {
    const whereClause = this.buildWhereClause(userId, userRole, dateRange);
    
    const [
      // Order Analytics
      orderStats,
      revenueStats,
      productStats,
      serviceStats,
      userStats,
      paymentStats,
      ticketStats,
      reviewStats,
      liveShoppingStats,
      manufacturerOrderStats,
      onboardingStats,
    ] = await Promise.all([
      this.getOrderAnalytics(whereClause),
      this.getRevenueAnalytics(whereClause),
      this.getProductAnalytics(whereClause),
      this.getServiceAnalytics(whereClause),
      this.getUserAnalytics(whereClause),
      this.getPaymentAnalytics(whereClause),
      this.getTicketAnalytics(whereClause),
      this.getReviewAnalytics(whereClause),
      this.getLiveShoppingAnalytics(whereClause),
      this.getManufacturerOrderAnalytics(whereClause),
      this.getOnboardingAnalytics(whereClause),
    ]);

    return {
      orders: orderStats,
      revenue: revenueStats,
      products: productStats,
      services: serviceStats,
      users: userStats,
      payments: paymentStats,
      tickets: ticketStats,
      reviews: reviewStats,
      liveShopping: liveShoppingStats,
      manufacturerOrders: manufacturerOrderStats,
      onboarding: onboardingStats,
      summary: this.generateSummary({
        orderStats,
        revenueStats,
        productStats,
        serviceStats,
        userStats,
        paymentStats,
        ticketStats,
        reviewStats,
        liveShoppingStats,
        manufacturerOrderStats,
        onboardingStats,
      }),
    };
  }

  // Get order analytics
  private async getOrderAnalytics(whereClause: any) {
    const [
      totalOrders,
      pendingOrders,
      completedOrders,
      cancelledOrders,
      todayOrders,
      weekOrders,
      monthOrders,
      ordersByStatus,
      ordersByMonth,
    ] = await Promise.all([
      this.prisma.order.count({ where: whereClause.orders }),
      this.prisma.order.count({ where: { ...whereClause.orders, status: 'pending' } }),
      this.prisma.order.count({ where: { ...whereClause.orders, status: 'completed' } }),
      this.prisma.order.count({ where: { ...whereClause.orders, status: 'cancelled' } }),
      this.prisma.order.count({ where: { ...whereClause.orders, createdAt: { gte: whereClause.today } } }),
      this.prisma.order.count({ where: { ...whereClause.orders, createdAt: { gte: whereClause.weekAgo } } }),
      this.prisma.order.count({ where: { ...whereClause.orders, createdAt: { gte: whereClause.monthAgo } } }),
      this.prisma.order.groupBy({
        by: ['status'],
        where: whereClause.orders,
        _count: { status: true },
      }),
      this.getOrdersByMonth(whereClause.orders),
    ]);

    return {
      total: totalOrders,
      pending: pendingOrders,
      completed: completedOrders,
      cancelled: cancelledOrders,
      today: todayOrders,
      thisWeek: weekOrders,
      thisMonth: monthOrders,
      byStatus: ordersByStatus,
      byMonth: ordersByMonth,
    };
  }

  // Get revenue analytics
  private async getRevenueAnalytics(whereClause: any) {
    const [
      totalRevenue,
      todayRevenue,
      weekRevenue,
      monthRevenue,
      revenueByMonth,
      averageOrderValue,
    ] = await Promise.all([
      this.prisma.order.aggregate({
        where: { ...whereClause.orders, status: { not: 'cancelled' } },
        _sum: { totalAmount: true },
      }),
      this.prisma.order.aggregate({
        where: { ...whereClause.orders, status: { not: 'cancelled' }, createdAt: { gte: whereClause.today } },
        _sum: { totalAmount: true },
      }),
      this.prisma.order.aggregate({
        where: { ...whereClause.orders, status: { not: 'cancelled' }, createdAt: { gte: whereClause.weekAgo } },
        _sum: { totalAmount: true },
      }),
      this.prisma.order.aggregate({
        where: { ...whereClause.orders, status: { not: 'cancelled' }, createdAt: { gte: whereClause.monthAgo } },
        _sum: { totalAmount: true },
      }),
      this.getRevenueByMonth(whereClause.orders),
      this.prisma.order.aggregate({
        where: { ...whereClause.orders, status: { not: 'cancelled' } },
        _avg: { totalAmount: true },
      }),
    ]);

    return {
      total: Number(totalRevenue._sum.totalAmount || 0),
      today: Number(todayRevenue._sum.totalAmount || 0),
      thisWeek: Number(weekRevenue._sum.totalAmount || 0),
      thisMonth: Number(monthRevenue._sum.totalAmount || 0),
      byMonth: revenueByMonth,
      averageOrderValue: Number(averageOrderValue._avg.totalAmount || 0),
    };
  }

  // Get product analytics
  private async getProductAnalytics(whereClause: any) {
    const [
      totalProducts,
      activeProducts,
      lowStockProducts,
      outOfStockProducts,
      productsByCategory,
      topSellingProducts,
    ] = await Promise.all([
      this.prisma.product.count({ where: whereClause.products }),
      this.prisma.product.count({ where: { ...whereClause.products, isActive: true } }),
      this.prisma.product.count({ where: { ...whereClause.products, stockQuantity: { lte: 10 } } }),
      this.prisma.product.count({ where: { ...whereClause.products, stockQuantity: 0 } }),
      this.prisma.product.groupBy({
        by: ['categoryId'],
        where: whereClause.products,
        _count: { categoryId: true },
      }),
      this.getTopSellingProducts(whereClause.products),
    ]);

    return {
      total: totalProducts,
      active: activeProducts,
      lowStock: lowStockProducts,
      outOfStock: outOfStockProducts,
      byCategory: productsByCategory,
      topSelling: topSellingProducts,
    };
  }

  // Get service analytics
  private async getServiceAnalytics(whereClause: any) {
    const [
      totalServices,
      activeServices,
      servicesByCategory,
      topRatedServices,
    ] = await Promise.all([
      this.prisma.service.count({ where: whereClause.services }),
      this.prisma.service.count({ where: { ...whereClause.services, isActive: true } }),
      this.prisma.service.groupBy({
        by: ['categoryId'],
        where: whereClause.services,
        _count: { categoryId: true },
      }),
      this.getTopRatedServices(whereClause.services),
    ]);

    return {
      total: totalServices,
      active: activeServices,
      byCategory: servicesByCategory,
      topRated: topRatedServices,
    };
  }

  // Get user analytics
  private async getUserAnalytics(whereClause: any) {
    const [
      totalUsers,
      newUsersToday,
      newUsersThisWeek,
      newUsersThisMonth,
      usersByRole,
      activeUsers,
    ] = await Promise.all([
      this.prisma.profile.count({ where: whereClause.users }),
      this.prisma.profile.count({ where: { ...whereClause.users, createdAt: { gte: whereClause.today } } }),
      this.prisma.profile.count({ where: { ...whereClause.users, createdAt: { gte: whereClause.weekAgo } } }),
      this.prisma.profile.count({ where: { ...whereClause.users, createdAt: { gte: whereClause.monthAgo } } }),
      this.prisma.profile.groupBy({
        by: ['role'],
        where: whereClause.users,
        _count: { role: true },
      }),
      this.getActiveUsers(whereClause.users),
    ]);

    return {
      total: totalUsers,
      newToday: newUsersToday,
      newThisWeek: newUsersThisWeek,
      newThisMonth: newUsersThisMonth,
      byRole: usersByRole,
      active: activeUsers,
    };
  }

  // Get payment analytics
  private async getPaymentAnalytics(whereClause: any) {
    const [
      totalTransactions,
      successfulTransactions,
      failedTransactions,
      totalAmount,
      todayAmount,
      weekAmount,
      monthAmount,
    ] = await Promise.all([
      this.prisma.order.count({ where: whereClause.orders }),
      this.prisma.order.count({ where: { ...whereClause.orders, status: 'completed' } }),
      this.prisma.order.count({ where: { ...whereClause.orders, status: 'cancelled' } }),
      this.prisma.order.aggregate({
        where: { ...whereClause.orders, status: { not: 'cancelled' } },
        _sum: { totalAmount: true },
      }),
      this.prisma.order.aggregate({
        where: { ...whereClause.orders, status: { not: 'cancelled' }, createdAt: { gte: whereClause.today } },
        _sum: { totalAmount: true },
      }),
      this.prisma.order.aggregate({
        where: { ...whereClause.orders, status: { not: 'cancelled' }, createdAt: { gte: whereClause.weekAgo } },
        _sum: { totalAmount: true },
      }),
      this.prisma.order.aggregate({
        where: { ...whereClause.orders, status: { not: 'cancelled' }, createdAt: { gte: whereClause.monthAgo } },
        _sum: { totalAmount: true },
      }),
    ]);

    return {
      totalTransactions,
      successful: successfulTransactions,
      failed: failedTransactions,
      totalAmount: Number(totalAmount._sum.totalAmount || 0),
      todayAmount: Number(todayAmount._sum.totalAmount || 0),
      weekAmount: Number(weekAmount._sum.totalAmount || 0),
      monthAmount: Number(monthAmount._sum.totalAmount || 0),
    };
  }

  // Get ticket analytics
  private async getTicketAnalytics(whereClause: any) {
    const [
      totalTickets,
      openTickets,
      closedTickets,
      ticketsByPriority,
      ticketsByStatus,
    ] = await Promise.all([
      this.prisma.ticket.count({ where: whereClause.tickets }),
      this.prisma.ticket.count({ where: { ...whereClause.tickets, status: 'open' } }),
      this.prisma.ticket.count({ where: { ...whereClause.tickets, status: 'closed' } }),
      this.prisma.ticket.groupBy({
        by: ['priority'],
        where: whereClause.tickets,
        _count: { priority: true },
      }),
      this.prisma.ticket.groupBy({
        by: ['status'],
        where: whereClause.tickets,
        _count: { status: true },
      }),
    ]);

    return {
      total: totalTickets,
      open: openTickets,
      closed: closedTickets,
      byPriority: ticketsByPriority,
      byStatus: ticketsByStatus,
    };
  }

  // Get review analytics
  private async getReviewAnalytics(whereClause: any) {
    const [
      totalReviews,
      averageRating,
      reviewsByRating,
      recentReviews,
    ] = await Promise.all([
      this.prisma.review.count({ where: whereClause.reviews }),
      this.prisma.review.aggregate({
        where: whereClause.reviews,
        _avg: { rating: true },
      }),
      this.prisma.review.groupBy({
        by: ['rating'],
        where: whereClause.reviews,
        _count: { rating: true },
      }),
      this.prisma.review.findMany({
        where: whereClause.reviews,
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              businessName: true,
            },
          },
        },
      }),
    ]);

    return {
      total: totalReviews,
      averageRating: Number(averageRating._avg.rating || 0),
      byRating: reviewsByRating,
      recent: recentReviews,
    };
  }

  // Get live shopping analytics
  private async getLiveShoppingAnalytics(whereClause: any) {
    const [
      totalSessions,
      liveSessions,
      scheduledSessions,
      endedSessions,
      totalMessages,
      totalParticipants,
    ] = await Promise.all([
      this.prisma.liveShoppingSession.count({ where: whereClause.liveShopping }),
      this.prisma.liveShoppingSession.count({ where: { ...whereClause.liveShopping, status: 'live' } }),
      this.prisma.liveShoppingSession.count({ where: { ...whereClause.liveShopping, status: 'scheduled' } }),
      this.prisma.liveShoppingSession.count({ where: { ...whereClause.liveShopping, status: 'ended' } }),
      this.prisma.liveSessionMessage.count(),
      this.prisma.liveSessionParticipant.count(),
    ]);

    return {
      totalSessions,
      live: liveSessions,
      scheduled: scheduledSessions,
      ended: endedSessions,
      totalMessages,
      totalParticipants,
    };
  }

  // Get manufacturer order analytics
  private async getManufacturerOrderAnalytics(whereClause: any) {
    const [
      totalOrders,
      pendingOrders,
      confirmedOrders,
      shippedOrders,
      deliveredOrders,
      totalRevenue,
    ] = await Promise.all([
      this.prisma.manufacturerOrder.count({ where: whereClause.manufacturerOrders }),
      this.prisma.manufacturerOrder.count({ where: { ...whereClause.manufacturerOrders, status: 'pending' } }),
      this.prisma.manufacturerOrder.count({ where: { ...whereClause.manufacturerOrders, status: 'confirmed' } }),
      this.prisma.manufacturerOrder.count({ where: { ...whereClause.manufacturerOrders, status: 'shipped' } }),
      this.prisma.manufacturerOrder.count({ where: { ...whereClause.manufacturerOrders, status: 'delivered' } }),
      this.prisma.manufacturerOrder.aggregate({
        where: { ...whereClause.manufacturerOrders, status: { not: 'cancelled' } },
        _sum: { totalAmount: true },
      }),
    ]);

    return {
      total: totalOrders,
      pending: pendingOrders,
      confirmed: confirmedOrders,
      shipped: shippedOrders,
      delivered: deliveredOrders,
      totalRevenue: Number(totalRevenue._sum.totalAmount || 0),
    };
  }

  // Get onboarding analytics
  private async getOnboardingAnalytics(whereClause: any) {
    const [
      totalSubmissions,
      pendingSubmissions,
      approvedSubmissions,
      rejectedSubmissions,
      submissionsByRole,
    ] = await Promise.all([
      this.prisma.onboardingSubmission.count({ where: whereClause.onboarding }),
      this.prisma.onboardingSubmission.count({ where: { ...whereClause.onboarding, status: 'pending' } }),
      this.prisma.onboardingSubmission.count({ where: { ...whereClause.onboarding, status: 'approved' } }),
      this.prisma.onboardingSubmission.count({ where: { ...whereClause.onboarding, status: 'rejected' } }),
      this.prisma.onboardingSubmission.findMany({
        where: whereClause.onboarding,
        include: {
          user: {
            select: { role: true },
          },
        },
      }).then(results => 
        results.reduce((acc, item) => {
          const role = item.user.role;
          acc[role] = (acc[role] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      ),
    ]);

    return {
      total: totalSubmissions,
      pending: pendingSubmissions,
      approved: approvedSubmissions,
      rejected: rejectedSubmissions,
      byRole: submissionsByRole,
    };
  }

  // Helper methods
  private buildWhereClause(userId?: string, userRole?: string, dateRange?: { from: string; to: string }) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    const baseWhere = dateRange ? {
      createdAt: {
        gte: new Date(dateRange.from),
        lte: new Date(dateRange.to),
      },
    } : {};

    return {
      today,
      weekAgo,
      monthAgo,
      orders: userId && userRole === 'retailer' ? { ...baseWhere, retailerId: userId } : baseWhere,
      products: userId && (userRole === 'retailer' || userRole === 'manufacturer') ? { ...baseWhere, vendorId: userId } : baseWhere,
      services: userId && userRole === 'vendor' ? { ...baseWhere, vendorId: userId } : baseWhere,
      users: baseWhere,
      tickets: userId ? { ...baseWhere, userId } : baseWhere,
      reviews: baseWhere,
      liveShopping: userId && userRole === 'retailer' ? { ...baseWhere, retailerId: userId } : baseWhere,
      manufacturerOrders: userId && (userRole === 'retailer' || userRole === 'manufacturer') ? { ...baseWhere, OR: [{ retailerId: userId }, { manufacturerId: userId }] } : baseWhere,
      onboarding: baseWhere,
    };
  }

  private async getOrdersByMonth(whereClause: any) {
    // This would need a more complex query to group by month
    // For now, return empty array
    return [];
  }

  private async getRevenueByMonth(whereClause: any) {
    // This would need a more complex query to group by month
    // For now, return empty array
    return [];
  }

  private async getTopSellingProducts(whereClause: any) {
    // This would need to join with order items to get top selling products
    // For now, return empty array
    return [];
  }

  private async getTopRatedServices(whereClause: any) {
    // This would need to join with reviews to get top rated services
    // For now, return empty array
    return [];
  }

  private async getActiveUsers(whereClause: any) {
    // This would need to define what "active" means (e.g., users who made orders in last 30 days)
    // For now, return 0
    return 0;
  }

  private generateSummary(data: any) {
    return {
      totalRevenue: data.revenueStats.total,
      totalOrders: data.orderStats.total,
      totalUsers: data.userStats.total,
      totalProducts: data.productStats.total,
      totalServices: data.serviceStats.total,
      totalTickets: data.ticketStats.total,
      totalReviews: data.reviewStats.total,
      totalLiveSessions: data.liveShoppingStats.totalSessions,
      totalManufacturerOrders: data.manufacturerOrderStats.total,
      totalOnboardingSubmissions: data.onboardingStats.total,
    };
  }
}
