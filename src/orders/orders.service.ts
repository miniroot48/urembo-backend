import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { order_status, order_status_enhanced } from '@prisma/client';

export interface CreateOrderDto {
  cartItems: Array<{
    type: 'product' | 'service';
    id: string;
    name: string;
    price: number;
    quantity?: number;
    vendorId?: string;
    staffId?: string;
    appointmentDate?: string;
    durationMinutes?: number;
    currency: string;
  }>;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: {
    address: string;
    city: string;
  };
  notes?: string;
  currency: string;
  totalAmount: number;
}

export interface UpdateOrderDto {
  status?: order_status;
  statusEnhanced?: order_status_enhanced;
  notes?: string;
  escrowAmount?: number;
  escrowStatus?: string;
  commissionAmount?: number;
  commissionRate?: number;
  confirmedAt?: Date;
  completedAt?: Date;
  completionConfirmedAt?: Date;
  disputedAt?: Date;
  autoReleaseAt?: Date;
}

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async createOrder(userId: string | null, createOrderDto: CreateOrderDto) {
    const { cartItems, ...orderData } = createOrderDto;

    // Create the order
    const order = await this.prisma.order.create({
      data: {
        ...orderData,
        userId,
      },
    });

    // Process cart items
    const productItems = cartItems.filter(item => item.type === 'product');
    const serviceItems = cartItems.filter(item => item.type === 'service');

    // Create order items for products
    if (productItems.length > 0) {
      const orderItems = productItems.map(item => ({
        orderId: order.id,
        productId: item.id,
        quantity: item.quantity || 1,
        unitPrice: item.price,
        totalPrice: item.price * (item.quantity || 1),
        currency: orderData.currency,
        title: item.name,
        type: 'product',
      }));

      await this.prisma.orderItem.createMany({
        data: orderItems,
      });
    }

    // Create service appointments for services
    if (serviceItems.length > 0) {
      const serviceAppointments = serviceItems.map(item => ({
        orderId: order.id,
        serviceId: item.id,
        vendorId: item.vendorId!,
        staffId: item.staffId,
        appointmentDate: new Date(item.appointmentDate!),
        durationMinutes: item.durationMinutes || 60,
        servicePrice: item.price,
        currency: orderData.currency,
        status: 'PENDING' as const,
        notes: orderData.notes,
      }));

      await this.prisma.serviceAppointment.createMany({
        data: serviceAppointments,
      });
    }

    // Send order confirmation email
    try {
      const orderDataForEmail = {
        orderId: order.id,
        totalAmount: orderData.totalAmount,
        currency: orderData.currency,
        items: cartItems.map(item => item.name)
      };
      await this.emailService.sendNewOrderEmail(
        orderData.customerEmail,
        'Customer',
        order.id,
        orderDataForEmail
      );
    } catch (error) {
      console.error('Failed to send order confirmation email:', error);
      // Don't fail order creation if email fails
    }

    return this.getOrderById(order.id);
  }

  async getAllOrders(status?: order_status) {
    const where = status ? { status } : {};
    
    const orders = await this.prisma.order.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                retailerId: true,
              },
            },
          },
        },
        serviceAppointments: {
          include: {
            service: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
            vendor: {
              select: {
                id: true,
                email: true,
                fullName: true,
                businessName: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return orders;
  }

  async getOrderById(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                imageUrl: true,
                retailerId: true,
              },
            },
          },
        },
        serviceAppointments: {
          include: {
            service: {
              select: {
                id: true,
                name: true,
                price: true,
                imageUrl: true,
              },
            },
            vendor: {
              select: {
                id: true,
                email: true,
                fullName: true,
                businessName: true,
              },
            },
          },
        },
        shipments: {
          include: {
            statusUpdates: {
              orderBy: { updatedAt: 'desc' },
            },
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateOrder(id: string, userId: string, userRole: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.getOrderById(id);

    // Only the order owner, admin, or related business users can update
    const canUpdate = 
      order.userId === userId || 
      userRole === 'ADMIN' ||
      order.orderItems.some(item => item.product.retailerId === userId) ||
      order.serviceAppointments.some(appointment => appointment.vendorId === userId);

    if (!canUpdate) {
      throw new ForbiddenException('You cannot update this order');
    }

    // Store old status for comparison
    const oldStatus = order.status;

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
        },
        serviceAppointments: {
          include: {
            service: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
            vendor: {
              select: {
                id: true,
                email: true,
                fullName: true,
                businessName: true,
              },
            },
          },
        },
      },
    });

    // Send email notification if status changed
    try {
      const newStatus = updateOrderDto.status;
      if (newStatus && newStatus !== oldStatus) {
        const customerEmail = order.user?.email || order.customerEmail;
        const customerName = order.user?.fullName || 'Customer';
        const orderData = {
          orderId: order.id,
          totalAmount: order.totalAmount,
          currency: order.currency,
          items: order.orderItems.map(item => item.title)
        };
        
        if (newStatus === order_status.confirmed) {
          await this.emailService.sendOrderAcceptedEmail(
            customerEmail,
            customerName,
            order.id,
            orderData
          );
        } else if (newStatus === order_status.shipped) {
          await this.emailService.sendOrderShippedEmail(
            customerEmail,
            customerName,
            order.id,
            'TRK123456789'
          );
        } else if (newStatus === order_status.delivered) {
          await this.emailService.sendOrderDeliveredEmail(
            customerEmail,
            customerName,
            order.id
          );
        }
      }
    } catch (error) {
      console.error('Failed to send order status email:', error);
      // Don't fail order update if email fails
    }

    return updatedOrder;
  }

  async getUserOrders(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                imageUrl: true,
              },
            },
          },
        },
        serviceAppointments: {
          include: {
            service: {
              select: {
                id: true,
                name: true,
                price: true,
                imageUrl: true,
              },
            },
            vendor: {
              select: {
                id: true,
                email: true,
                fullName: true,
                businessName: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return orders;
  }

  async confirmOrder(id: string, userId: string, userRole: string) {
    const order = await this.getOrderById(id);
    
    // Check permissions
    const canConfirm = 
      order.userId === userId || 
      userRole === 'admin' ||
      order.retailerId === userId ||
      order.vendorId === userId;

    if (!canConfirm) {
      throw new ForbiddenException('You do not have permission to confirm this order');
    }

    return this.prisma.order.update({
      where: { id },
      data: {
        status: order_status.confirmed,
        statusEnhanced: order_status_enhanced.paid,
        confirmedAt: new Date(),
      },
    });
  }

  async completeOrder(id: string, userId: string, userRole: string) {
    const order = await this.getOrderById(id);
    
    // Check permissions
    const canComplete = 
      order.userId === userId || 
      userRole === 'admin' ||
      order.retailerId === userId ||
      order.vendorId === userId;

    if (!canComplete) {
      throw new ForbiddenException('You do not have permission to complete this order');
    }

    return this.prisma.order.update({
      where: { id },
      data: {
        status: order_status.delivered,
        statusEnhanced: order_status_enhanced.completed,
        completedAt: new Date(),
      },
    });
  }

  async cancelOrder(id: string, userId: string, userRole: string, reason?: string) {
    const order = await this.getOrderById(id);
    
    // Check permissions
    const canCancel = 
      order.userId === userId || 
      userRole === 'admin' ||
      order.retailerId === userId ||
      order.vendorId === userId;

    if (!canCancel) {
      throw new ForbiddenException('You do not have permission to cancel this order');
    }

    return this.prisma.order.update({
      where: { id },
      data: {
        status: order_status.cancelled,
        statusEnhanced: order_status_enhanced.cancelled,
        notes: reason ? `${order.notes || ''}\nCancellation reason: ${reason}`.trim() : order.notes,
      },
    });
  }

  async disputeOrder(id: string, userId: string, reason: string, evidence?: any) {
    const order = await this.getOrderById(id);
    
    // Only the order owner can dispute
    if (order.userId !== userId) {
      throw new ForbiddenException('Only the order owner can dispute this order');
    }

    return this.prisma.order.update({
      where: { id },
      data: {
        statusEnhanced: order_status_enhanced.disputed,
        disputedAt: new Date(),
        notes: `${order.notes || ''}\nDispute reason: ${reason}`.trim(),
      },
    });
  }

  async updateEscrowStatus(id: string, escrowAmount: number, escrowStatus: string) {
    return this.prisma.order.update({
      where: { id },
      data: {
        escrowAmount,
        escrowStatus,
      },
    });
  }

  async updateCommission(id: string, commissionAmount: number, commissionRate: number) {
    return this.prisma.order.update({
      where: { id },
      data: {
        commissionAmount,
        commissionRate,
      },
    });
  }

  async getOrdersByStatus(status: order_status) {
    const orders = await this.prisma.order.findMany({
      where: { status },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return orders;
  }

  async getOrdersByUser(userId: string, userRole: string) {
    let where: any = {};
    
    // Different users see different orders based on their role
    switch (userRole) {
      case 'client':
        where = { userId };
        break;
      case 'retailer':
        where = { retailerId: userId };
        break;
      case 'vendor':
        where = { vendorId: userId };
        break;
      case 'manufacturer':
        where = { manufacturerId: userId };
        break;
      case 'admin':
        where = {}; // Admins can see all orders
        break;
      default:
        where = { userId };
    }
    
    const orders = await this.prisma.order.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return orders;
  }

  async getOrderItemsByRetailerId(retailerId: string) {
    return this.prisma.orderItem.findMany({
      where: {
        product: {
          retailerId: retailerId,
        },
        order: {
          statusEnhanced: 'completed',
        },
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
        order: {
          select: {
            createdAt: true,
            clientId: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getServiceAppointmentsByVendorId(vendorId: string) {
    return this.prisma.serviceAppointment.findMany({
      where: {
        vendorId: vendorId,
      },
      include: {
        order: {
          select: {
            createdAt: true,
            clientId: true,
          },
        },
        service: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
