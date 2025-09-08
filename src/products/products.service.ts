import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { user_role } from '@prisma/client';

export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  currency?: string;
  stockQuantity?: number;
  imageUrl?: string;
  category?: string;
  subcategory?: string;
  sku?: string;
  tags?: string[];
  qcStatus?: string;
  manufacturerId?: string;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  currency?: string;
  stockQuantity?: number;
  imageUrl?: string;
  category?: string;
  subcategory?: string;
  sku?: string;
  tags?: string[];
  qcStatus?: string;
  manufacturerId?: string;
  isActive?: boolean;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createProduct(userId: string, userRole: user_role, createProductDto: CreateProductDto) {
    // Only retailers and manufacturers can create products
    if (userRole !== user_role.retailer && userRole !== user_role.manufacturer) {
      throw new ForbiddenException('Only retailers and manufacturers can create products');
    }

    const productData: any = {
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      currency: createProductDto.currency || 'USD',
      stockQuantity: createProductDto.stockQuantity || 0,
      imageUrl: createProductDto.imageUrl,
      category: createProductDto.category,
      subcategory: createProductDto.subcategory,
      sku: createProductDto.sku,
      tags: createProductDto.tags || [],
      qcStatus: createProductDto.qcStatus,
      retailerId: userId,
      createdByRole: userRole,
    };

    // Add manufacturerId if provided and user is a manufacturer
    if (createProductDto.manufacturerId && userRole === user_role.manufacturer) {
      productData.manufacturerId = createProductDto.manufacturerId;
    } else if (userRole === user_role.manufacturer) {
      productData.manufacturerId = userId;
    }

    return this.prisma.product.create({
      data: productData,
      include: {
        retailer: {
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

  async getAllProducts(category?: string, isActive = true) {
    const where: any = { isActive };
    if (category) {
      where.category = category;
    }
    
    const products = await this.prisma.product.findMany({
      where,
      include: {
        retailer: {
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

    return products;
  }

  async getProductById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        retailer: {
          select: {
            id: true,
            email: true,
            fullName: true,
            businessName: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async updateProduct(id: string, userId: string, userRole: user_role, updateProductDto: UpdateProductDto) {
    const product = await this.getProductById(id);

    // Only the product owner or admin can update
    if (product.retailerId !== userId && userRole !== user_role.admin) {
      throw new ForbiddenException('You can only update your own products');
    }

    // Filter out undefined values and map field names
    const updateData: any = {};
    if (updateProductDto.name !== undefined) updateData.name = updateProductDto.name;
    if (updateProductDto.description !== undefined) updateData.description = updateProductDto.description;
    if (updateProductDto.price !== undefined) updateData.price = updateProductDto.price;
    if (updateProductDto.currency !== undefined) updateData.currency = updateProductDto.currency;
    if (updateProductDto.stockQuantity !== undefined) updateData.stockQuantity = updateProductDto.stockQuantity;
    if (updateProductDto.imageUrl !== undefined) updateData.imageUrl = updateProductDto.imageUrl;
    if (updateProductDto.category !== undefined) updateData.category = updateProductDto.category;
    if (updateProductDto.subcategory !== undefined) updateData.subcategory = updateProductDto.subcategory;
    if (updateProductDto.sku !== undefined) updateData.sku = updateProductDto.sku;
    if (updateProductDto.tags !== undefined) updateData.tags = updateProductDto.tags;
    if (updateProductDto.qcStatus !== undefined) updateData.qcStatus = updateProductDto.qcStatus;
    if (updateProductDto.manufacturerId !== undefined) updateData.manufacturerId = updateProductDto.manufacturerId;
    if (updateProductDto.isActive !== undefined) updateData.isActive = updateProductDto.isActive;

    return this.prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        retailer: {
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

  async deleteProduct(id: string, userId: string, userRole: user_role) {
    const product = await this.getProductById(id);

    // Only the product owner or admin can delete
    if (product.retailerId !== userId && userRole !== user_role.admin) {
      throw new ForbiddenException('You can only delete your own products');
    }

    return this.prisma.product.delete({
      where: { id },
    });
  }

  async getUserProducts(userId: string) {
    const products = await this.prisma.product.findMany({
      where: { retailerId: userId },
      orderBy: { createdAt: 'desc' },
    });

    return products;
  }

  async getProductsByCategory(category: string) {
    const products = await this.prisma.product.findMany({
      where: { 
        category,
        isActive: true,
      },
      include: {
        retailer: {
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

    return products;
  }

  async getProductsByManufacturer(manufacturerId: string) {
    const products = await this.prisma.product.findMany({
      where: { 
        manufacturerId,
        isActive: true,
      },
      include: {
        retailer: {
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

    return products;
  }

  async searchProducts(query: string) {
    const products = await this.prisma.product.findMany({
      where: {
        AND: [
          { isActive: true },
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
              { category: { contains: query, mode: 'insensitive' } },
              { subcategory: { contains: query, mode: 'insensitive' } },
              { sku: { contains: query, mode: 'insensitive' } },
              { tags: { has: query } },
            ],
          },
        ],
      },
      include: {
        retailer: {
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

    return products;
  }

  async updateStockQuantity(id: string, userId: string, userRole: user_role, quantity: number) {
    const product = await this.getProductById(id);

    // Only the product owner or admin can update stock
    if (product.retailerId !== userId && userRole !== user_role.admin) {
      throw new ForbiddenException('You can only update stock for your own products');
    }

    return this.prisma.product.update({
      where: { id },
      data: { stockQuantity: quantity },
    });
  }

  async updateQcStatus(id: string, userId: string, userRole: user_role, qcStatus: string) {
    const product = await this.getProductById(id);

    // Only the product owner or admin can update QC status
    if (product.retailerId !== userId && userRole !== user_role.admin) {
      throw new ForbiddenException('You can only update QC status for your own products');
    }

    return this.prisma.product.update({
      where: { id },
      data: { qcStatus },
    });
  }

  async getLowStockProducts(threshold = 10) {
    const products = await this.prisma.product.findMany({
      where: {
        stockQuantity: { lte: threshold },
        isActive: true,
      },
      include: {
        retailer: {
          select: {
            id: true,
            email: true,
            fullName: true,
            businessName: true,
          },
        },
      },
      orderBy: { stockQuantity: 'asc' },
    });

    return products;
  }
}
