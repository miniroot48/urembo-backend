import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWishlistItemDto } from './dto/create-wishlist-item.dto';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  async getUserWishlist(userId: string) {
    const wishlistItems = await this.prisma.wishlist.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            retailer: {
              select: {
                id: true,
                businessName: true,
                fullName: true,
              }
            }
          }
        },
        service: {
          include: {
            vendor: {
              select: {
                id: true,
                businessName: true,
                fullName: true,
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return wishlistItems.map(item => ({
      id: item.id,
      userId: item.userId,
      itemId: item.itemId,
      itemType: item.itemType,
      createdAt: item.createdAt,
      updatedAt: item.createdAt, // Wishlist doesn't have updatedAt in schema
      product: item.product ? {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        currency: item.product.currency,
        imageUrl: item.product.imageUrl,
        retailerId: item.product.retailerId,
        stockQuantity: item.product.stockQuantity,
        retailer: item.product.retailer
      } : undefined,
      service: item.service ? {
        id: item.service.id,
        name: item.service.name,
        price: item.service.price,
        currency: item.service.currency,
        imageUrl: item.service.imageUrl,
        vendorId: item.service.vendorId,
        durationMinutes: item.service.durationMinutes,
        vendor: item.service.vendor
      } : undefined,
    }));
  }

  async addToWishlist(userId: string, createWishlistItemDto: CreateWishlistItemDto) {
    const { itemId, itemType } = createWishlistItemDto;

    // Check if item already exists in wishlist
    const existingItem = await this.prisma.wishlist.findFirst({
      where: {
        userId,
        itemId,
        itemType
      }
    });

    if (existingItem) {
      throw new ConflictException('Item already exists in wishlist');
    }

    // Verify the item exists and prepare data
    let createData: any = {
      userId,
      itemId,
      itemType
    };

    if (itemType === 'product') {
      const product = await this.prisma.product.findUnique({
        where: { id: itemId }
      });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      createData.productId = itemId;
    } else if (itemType === 'service') {
      const service = await this.prisma.service.findUnique({
        where: { id: itemId }
      });
      if (!service) {
        throw new NotFoundException('Service not found');
      }
      createData.serviceId = itemId;
    }

    const wishlistItem = await this.prisma.wishlist.create({
      data: createData,
      include: {
        product: {
          include: {
            retailer: {
              select: {
                id: true,
                businessName: true,
                fullName: true,
              }
            }
          }
        },
        service: {
          include: {
            vendor: {
              select: {
                id: true,
                businessName: true,
                fullName: true,
              }
            }
          }
        }
      }
    });

    return {
      id: wishlistItem.id,
      userId: wishlistItem.userId,
      itemId: wishlistItem.itemId,
      itemType: wishlistItem.itemType,
      createdAt: wishlistItem.createdAt,
      updatedAt: wishlistItem.createdAt,
      product: wishlistItem.product ? {
        id: wishlistItem.product.id,
        name: wishlistItem.product.name,
        price: wishlistItem.product.price,
        currency: wishlistItem.product.currency,
        imageUrl: wishlistItem.product.imageUrl,
        retailerId: wishlistItem.product.retailerId,
        stockQuantity: wishlistItem.product.stockQuantity,
        retailer: wishlistItem.product.retailer
      } : undefined,
      service: wishlistItem.service ? {
        id: wishlistItem.service.id,
        name: wishlistItem.service.name,
        price: wishlistItem.service.price,
        currency: wishlistItem.service.currency,
        imageUrl: wishlistItem.service.imageUrl,
        vendorId: wishlistItem.service.vendorId,
        durationMinutes: wishlistItem.service.durationMinutes,
        vendor: wishlistItem.service.vendor
      } : undefined,
    };
  }

  async removeFromWishlist(userId: string, wishlistItemId: string) {
    const wishlistItem = await this.prisma.wishlist.findFirst({
      where: {
        id: wishlistItemId,
        userId
      }
    });

    if (!wishlistItem) {
      throw new NotFoundException('Wishlist item not found');
    }

    await this.prisma.wishlist.delete({
      where: { id: wishlistItemId }
    });

    return { message: 'Item removed from wishlist successfully' };
  }

  async isInWishlist(userId: string, itemId: string, itemType: 'product' | 'service') {
    const wishlistItem = await this.prisma.wishlist.findFirst({
      where: {
        userId,
        itemId,
        itemType
      }
    });

    return !!wishlistItem;
  }

  async clearWishlist(userId: string) {
    await this.prisma.wishlist.deleteMany({
      where: { userId }
    });

    return { message: 'Wishlist cleared successfully' };
  }

  async getWishlistCount(userId: string) {
    const count = await this.prisma.wishlist.count({
      where: { userId }
    });

    return count;
  }

  async getWishlistByType(userId: string, itemType: 'product' | 'service') {
    const wishlistItems = await this.prisma.wishlist.findMany({
      where: {
        userId,
        itemType
      },
      include: {
        product: {
          include: {
            retailer: {
              select: {
                id: true,
                businessName: true,
                fullName: true,
              }
            }
          }
        },
        service: {
          include: {
            vendor: {
              select: {
                id: true,
                businessName: true,
                fullName: true,
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return wishlistItems.map(item => ({
      id: item.id,
      userId: item.userId,
      itemId: item.itemId,
      itemType: item.itemType,
      createdAt: item.createdAt,
      updatedAt: item.createdAt,
      product: item.product ? {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        currency: item.product.currency,
        imageUrl: item.product.imageUrl,
        retailerId: item.product.retailerId,
        stockQuantity: item.product.stockQuantity,
        retailer: item.product.retailer
      } : undefined,
      service: item.service ? {
        id: item.service.id,
        name: item.service.name,
        price: item.service.price,
        currency: item.service.currency,
        imageUrl: item.service.imageUrl,
        vendorId: item.service.vendorId,
        durationMinutes: item.service.durationMinutes,
        vendor: item.service.vendor
      } : undefined,
    }));
  }

  async getWishlistStats(userId: string) {
    const wishlistItems = await this.prisma.wishlist.findMany({
      where: { userId },
      include: {
        product: true,
        service: true
      }
    });

    const products = wishlistItems.filter(item => item.itemType === 'product');
    const services = wishlistItems.filter(item => item.itemType === 'service');

    const totalValue = wishlistItems.reduce((sum, item) => {
      if (item.product) {
        return sum + Number(item.product.price);
      } else if (item.service) {
        return sum + Number(item.service.price);
      }
      return sum;
    }, 0);

    const averageItemValue = wishlistItems.length > 0 ? totalValue / wishlistItems.length : 0;

    return {
      totalItems: wishlistItems.length,
      productCount: products.length,
      serviceCount: services.length,
      totalValue,
      averageItemValue
    };
  }
}
