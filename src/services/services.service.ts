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

  async getAllServices(page = 1, limit = 10, category?: string, isActive = true) {
    const skip = (page - 1) * limit;
    
    const where: any = { isActive };
    if (category) {
      where.category = category;
    }
    
    const [services, total] = await Promise.all([
      this.prisma.service.findMany({
        where,
        skip,
        take: limit,
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
      }),
      this.prisma.service.count({ where }),
    ]);

    return {
      services,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
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

  async getUserServices(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [services, total] = await Promise.all([
      this.prisma.service.findMany({
        where: { vendorId: userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.service.count({ where: { vendorId: userId } }),
    ]);

    return {
      services,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getServicesByCategory(category: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [services, total] = await Promise.all([
      this.prisma.service.findMany({
        where: { 
          category,
          isActive: true,
        },
        skip,
        take: limit,
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
      }),
      this.prisma.service.count({ 
        where: { 
          category,
          isActive: true,
        } 
      }),
    ]);

    return {
      services,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getServicesByCategoryId(categoryId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [services, total] = await Promise.all([
      this.prisma.service.findMany({
        where: { 
          categoryId,
          isActive: true,
        },
        skip,
        take: limit,
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
      }),
      this.prisma.service.count({ 
        where: { 
          categoryId,
          isActive: true,
        } 
      }),
    ]);

    return {
      services,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async searchServices(query: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [services, total] = await Promise.all([
      this.prisma.service.findMany({
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
        skip,
        take: limit,
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
      }),
      this.prisma.service.count({
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
      }),
    ]);

    return {
      services,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getServicesByDeliveryMethod(deliveryMethod: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [services, total] = await Promise.all([
      this.prisma.service.findMany({
        where: { 
          deliveryMethod,
          isActive: true,
        },
        skip,
        take: limit,
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
      }),
      this.prisma.service.count({ 
        where: { 
          deliveryMethod,
          isActive: true,
        } 
      }),
    ]);

    return {
      services,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getServicesByPriceRange(minPrice: number, maxPrice: number, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [services, total] = await Promise.all([
      this.prisma.service.findMany({
        where: { 
          price: {
            gte: minPrice,
            lte: maxPrice,
          },
          isActive: true,
        },
        skip,
        take: limit,
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
      }),
      this.prisma.service.count({ 
        where: { 
          price: {
            gte: minPrice,
            lte: maxPrice,
          },
          isActive: true,
        } 
      }),
    ]);

    return {
      services,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getServicesByDuration(maxDurationMinutes: number, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [services, total] = await Promise.all([
      this.prisma.service.findMany({
        where: { 
          durationMinutes: {
            lte: maxDurationMinutes,
          },
          isActive: true,
        },
        skip,
        take: limit,
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
      }),
      this.prisma.service.count({ 
        where: { 
          durationMinutes: {
            lte: maxDurationMinutes,
          },
          isActive: true,
        } 
      }),
    ]);

    return {
      services,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }
}
