"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrder(userId, createOrderDto) {
        const { cartItems, ...orderData } = createOrderDto;
        const order = await this.prisma.order.create({
            data: {
                ...orderData,
                userId,
            },
        });
        const productItems = cartItems.filter(item => item.type === 'product');
        const serviceItems = cartItems.filter(item => item.type === 'service');
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
        if (serviceItems.length > 0) {
            const serviceAppointments = serviceItems.map(item => ({
                orderId: order.id,
                serviceId: item.id,
                vendorId: item.vendorId,
                staffId: item.staffId,
                appointmentDate: new Date(item.appointmentDate),
                durationMinutes: item.durationMinutes || 60,
                servicePrice: item.price,
                currency: orderData.currency,
                status: 'PENDING',
                notes: orderData.notes,
            }));
            await this.prisma.serviceAppointment.createMany({
                data: serviceAppointments,
            });
        }
        return this.getOrderById(order.id);
    }
    async getAllOrders(status) {
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
    async getOrderById(id) {
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
            throw new common_1.NotFoundException('Order not found');
        }
        return order;
    }
    async updateOrder(id, userId, userRole, updateOrderDto) {
        const order = await this.getOrderById(id);
        const canUpdate = order.userId === userId ||
            userRole === 'ADMIN' ||
            order.orderItems.some(item => item.product.retailerId === userId) ||
            order.serviceAppointments.some(appointment => appointment.vendorId === userId);
        if (!canUpdate) {
            throw new common_1.ForbiddenException('You cannot update this order');
        }
        return this.prisma.order.update({
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
    }
    async getUserOrders(userId) {
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
    async confirmOrder(id, userId, userRole) {
        const order = await this.getOrderById(id);
        const canConfirm = order.userId === userId ||
            userRole === 'admin' ||
            order.retailerId === userId ||
            order.vendorId === userId;
        if (!canConfirm) {
            throw new common_1.ForbiddenException('You do not have permission to confirm this order');
        }
        return this.prisma.order.update({
            where: { id },
            data: {
                status: client_1.order_status.confirmed,
                statusEnhanced: client_1.order_status_enhanced.paid,
                confirmedAt: new Date(),
            },
        });
    }
    async completeOrder(id, userId, userRole) {
        const order = await this.getOrderById(id);
        const canComplete = order.userId === userId ||
            userRole === 'admin' ||
            order.retailerId === userId ||
            order.vendorId === userId;
        if (!canComplete) {
            throw new common_1.ForbiddenException('You do not have permission to complete this order');
        }
        return this.prisma.order.update({
            where: { id },
            data: {
                status: client_1.order_status.delivered,
                statusEnhanced: client_1.order_status_enhanced.completed,
                completedAt: new Date(),
            },
        });
    }
    async cancelOrder(id, userId, userRole, reason) {
        const order = await this.getOrderById(id);
        const canCancel = order.userId === userId ||
            userRole === 'admin' ||
            order.retailerId === userId ||
            order.vendorId === userId;
        if (!canCancel) {
            throw new common_1.ForbiddenException('You do not have permission to cancel this order');
        }
        return this.prisma.order.update({
            where: { id },
            data: {
                status: client_1.order_status.cancelled,
                statusEnhanced: client_1.order_status_enhanced.cancelled,
                notes: reason ? `${order.notes || ''}\nCancellation reason: ${reason}`.trim() : order.notes,
            },
        });
    }
    async disputeOrder(id, userId, reason, evidence) {
        const order = await this.getOrderById(id);
        if (order.userId !== userId) {
            throw new common_1.ForbiddenException('Only the order owner can dispute this order');
        }
        return this.prisma.order.update({
            where: { id },
            data: {
                statusEnhanced: client_1.order_status_enhanced.disputed,
                disputedAt: new Date(),
                notes: `${order.notes || ''}\nDispute reason: ${reason}`.trim(),
            },
        });
    }
    async updateEscrowStatus(id, escrowAmount, escrowStatus) {
        return this.prisma.order.update({
            where: { id },
            data: {
                escrowAmount,
                escrowStatus,
            },
        });
    }
    async updateCommission(id, commissionAmount, commissionRate) {
        return this.prisma.order.update({
            where: { id },
            data: {
                commissionAmount,
                commissionRate,
            },
        });
    }
    async getOrdersByStatus(status) {
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
    async getOrdersByUser(userId, userRole) {
        let where = {};
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
                where = {};
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
    async getOrderItemsByRetailerId(retailerId) {
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
    async getServiceAppointmentsByVendorId(vendorId) {
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
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map