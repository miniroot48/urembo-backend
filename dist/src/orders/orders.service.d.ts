import { PrismaService } from '../prisma/prisma.service';
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
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    createOrder(userId: string | null, createOrderDto: CreateOrderDto): Promise<{
        serviceAppointments: ({
            vendor: {
                id: string;
                email: string;
                fullName: string;
                businessName: string;
            };
            service: {
                id: string;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
                imageUrl: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            notes: string | null;
            currency: string;
            durationMinutes: number;
            vendorId: string;
            serviceId: string;
            orderId: string;
            staffId: string | null;
            appointmentDate: Date;
            servicePrice: import("@prisma/client/runtime/library").Decimal;
        })[];
        shipments: ({
            statusUpdates: {
                id: string;
                updatedAt: Date;
                status: import(".prisma/client").$Enums.shipment_status;
                notes: string | null;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                shipmentId: string;
                previousStatus: import(".prisma/client").$Enums.shipment_status | null;
                location: string | null;
                updatedBy: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            orderId: string;
            createdBy: string;
            shipmentNumber: string;
            deliveryPartner: string;
            trackingNumber: string | null;
            estimatedDeliveryDate: Date | null;
            actualDeliveryDate: Date | null;
            deliveryAddress: import("@prisma/client/runtime/library").JsonValue | null;
            deliveryNotes: string | null;
        })[];
        user: {
            id: string;
            email: string;
            fullName: string;
        };
        orderItems: ({
            product: {
                id: string;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
                imageUrl: string;
                retailerId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            currency: string | null;
            quantity: number;
            orderId: string;
            productId: string;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
            title: string | null;
            type: string | null;
            refId: string | null;
            subtotal: import("@prisma/client/runtime/library").Decimal | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.order_status;
        userId: string | null;
        notes: string | null;
        currency: string;
        manufacturerId: string | null;
        retailerId: string | null;
        vendorId: string | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        clientId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
    }>;
    getAllOrders(page?: number, limit?: number, status?: order_status): Promise<{
        orders: ({
            serviceAppointments: ({
                vendor: {
                    id: string;
                    email: string;
                    fullName: string;
                    businessName: string;
                };
                service: {
                    id: string;
                    name: string;
                    price: import("@prisma/client/runtime/library").Decimal;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: string;
                notes: string | null;
                currency: string;
                durationMinutes: number;
                vendorId: string;
                serviceId: string;
                orderId: string;
                staffId: string | null;
                appointmentDate: Date;
                servicePrice: import("@prisma/client/runtime/library").Decimal;
            })[];
            user: {
                id: string;
                email: string;
                fullName: string;
            };
            orderItems: ({
                product: {
                    id: string;
                    name: string;
                    price: import("@prisma/client/runtime/library").Decimal;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                currency: string | null;
                quantity: number;
                orderId: string;
                productId: string;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                totalPrice: import("@prisma/client/runtime/library").Decimal;
                title: string | null;
                type: string | null;
                refId: string | null;
                subtotal: import("@prisma/client/runtime/library").Decimal | null;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.order_status;
            userId: string | null;
            notes: string | null;
            currency: string;
            manufacturerId: string | null;
            retailerId: string | null;
            vendorId: string | null;
            customerEmail: string;
            customerPhone: string | null;
            shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            clientId: string | null;
            serviceId: string | null;
            serviceType: string | null;
            statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
            escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
            escrowStatus: string | null;
            commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
            commissionRate: import("@prisma/client/runtime/library").Decimal | null;
            confirmedAt: Date | null;
            completedAt: Date | null;
            completionConfirmedAt: Date | null;
            disputedAt: Date | null;
            autoReleaseAt: Date | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getOrderById(id: string): Promise<{
        serviceAppointments: ({
            vendor: {
                id: string;
                email: string;
                fullName: string;
                businessName: string;
            };
            service: {
                id: string;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
                imageUrl: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            notes: string | null;
            currency: string;
            durationMinutes: number;
            vendorId: string;
            serviceId: string;
            orderId: string;
            staffId: string | null;
            appointmentDate: Date;
            servicePrice: import("@prisma/client/runtime/library").Decimal;
        })[];
        shipments: ({
            statusUpdates: {
                id: string;
                updatedAt: Date;
                status: import(".prisma/client").$Enums.shipment_status;
                notes: string | null;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                shipmentId: string;
                previousStatus: import(".prisma/client").$Enums.shipment_status | null;
                location: string | null;
                updatedBy: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            orderId: string;
            createdBy: string;
            shipmentNumber: string;
            deliveryPartner: string;
            trackingNumber: string | null;
            estimatedDeliveryDate: Date | null;
            actualDeliveryDate: Date | null;
            deliveryAddress: import("@prisma/client/runtime/library").JsonValue | null;
            deliveryNotes: string | null;
        })[];
        user: {
            id: string;
            email: string;
            fullName: string;
        };
        orderItems: ({
            product: {
                id: string;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
                imageUrl: string;
                retailerId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            currency: string | null;
            quantity: number;
            orderId: string;
            productId: string;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
            title: string | null;
            type: string | null;
            refId: string | null;
            subtotal: import("@prisma/client/runtime/library").Decimal | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.order_status;
        userId: string | null;
        notes: string | null;
        currency: string;
        manufacturerId: string | null;
        retailerId: string | null;
        vendorId: string | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        clientId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
    }>;
    updateOrder(id: string, userId: string, userRole: string, updateOrderDto: UpdateOrderDto): Promise<{
        serviceAppointments: ({
            vendor: {
                id: string;
                email: string;
                fullName: string;
                businessName: string;
            };
            service: {
                id: string;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            notes: string | null;
            currency: string;
            durationMinutes: number;
            vendorId: string;
            serviceId: string;
            orderId: string;
            staffId: string | null;
            appointmentDate: Date;
            servicePrice: import("@prisma/client/runtime/library").Decimal;
        })[];
        user: {
            id: string;
            email: string;
            fullName: string;
        };
        orderItems: ({
            product: {
                id: string;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            currency: string | null;
            quantity: number;
            orderId: string;
            productId: string;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
            title: string | null;
            type: string | null;
            refId: string | null;
            subtotal: import("@prisma/client/runtime/library").Decimal | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.order_status;
        userId: string | null;
        notes: string | null;
        currency: string;
        manufacturerId: string | null;
        retailerId: string | null;
        vendorId: string | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        clientId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
    }>;
    getUserOrders(userId: string, page?: number, limit?: number): Promise<{
        orders: ({
            serviceAppointments: ({
                vendor: {
                    id: string;
                    email: string;
                    fullName: string;
                    businessName: string;
                };
                service: {
                    id: string;
                    name: string;
                    price: import("@prisma/client/runtime/library").Decimal;
                    imageUrl: string;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: string;
                notes: string | null;
                currency: string;
                durationMinutes: number;
                vendorId: string;
                serviceId: string;
                orderId: string;
                staffId: string | null;
                appointmentDate: Date;
                servicePrice: import("@prisma/client/runtime/library").Decimal;
            })[];
            orderItems: ({
                product: {
                    id: string;
                    name: string;
                    price: import("@prisma/client/runtime/library").Decimal;
                    imageUrl: string;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                currency: string | null;
                quantity: number;
                orderId: string;
                productId: string;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                totalPrice: import("@prisma/client/runtime/library").Decimal;
                title: string | null;
                type: string | null;
                refId: string | null;
                subtotal: import("@prisma/client/runtime/library").Decimal | null;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.order_status;
            userId: string | null;
            notes: string | null;
            currency: string;
            manufacturerId: string | null;
            retailerId: string | null;
            vendorId: string | null;
            customerEmail: string;
            customerPhone: string | null;
            shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            clientId: string | null;
            serviceId: string | null;
            serviceType: string | null;
            statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
            escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
            escrowStatus: string | null;
            commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
            commissionRate: import("@prisma/client/runtime/library").Decimal | null;
            confirmedAt: Date | null;
            completedAt: Date | null;
            completionConfirmedAt: Date | null;
            disputedAt: Date | null;
            autoReleaseAt: Date | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    confirmOrder(id: string, userId: string, userRole: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.order_status;
        userId: string | null;
        notes: string | null;
        currency: string;
        manufacturerId: string | null;
        retailerId: string | null;
        vendorId: string | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        clientId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
    }>;
    completeOrder(id: string, userId: string, userRole: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.order_status;
        userId: string | null;
        notes: string | null;
        currency: string;
        manufacturerId: string | null;
        retailerId: string | null;
        vendorId: string | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        clientId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
    }>;
    cancelOrder(id: string, userId: string, userRole: string, reason?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.order_status;
        userId: string | null;
        notes: string | null;
        currency: string;
        manufacturerId: string | null;
        retailerId: string | null;
        vendorId: string | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        clientId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
    }>;
    disputeOrder(id: string, userId: string, reason: string, evidence?: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.order_status;
        userId: string | null;
        notes: string | null;
        currency: string;
        manufacturerId: string | null;
        retailerId: string | null;
        vendorId: string | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        clientId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
    }>;
    updateEscrowStatus(id: string, escrowAmount: number, escrowStatus: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.order_status;
        userId: string | null;
        notes: string | null;
        currency: string;
        manufacturerId: string | null;
        retailerId: string | null;
        vendorId: string | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        clientId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
    }>;
    updateCommission(id: string, commissionAmount: number, commissionRate: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.order_status;
        userId: string | null;
        notes: string | null;
        currency: string;
        manufacturerId: string | null;
        retailerId: string | null;
        vendorId: string | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        clientId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
    }>;
    getOrdersByStatus(status: order_status, page?: number, limit?: number): Promise<{
        orders: ({
            user: {
                id: string;
                email: string;
                fullName: string;
            };
            orderItems: ({
                product: {
                    id: string;
                    name: string;
                    price: import("@prisma/client/runtime/library").Decimal;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                currency: string | null;
                quantity: number;
                orderId: string;
                productId: string;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                totalPrice: import("@prisma/client/runtime/library").Decimal;
                title: string | null;
                type: string | null;
                refId: string | null;
                subtotal: import("@prisma/client/runtime/library").Decimal | null;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.order_status;
            userId: string | null;
            notes: string | null;
            currency: string;
            manufacturerId: string | null;
            retailerId: string | null;
            vendorId: string | null;
            customerEmail: string;
            customerPhone: string | null;
            shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            clientId: string | null;
            serviceId: string | null;
            serviceType: string | null;
            statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
            escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
            escrowStatus: string | null;
            commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
            commissionRate: import("@prisma/client/runtime/library").Decimal | null;
            confirmedAt: Date | null;
            completedAt: Date | null;
            completionConfirmedAt: Date | null;
            disputedAt: Date | null;
            autoReleaseAt: Date | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getOrdersByUser(userId: string, userRole: string, page?: number, limit?: number): Promise<{
        orders: ({
            user: {
                id: string;
                email: string;
                fullName: string;
            };
            orderItems: ({
                product: {
                    id: string;
                    name: string;
                    price: import("@prisma/client/runtime/library").Decimal;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                currency: string | null;
                quantity: number;
                orderId: string;
                productId: string;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                totalPrice: import("@prisma/client/runtime/library").Decimal;
                title: string | null;
                type: string | null;
                refId: string | null;
                subtotal: import("@prisma/client/runtime/library").Decimal | null;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.order_status;
            userId: string | null;
            notes: string | null;
            currency: string;
            manufacturerId: string | null;
            retailerId: string | null;
            vendorId: string | null;
            customerEmail: string;
            customerPhone: string | null;
            shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            clientId: string | null;
            serviceId: string | null;
            serviceType: string | null;
            statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
            escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
            escrowStatus: string | null;
            commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
            commissionRate: import("@prisma/client/runtime/library").Decimal | null;
            confirmedAt: Date | null;
            completedAt: Date | null;
            completionConfirmedAt: Date | null;
            disputedAt: Date | null;
            autoReleaseAt: Date | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
}
