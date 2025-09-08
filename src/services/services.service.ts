import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { user_role } from '@prisma/client';

export interface CreateServiceDto {
  name: string;
  description?: string;
  price: number;
  currency?: string;
  durationMinutes: number;
  imageUrl?: string;
  category?: string;
  categoryId?: string;
  subcategoryId?: string;
  actualServiceId?: string;
  deliveryMethod?: string;
  metadata?: any;
}

export interface UpdateServiceDto {
  name?: string;
  description?: string;
  price?: number;
  currency?: string;
  durationMinutes?: number;
  imageUrl?: string;
  category?: string;
  categoryId?: string;
  subcategoryId?: string;
  actualServiceId?: string;
  deliveryMethod?: string;
  metadata?: any;
  isActive?: boolean;
}

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async createService(userId: string, userRole: user_role, createServiceDto: CreateServiceDto) {
    // Only vendors can create services
    if (userRole !== user_role.vendor) {
      throw new ForbiddenException('Only vendors can create services');
    }

    const serviceData: any = {
      name: createServiceDto.name,
      description: createServiceDto.description,
      price: createServiceDto.price,
      currency: createServiceDto.currency || 'USD',
      durationMinutes: createServiceDto.durationMinutes,
      imageUrl: createServiceDto.imageUrl,
      category: createServiceDto.category,
      categoryId: createServiceDto.categoryId,
      subcategoryId: createServiceDto.subcategoryId,
      actualServiceId: createServiceDto.actualServiceId,
      deliveryMethod: createServiceDto.deliveryMethod,
      metadata: createServiceDto.metadata,
      vendorId: userId,
    };

    return this.prisma.service.create({
      data: serviceData,
      include: {
        vendor: {
          select: {
            id: true,
            email: true,
            fullName: true,
            businessName: true,
          },
        },
      },
    });
  }

  async getAllServices(category?: string, isActive = true) {
    const where: any = { isActive };
    if (category) {
      where.category = category;
    }
    
    const services = await this.prisma.service.findMany({
      where,
      include: {
        vendor: {
          select: {
            id: true,
            email: true,
            fullName: true,
            businessName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return services;
  }

  async getServiceById(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: {
        vendor: {
          select: {
            id: true,
            email: true,
            fullName: true,
            businessName: true,
          },
        },
      },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }

  async updateService(id: string, userId: string, userRole: user_role, updateServiceDto: UpdateServiceDto) {
    const service = await this.getServiceById(id);

    // Only the service owner or admin can update
    if (service.vendorId !== userId && userRole !== user_role.admin) {
      throw new ForbiddenException('You can only update your own services');
    }

    // Filter out undefined values and map field names
    const updateData: any = {};
    if (updateServiceDto.name !== undefined) updateData.name = updateServiceDto.name;
    if (updateServiceDto.description !== undefined) updateData.description = updateServiceDto.description;
    if (updateServiceDto.price !== undefined) updateData.price = updateServiceDto.price;
    if (updateServiceDto.currency !== undefined) updateData.currency = updateServiceDto.currency;
    if (updateServiceDto.durationMinutes !== undefined) updateData.durationMinutes = updateServiceDto.durationMinutes;
    if (updateServiceDto.imageUrl !== undefined) updateData.imageUrl = updateServiceDto.imageUrl;
    if (updateServiceDto.category !== undefined) updateData.category = updateServiceDto.category;
    if (updateServiceDto.categoryId !== undefined) updateData.categoryId = updateServiceDto.categoryId;
    if (updateServiceDto.subcategoryId !== undefined) updateData.subcategoryId = updateServiceDto.subcategoryId;
    if (updateServiceDto.actualServiceId !== undefined) updateData.actualServiceId = updateServiceDto.actualServiceId;
    if (updateServiceDto.deliveryMethod !== undefined) updateData.deliveryMethod = updateServiceDto.deliveryMethod;
    if (updateServiceDto.metadata !== undefined) updateData.metadata = updateServiceDto.metadata;
    if (updateServiceDto.isActive !== undefined) updateData.isActive = updateServiceDto.isActive;

    return this.prisma.service.update({
      where: { id },
      data: updateData,
      include: {
        vendor: {
          select: {
            id: true,
            email: true,
            fullName: true,
            businessName: true,
          },
        },
      },
    });
  }

  async deleteService(id: string, userId: string, userRole: user_role) {
    const service = await this.getServiceById(id);

    // Only the service owner or admin can delete
    if (service.vendorId !== userId && userRole !== user_role.admin) {
      throw new ForbiddenException('You can only delete your own services');
    }

    return this.prisma.service.delete({
      where: { id },
    });
  }

  async getUserServices(userId: string) {
    const services = await this.prisma.service.findMany({
      where: { vendorId: userId },
      orderBy: { createdAt: 'desc' },
    });

    return services;
  }

  async getServicesByCategory(category: string) {
    const services = await this.prisma.service.findMany({
      where: { 
        category,
        isActive: true,
      },
      include: {
        vendor: {
          select: {
            id: true,
            email: true,
            fullName: true,
            businessName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return services;
  }

  async getServicesByCategoryId(categoryId: string) {
    const services = await this.prisma.service.findMany({
      where: { 
        categoryId,
        isActive: true,
      },
      include: {
        vendor: {
          select: {
            id: true,
            email: true,
            fullName: true,
            businessName: true,
          },
        },
        serviceCategory: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return services;
  }

  async searchServices(query: string) {
    const services = await this.prisma.service.findMany({
      where: {
        AND: [
          { isActive: true },
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
              { category: { contains: query, mode: 'insensitive' } },
              { deliveryMethod: { contains: query, mode: 'insensitive' } },
            ],
          },
        ],
      },
      include: {
        vendor: {
          select: {
            id: true,
            email: true,
            fullName: true,
            businessName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return services;
  }

  async getServicesByDeliveryMethod(deliveryMethod: string) {
    const services = await this.prisma.service.findMany({
      where: { 
        deliveryMethod,
        isActive: true,
      },
      include: {
        vendor: {
          select: {
            id: true,
            email: true,
            fullName: true,
            businessName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return services;
  }

  async getServicesByPriceRange(minPrice: number, maxPrice: number) {
    const services = await this.prisma.service.findMany({
      where: { 
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
        isActive: true,
      },
      include: {
        vendor: {
          select: {
            id: true,
            email: true,
            fullName: true,
            businessName: true,
          },
        },
      },
      orderBy: { price: 'asc' },
    });

    return services;
  }

  async getServicesByDuration(maxDurationMinutes: number) {
    const services = await this.prisma.service.findMany({
      where: { 
        durationMinutes: {
          lte: maxDurationMinutes,
        },
        isActive: true,
      },
      include: {
        vendor: {
          select: {
            id: true,
            email: true,
            fullName: true,
            businessName: true,
          },
        },
      },
      orderBy: { durationMinutes: 'asc' },
    });

    return services;
  }
}
