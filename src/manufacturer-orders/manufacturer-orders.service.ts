import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateManufacturerOrderDto } from './dto/create-manufacturer-order.dto';
import { UpdateManufacturerOrderDto } from './dto/update-manufacturer-order.dto';

@Injectable()
export class ManufacturerOrdersService {
  constructor(private prisma: PrismaService) {}

  // Get all manufacturer orders with filtering and pagination
  async getAllOrders(
    page: number = 1,
    limit: number = 10,
    status?: string,
    manufacturerId?: string,
    retailerId?: string
  ) {
    const skip = (page - 1) * limit;
    
    const where: any = {};
    if (status) where.status = status;
    if (manufacturerId) where.manufacturerId = manufacturerId;
    if (retailerId) where.retailerId = retailerId;

    const [orders, total] = await Promise.all([
      this.prisma.manufacturerOrder.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          retailer: {
            select: {
              id: true,
              fullName: true,
              businessName: true,
              email: true,
              phone: true,
            },
          },
          manufacturer: {
            select: {
              id: true,
              fullName: true,
              businessName: true,
              email: true,
              phone: true,
            },
          },
          product: {
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              currency: true,
              imageUrl: true,
              stockQuantity: true,
              sku: true,
            },
          },
        },
      }),
      this.prisma.manufacturerOrder.count({ where }),
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Get order by ID
  async getOrderById(id: string) {
    const order = await this.prisma.manufacturerOrder.findUnique({
      where: { id },
      include: {
        retailer: {
          select: {
            id: true,
            fullName: true,
            businessName: true,
            email: true,
            phone: true,
            businessAddress: true,
          },
        },
        manufacturer: {
          select: {
            id: true,
            fullName: true,
            businessName: true,
            email: true,
            phone: true,
            businessAddress: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            currency: true,
            imageUrl: true,
            stockQuantity: true,
            sku: true,
            category: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Manufacturer order not found');
    }

    return order;
  }

  // Create new manufacturer order (retailer places order with manufacturer)
  async createOrder(createOrderDto: CreateManufacturerOrderDto, retailerId: string) {
    const {
      manufacturerId,
      productId,
      quantity,
      notes,
      shippingAddress,
      billingAddress,
      paymentTerms,
      requestedDeliveryDate,
      metadata,
      tags = [],
      discount = 0,
      tax = 0,
      shippingCost = 0,
    } = createOrderDto;

    // Validate manufacturer exists
    const manufacturer = await this.prisma.profile.findUnique({
      where: { id: manufacturerId },
    });
    if (!manufacturer) {
      throw new BadRequestException('Invalid manufacturer ID');
    }

    // Validate product exists and belongs to manufacturer
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new BadRequestException('Invalid product ID');
    }

    if (product.retailerId !== manufacturerId) {
      throw new BadRequestException('Product does not belong to the specified manufacturer');
    }

    // Check if product has sufficient stock
    if (product.stockQuantity < quantity) {
      throw new BadRequestException('Insufficient stock available');
    }

    // Calculate pricing
    const unitPrice = product.price;
    const subtotal = Number(unitPrice) * quantity;
    const discountAmount = (subtotal * discount) / 100;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * tax) / 100;
    const totalAmount = taxableAmount + taxAmount + shippingCost;

    const order = await this.prisma.manufacturerOrder.create({
      data: {
        retailerId,
        manufacturerId,
        productId,
        quantity,
        unitPrice,
        subtotal,
        discount,
        // discountAmount, // This field doesn't exist in the schema
        tax,
        // taxAmount, // This field doesn't exist in the schema
        shippingCost,
        totalAmount,
        currency: product.currency,
        notes,
        // shippingAddress, // This field doesn't exist in the schema
        // billingAddress, // This field doesn't exist in the schema
        // paymentTerms, // This field doesn't exist in the schema
        requestedDeliveryDate: requestedDeliveryDate ? new Date(requestedDeliveryDate) : null,
        // metadata, // This field doesn't exist in the schema
        // tags, // This field doesn't exist in the schema
        status: 'pending',
      },
      include: {
        retailer: {
          select: {
            id: true,
            fullName: true,
            businessName: true,
            email: true,
            phone: true,
          },
        },
        manufacturer: {
          select: {
            id: true,
            fullName: true,
            businessName: true,
            email: true,
            phone: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            currency: true,
            imageUrl: true,
            stockQuantity: true,
            sku: true,
          },
        },
      },
    });

    return order;
  }

  // Update manufacturer order (manufacturer can update status, tracking, etc.)
  async updateOrder(id: string, updateOrderDto: UpdateManufacturerOrderDto, userId: string, userRole: string) {
    const order = await this.getOrderById(id);

    // Check permissions - manufacturer can update their orders, retailer can update their orders
    if (userRole !== 'admin' && order.manufacturerId !== userId && order.retailerId !== userId) {
      throw new ForbiddenException('You can only update your own orders');
    }

    // If manufacturer is updating, they can update status, tracking, etc.
    // If retailer is updating, they can update notes, addresses, etc.
    const allowedUpdates: any = {};
    
    if (order.manufacturerId === userId || userRole === 'admin') {
      // Manufacturer updates
      if (updateOrderDto.status) allowedUpdates.status = updateOrderDto.status;
      if (updateOrderDto.trackingNumber) allowedUpdates.trackingNumber = updateOrderDto.trackingNumber;
      if (updateOrderDto.shippingCarrier) allowedUpdates.shippingCarrier = updateOrderDto.shippingCarrier;
      if (updateOrderDto.estimatedDelivery) allowedUpdates.estimatedDelivery = new Date(updateOrderDto.estimatedDelivery);
      if (updateOrderDto.actualDelivery) allowedUpdates.actualDelivery = new Date(updateOrderDto.actualDelivery);
      if (updateOrderDto.unitPrice) allowedUpdates.unitPrice = updateOrderDto.unitPrice;
      if (updateOrderDto.discount !== undefined) allowedUpdates.discount = updateOrderDto.discount;
      if (updateOrderDto.tax !== undefined) allowedUpdates.tax = updateOrderDto.tax;
      if (updateOrderDto.shippingCost !== undefined) allowedUpdates.shippingCost = updateOrderDto.shippingCost;
    }
    
    if (order.retailerId === userId || userRole === 'admin') {
      // Retailer updates
      if (updateOrderDto.notes) allowedUpdates.notes = updateOrderDto.notes;
      if (updateOrderDto.shippingAddress) allowedUpdates.shippingAddress = updateOrderDto.shippingAddress;
      if (updateOrderDto.billingAddress) allowedUpdates.billingAddress = updateOrderDto.billingAddress;
      if (updateOrderDto.paymentTerms) allowedUpdates.paymentTerms = updateOrderDto.paymentTerms;
      if (updateOrderDto.requestedDeliveryDate) allowedUpdates.requestedDeliveryDate = new Date(updateOrderDto.requestedDeliveryDate);
    }

    // Recalculate totals if pricing changed
    if (updateOrderDto.unitPrice || updateOrderDto.discount !== undefined || updateOrderDto.tax !== undefined || updateOrderDto.shippingCost !== undefined) {
      const newUnitPrice = updateOrderDto.unitPrice || order.unitPrice;
      const newDiscount = updateOrderDto.discount !== undefined ? updateOrderDto.discount : order.discount;
      const newTax = updateOrderDto.tax !== undefined ? updateOrderDto.tax : order.tax;
      const newShippingCost = updateOrderDto.shippingCost !== undefined ? updateOrderDto.shippingCost : order.shippingCost;
      
      const subtotal = Number(newUnitPrice) * order.quantity;
      const discountAmount = (subtotal * Number(newDiscount)) / 100;
      const taxableAmount = subtotal - discountAmount;
      const taxAmount = (taxableAmount * Number(newTax)) / 100;
      const totalAmount = taxableAmount + taxAmount + Number(newShippingCost);

      allowedUpdates.subtotal = subtotal;
      allowedUpdates.discountAmount = discountAmount;
      allowedUpdates.taxAmount = taxAmount;
      allowedUpdates.totalAmount = totalAmount;
    }

    const updatedOrder = await this.prisma.manufacturerOrder.update({
      where: { id },
      data: allowedUpdates,
      include: {
        retailer: {
          select: {
            id: true,
            fullName: true,
            businessName: true,
            email: true,
            phone: true,
          },
        },
        manufacturer: {
          select: {
            id: true,
            fullName: true,
            businessName: true,
            email: true,
            phone: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            currency: true,
            imageUrl: true,
            stockQuantity: true,
            sku: true,
          },
        },
      },
    });

    return updatedOrder;
  }

  // Cancel manufacturer order
  async cancelOrder(id: string, userId: string, userRole: string, reason?: string) {
    const order = await this.getOrderById(id);

    // Check permissions
    if (userRole !== 'admin' && order.retailerId !== userId) {
      throw new ForbiddenException('You can only cancel your own orders');
    }

    // Check if order can be cancelled
    if (['shipped', 'delivered', 'cancelled'].includes(order.status)) {
      throw new BadRequestException('Order cannot be cancelled in current status');
    }

    const updatedOrder = await this.prisma.manufacturerOrder.update({
      where: { id },
      data: {
        status: 'cancelled',
        notes: reason ? `${order.notes || ''}\nCancellation reason: ${reason}`.trim() : order.notes,
      },
      include: {
        retailer: {
          select: {
            id: true,
            fullName: true,
            businessName: true,
            email: true,
            phone: true,
          },
        },
        manufacturer: {
          select: {
            id: true,
            fullName: true,
            businessName: true,
            email: true,
            phone: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            currency: true,
            imageUrl: true,
            stockQuantity: true,
            sku: true,
          },
        },
      },
    });

    return updatedOrder;
  }

  // Get manufacturer's orders (orders received from retailers)
  async getManufacturerOrders(manufacturerId: string, page: number = 1, limit: number = 10, status?: string) {
    const skip = (page - 1) * limit;
    
    const where: any = { manufacturerId };
    if (status) where.status = status;

    const [orders, total] = await Promise.all([
      this.prisma.manufacturerOrder.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          retailer: {
            select: {
              id: true,
              fullName: true,
              businessName: true,
              email: true,
              phone: true,
            },
          },
          product: {
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              currency: true,
              imageUrl: true,
              stockQuantity: true,
              sku: true,
            },
          },
        },
      }),
      this.prisma.manufacturerOrder.count({ where }),
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Get retailer's orders (orders placed with manufacturers)
  async getRetailerOrders(retailerId: string, page: number = 1, limit: number = 10, status?: string) {
    const skip = (page - 1) * limit;
    
    const where: any = { retailerId };
    if (status) where.status = status;

    const [orders, total] = await Promise.all([
      this.prisma.manufacturerOrder.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          manufacturer: {
            select: {
              id: true,
              fullName: true,
              businessName: true,
              email: true,
              phone: true,
            },
          },
          product: {
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              currency: true,
              imageUrl: true,
              stockQuantity: true,
              sku: true,
            },
          },
        },
      }),
      this.prisma.manufacturerOrder.count({ where }),
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Get manufacturer order statistics
  async getManufacturerOrderStats(manufacturerId?: string, retailerId?: string) {
    let where: any = {};
    
    if (manufacturerId) where.manufacturerId = manufacturerId;
    if (retailerId) where.retailerId = retailerId;

    const [
      totalOrders,
      pendingOrders,
      confirmedOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
    ] = await Promise.all([
      this.prisma.manufacturerOrder.count({ where }),
      this.prisma.manufacturerOrder.count({ where: { ...where, status: 'pending' } }),
      this.prisma.manufacturerOrder.count({ where: { ...where, status: 'confirmed' } }),
      this.prisma.manufacturerOrder.count({ where: { ...where, status: 'processing' } }),
      this.prisma.manufacturerOrder.count({ where: { ...where, status: 'shipped' } }),
      this.prisma.manufacturerOrder.count({ where: { ...where, status: 'delivered' } }),
      this.prisma.manufacturerOrder.count({ where: { ...where, status: 'cancelled' } }),
      this.prisma.manufacturerOrder.aggregate({
        where: { ...where, status: { not: 'cancelled' } },
        _sum: { totalAmount: true },
      }),
    ]);

    return {
      totalOrders,
      pendingOrders,
      confirmedOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
    };
  }

  // Search manufacturer orders
  async searchOrders(query: string, manufacturerId?: string, retailerId?: string) {
    let where: any = {
      OR: [
        { notes: { contains: query, mode: 'insensitive' } },
        { trackingNumber: { contains: query, mode: 'insensitive' } },
        { shippingCarrier: { contains: query, mode: 'insensitive' } },
        { tags: { has: query } },
      ],
    };

    if (manufacturerId) where.manufacturerId = manufacturerId;
    if (retailerId) where.retailerId = retailerId;

    return this.prisma.manufacturerOrder.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        retailer: {
          select: {
            id: true,
            fullName: true,
            businessName: true,
            email: true,
            phone: true,
          },
        },
        manufacturer: {
          select: {
            id: true,
            fullName: true,
            businessName: true,
            email: true,
            phone: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            currency: true,
            imageUrl: true,
            stockQuantity: true,
            sku: true,
          },
        },
      },
    });
  }
}
