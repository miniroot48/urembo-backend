import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { user_role } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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
      categoryId: createProductDto.categoryId,
      subcategoryId: createProductDto.subcategoryId,
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
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
          },
        },
        subcategory: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
          },
        },
      },
    });
  }

  async getAllProducts(categoryId?: string, isActive = true) {
    const where: any = { isActive };
    if (categoryId) {
      where.categoryId = categoryId;
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
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
          },
        },
        subcategory: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
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
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
          },
        },
        subcategory: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
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
    if (updateProductDto.categoryId !== undefined) updateData.categoryId = updateProductDto.categoryId;
    if (updateProductDto.subcategoryId !== undefined) updateData.subcategoryId = updateProductDto.subcategoryId;
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
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
          },
        },
        subcategory: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
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
      include: {
        retailer: {
          select: {
            id: true,
            email: true,
            fullName: true,
            businessName: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
          },
        },
        subcategory: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
          },
        },
      },
    });

    return products;
  }

  async getProductsByCategory(categoryId: string) {
    const products = await this.prisma.product.findMany({
      where: { 
        categoryId,
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
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
          },
        },
        subcategory: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
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
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
          },
        },
        subcategory: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
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
              { 
                category: {
                  name: { contains: query, mode: 'insensitive' }
                }
              },
              { 
                subcategory: {
                  name: { contains: query, mode: 'insensitive' }
                }
              },
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
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
          },
        },
        subcategory: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
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
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
          },
        },
        subcategory: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
          },
        },
      },
      orderBy: { stockQuantity: 'asc' },
    });

    return products;
  }

  async getProductCategories() {
    return this.prisma.productCategory.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        description: true,
        slug: true,
        imageUrl: true,
        level: true,
        parentId: true,
        position: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        parent: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        children: {
          select: {
            id: true,
            name: true,
            slug: true,
            level: true,
            position: true,
          },
          orderBy: { position: 'asc' },
        },
      },
      orderBy: [
        { level: 'asc' },
        { position: 'asc' },
      ],
    });
  }

  async getProductCategoryById(id: string) {
    const category = await this.prisma.productCategory.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        slug: true,
        imageUrl: true,
        level: true,
        parentId: true,
        position: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        parent: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
          },
        },
        children: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            level: true,
            position: true,
            imageUrl: true,
          },
          orderBy: { position: 'asc' },
        },
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            imageUrl: true,
            isActive: true,
          },
          where: { isActive: true },
          take: 10, // Limit to first 10 products for preview
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Product category not found');
    }

    return category;
  }

  async bulkUpdateIndividualPrices(
    userId: string, 
    userRole: user_role, 
    updates: { productId: string; newPrice: number }[]
  ) {
    try {
      const results = [];
      
      for (const update of updates) {
        // Get the product to verify ownership
        const product = await this.getProductById(update.productId);
        
        // Only the product owner or admin can update
        if (product.retailerId !== userId && userRole !== user_role.admin) {
          throw new ForbiddenException(`You can only update your own products. Product ${update.productId} is not yours.`);
        }

        // Update the product price
        const updatedProduct = await this.prisma.product.update({
          where: { id: update.productId },
          data: { price: update.newPrice },
          include: {
            retailer: {
              select: {
                id: true,
                email: true,
                fullName: true,
                businessName: true,
              },
            },
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
                description: true,
              },
            },
            subcategory: {
              select: {
                id: true,
                name: true,
                slug: true,
                description: true,
              },
            },
          },
        });

        results.push({
          productId: update.productId,
          success: true,
          newPrice: update.newPrice,
          product: updatedProduct,
        });
      }

      return {
        success: true,
        message: `Successfully updated prices for ${results.length} products`,
        results,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to bulk update individual prices',
        results: [],
      };
    }
  }

  async bulkUpdateIndividualStock(
    userId: string, 
    userRole: user_role, 
    updates: { productId: string; newStock: number }[]
  ) {
    try {
      const results = [];
      
      for (const update of updates) {
        // Get the product to verify ownership
        const product = await this.getProductById(update.productId);
        
        // Only the product owner or admin can update
        if (product.retailerId !== userId && userRole !== user_role.admin) {
          throw new ForbiddenException(`You can only update your own products. Product ${update.productId} is not yours.`);
        }

        // Update the product stock
        const updatedProduct = await this.prisma.product.update({
          where: { id: update.productId },
          data: { stockQuantity: update.newStock },
          include: {
            retailer: {
              select: {
                id: true,
                email: true,
                fullName: true,
                businessName: true,
              },
            },
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
                description: true,
              },
            },
            subcategory: {
              select: {
                id: true,
                name: true,
                slug: true,
                description: true,
              },
            },
          },
        });

        results.push({
          productId: update.productId,
          success: true,
          newStock: update.newStock,
          product: updatedProduct,
        });
      }

      return {
        success: true,
        message: `Successfully updated stock for ${results.length} products`,
        results,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to bulk update individual stock',
        results: [],
      };
    }
  }
}
