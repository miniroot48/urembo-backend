import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  // Get all reviews with filtering and pagination
  async getAllReviews(
    page: number = 1,
    limit: number = 10,
    serviceId?: string,
    vendorId?: string,
    clientId?: string,
    minRating?: number,
    maxRating?: number
  ) {
    const skip = (page - 1) * limit;
    
    const where: any = {};
    if (serviceId) where.serviceId = serviceId;
    if (vendorId) where.vendorId = vendorId;
    if (clientId) where.clientId = clientId;
    if (minRating !== undefined || maxRating !== undefined) {
      where.rating = {};
      if (minRating !== undefined) where.rating.gte = minRating;
      if (maxRating !== undefined) where.rating.lte = maxRating;
    }

    const [reviews, total] = await Promise.all([
      this.prisma.serviceReview.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          service: {
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              currency: true,
              imageUrl: true,
            },
          },
          appointment: {
            select: {
              id: true,
              appointmentDate: true,
              status: true,
            },
          },
          client: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },
          vendor: {
            select: {
              id: true,
              fullName: true,
              businessName: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.serviceReview.count({ where }),
    ]);

    return {
      reviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Get review by ID
  async getReviewById(id: string) {
    const review = await this.prisma.serviceReview.findUnique({
      where: { id },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            currency: true,
            imageUrl: true,
          },
        },
        appointment: {
          select: {
            id: true,
            appointmentDate: true,
            status: true,
          },
        },
        client: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        vendor: {
          select: {
            id: true,
            fullName: true,
            businessName: true,
            email: true,
          },
        },
      },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  // Create new review
  async createReview(createReviewDto: CreateReviewDto, userId: string) {
    const {
      serviceId,
      appointmentId,
      clientId,
      vendorId,
      staffId,
      rating,
      reviewText,
    } = createReviewDto;

    // Validate service exists
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
    });
    if (!service) {
      throw new BadRequestException('Invalid service ID');
    }

    // Validate appointment exists
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
    });
    if (!appointment) {
      throw new BadRequestException('Invalid appointment ID');
    }

    // Validate client exists
    const client = await this.prisma.profile.findUnique({
      where: { id: clientId },
    });
    if (!client) {
      throw new BadRequestException('Invalid client ID');
    }

    // Validate vendor exists
    const vendor = await this.prisma.profile.findUnique({
      where: { id: vendorId },
    });
    if (!vendor) {
      throw new BadRequestException('Invalid vendor ID');
    }

    // Validate staff exists if provided
    if (staffId) {
      const staff = await this.prisma.staff.findUnique({
        where: { id: staffId },
      });
      if (!staff) {
        throw new BadRequestException('Invalid staff ID');
      }
    }

    // Check if review already exists for this appointment
    const existingReview = await this.prisma.serviceReview.findFirst({
      where: {
        appointmentId,
        clientId,
      },
    });

    if (existingReview) {
      throw new BadRequestException('Review already exists for this appointment');
    }

    // Check if appointment is completed
    if (appointment.status !== 'completed') {
      throw new BadRequestException('Can only review completed appointments');
    }

    // Check if client is the one who made the appointment
    if (appointment.clientId !== clientId) {
      throw new BadRequestException('You can only review your own appointments');
    }

    const review = await this.prisma.serviceReview.create({
      data: {
        serviceId,
        appointmentId,
        clientId,
        vendorId,
        staffId,
        rating,
        reviewText,
      },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            currency: true,
            imageUrl: true,
          },
        },
        appointment: {
          select: {
            id: true,
            appointmentDate: true,
            status: true,
          },
        },
        client: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        vendor: {
          select: {
            id: true,
            fullName: true,
            businessName: true,
            email: true,
          },
        },
      },
    });

    return review;
  }

  // Update review
  async updateReview(id: string, updateReviewDto: UpdateReviewDto, userId: string) {
    const review = await this.getReviewById(id);

    // Check permissions - only the client who wrote the review can update it
    if (review.clientId !== userId) {
      throw new ForbiddenException('You can only update your own reviews');
    }

    const updatedReview = await this.prisma.serviceReview.update({
      where: { id },
      data: updateReviewDto,
      include: {
        service: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            currency: true,
            imageUrl: true,
          },
        },
        appointment: {
          select: {
            id: true,
            appointmentDate: true,
            status: true,
          },
        },
        client: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        vendor: {
          select: {
            id: true,
            fullName: true,
            businessName: true,
            email: true,
          },
        },
      },
    });

    return updatedReview;
  }

  // Delete review
  async deleteReview(id: string, userId: string, userRole: string) {
    const review = await this.getReviewById(id);

    // Check permissions - only the client who wrote the review or admin can delete it
    if (userRole !== 'admin' && review.clientId !== userId) {
      throw new ForbiddenException('You can only delete your own reviews');
    }

    await this.prisma.serviceReview.delete({
      where: { id },
    });

    return { message: 'Review deleted successfully' };
  }

  // Get reviews by service ID
  async getReviewsByServiceId(serviceId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      this.prisma.serviceReview.findMany({
        where: { serviceId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          client: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },
          appointment: {
            select: {
              id: true,
              appointmentDate: true,
              status: true,
            },
          },
        },
      }),
      this.prisma.serviceReview.count({ where: { serviceId } }),
    ]);

    return {
      reviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Get reviews by vendor ID
  async getReviewsByVendorId(vendorId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      this.prisma.serviceReview.findMany({
        where: { vendorId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          service: {
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              currency: true,
              imageUrl: true,
            },
          },
          client: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },
          appointment: {
            select: {
              id: true,
              appointmentDate: true,
              status: true,
            },
          },
        },
      }),
      this.prisma.serviceReview.count({ where: { vendorId } }),
    ]);

    return {
      reviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Get reviews by client ID
  async getReviewsByClientId(clientId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      this.prisma.serviceReview.findMany({
        where: { clientId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          service: {
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              currency: true,
              imageUrl: true,
            },
          },
          vendor: {
            select: {
              id: true,
              fullName: true,
              businessName: true,
              email: true,
            },
          },
          appointment: {
            select: {
              id: true,
              appointmentDate: true,
              status: true,
            },
          },
        },
      }),
      this.prisma.serviceReview.count({ where: { clientId } }),
    ]);

    return {
      reviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Get review statistics
  async getReviewStats(serviceId?: string, vendorId?: string) {
    let where: any = {};
    if (serviceId) where.serviceId = serviceId;
    if (vendorId) where.vendorId = vendorId;

    const [
      totalReviews,
      averageRating,
      ratingDistribution,
      recentReviews,
    ] = await Promise.all([
      this.prisma.serviceReview.count({ where }),
      this.prisma.serviceReview.aggregate({
        where,
        _avg: { rating: true },
      }),
      this.prisma.serviceReview.groupBy({
        by: ['rating'],
        where,
        _count: { rating: true },
      }),
      this.prisma.serviceReview.findMany({
        where,
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          client: {
            select: {
              id: true,
              fullName: true,
            },
          },
        },
      }),
    ]);

    return {
      totalReviews,
      averageRating: averageRating._avg.rating || 0,
      ratingDistribution: ratingDistribution.reduce((acc, item) => {
        acc[item.rating] = item._count.rating;
        return acc;
      }, {}),
      recentReviews,
    };
  }

  // Get service rating summary
  async getServiceRatingSummary(serviceId: string) {
    const stats = await this.getReviewStats(serviceId);
    
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        currency: true,
        imageUrl: true,
      },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return {
      service,
      ...stats,
    };
  }

  // Get vendor rating summary
  async getVendorRatingSummary(vendorId: string) {
    const stats = await this.getReviewStats(undefined, vendorId);
    
    const vendor = await this.prisma.profile.findUnique({
      where: { id: vendorId },
      select: {
        id: true,
        fullName: true,
        businessName: true,
        email: true,
      },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    return {
      vendor,
      ...stats,
    };
  }

  // Search reviews
  async searchReviews(query: string, serviceId?: string, vendorId?: string) {
    let where: any = {
      OR: [
        { reviewText: { contains: query, mode: 'insensitive' } },
        { service: { name: { contains: query, mode: 'insensitive' } } },
        { client: { fullName: { contains: query, mode: 'insensitive' } } },
      ],
    };

    if (serviceId) where.serviceId = serviceId;
    if (vendorId) where.vendorId = vendorId;

    return this.prisma.serviceReview.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            currency: true,
            imageUrl: true,
          },
        },
        client: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        vendor: {
          select: {
            id: true,
            fullName: true,
            businessName: true,
            email: true,
          },
        },
        appointment: {
          select: {
            id: true,
            appointmentDate: true,
            status: true,
          },
        },
      },
    });
  }
}
