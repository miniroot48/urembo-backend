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
        user: {
            id: string;
            email: string;
            fullName: string;
        };
        orderItems: ({
            product: {
                id: string;
                retailerId: string;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
                imageUrl: string;
            };
        } & {
            id: string;
            currency: string | null;
            createdAt: Date;
            updatedAt: Date;
            orderId: string;
            productId: string;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
            title: string | null;
            type: string | null;
            refId: string | null;
            subtotal: import("@prisma/client/runtime/library").Decimal | null;
        })[];
        serviceAppointments: ({
            service: {
                id: string;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
                imageUrl: string;
            };
            vendor: {
                id: string;
                email: string;
                fullName: string;
                businessName: string;
            };
        } & {
            id: string;
            vendorId: string;
            serviceId: string;
            currency: string;
            status: string;
            notes: string | null;
            createdAt: Date;
            updatedAt: Date;
            durationMinutes: number;
            orderId: string;
            staffId: string | null;
            appointmentDate: Date;
            servicePrice: import("@prisma/client/runtime/library").Decimal;
        })[];
        shipments: ({
            statusUpdates: {
                id: string;
                status: import(".prisma/client").$Enums.shipment_status;
                notes: string | null;
                updatedAt: Date;
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
            shipmentNumber: string;
            deliveryPartner: string;
            trackingNumber: string | null;
            estimatedDeliveryDate: Date | null;
            actualDeliveryDate: Date | null;
            deliveryAddress: import("@prisma/client/runtime/library").JsonValue | null;
            deliveryNotes: string | null;
            createdBy: string;
        })[];
    } & {
        id: string;
        clientId: string | null;
        vendorId: string | null;
        retailerId: string | null;
        manufacturerId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        status: import(".prisma/client").$Enums.order_status;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        notes: string | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
    }>;
    getAllOrders(status?: order_status): Promise<({
        user: {
            id: string;
            email: string;
            fullName: string;
        };
        orderItems: ({
            product: {
                id: string;
                retailerId: string;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
            };
        } & {
            id: string;
            currency: string | null;
            createdAt: Date;
            updatedAt: Date;
            orderId: string;
            productId: string;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
            title: string | null;
            type: string | null;
            refId: string | null;
            subtotal: import("@prisma/client/runtime/library").Decimal | null;
        })[];
        serviceAppointments: ({
            service: {
                id: string;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
            };
            vendor: {
                id: string;
                email: string;
                fullName: string;
                businessName: string;
            };
        } & {
            id: string;
            vendorId: string;
            serviceId: string;
            currency: string;
            status: string;
            notes: string | null;
            createdAt: Date;
            updatedAt: Date;
            durationMinutes: number;
            orderId: string;
            staffId: string | null;
            appointmentDate: Date;
            servicePrice: import("@prisma/client/runtime/library").Decimal;
        })[];
    } & {
        id: string;
        clientId: string | null;
        vendorId: string | null;
        retailerId: string | null;
        manufacturerId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        status: import(".prisma/client").$Enums.order_status;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        notes: string | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
    })[]>;
    getOrderById(id: string): Promise<{
        user: {
            id: string;
            email: string;
            fullName: string;
        };
        orderItems: ({
            product: {
                id: string;
                retailerId: string;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
                imageUrl: string;
            };
        } & {
            id: string;
            currency: string | null;
            createdAt: Date;
            updatedAt: Date;
            orderId: string;
            productId: string;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
            title: string | null;
            type: string | null;
            refId: string | null;
            subtotal: import("@prisma/client/runtime/library").Decimal | null;
        })[];
        serviceAppointments: ({
            service: {
                id: string;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
                imageUrl: string;
            };
            vendor: {
                id: string;
                email: string;
                fullName: string;
                businessName: string;
            };
        } & {
            id: string;
            vendorId: string;
            serviceId: string;
            currency: string;
            status: string;
            notes: string | null;
            createdAt: Date;
            updatedAt: Date;
            durationMinutes: number;
            orderId: string;
            staffId: string | null;
            appointmentDate: Date;
            servicePrice: import("@prisma/client/runtime/library").Decimal;
        })[];
        shipments: ({
            statusUpdates: {
                id: string;
                status: import(".prisma/client").$Enums.shipment_status;
                notes: string | null;
                updatedAt: Date;
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
            shipmentNumber: string;
            deliveryPartner: string;
            trackingNumber: string | null;
            estimatedDeliveryDate: Date | null;
            actualDeliveryDate: Date | null;
            deliveryAddress: import("@prisma/client/runtime/library").JsonValue | null;
            deliveryNotes: string | null;
            createdBy: string;
        })[];
    } & {
        id: string;
        clientId: string | null;
        vendorId: string | null;
        retailerId: string | null;
        manufacturerId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        status: import(".prisma/client").$Enums.order_status;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        notes: string | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
    }>;
    updateOrder(id: string, userId: string, userRole: string, updateOrderDto: UpdateOrderDto): Promise<{
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
            currency: string | null;
            createdAt: Date;
            updatedAt: Date;
            orderId: string;
            productId: string;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
            title: string | null;
            type: string | null;
            refId: string | null;
            subtotal: import("@prisma/client/runtime/library").Decimal | null;
        })[];
        serviceAppointments: ({
            service: {
                id: string;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
            };
            vendor: {
                id: string;
                email: string;
                fullName: string;
                businessName: string;
            };
        } & {
            id: string;
            vendorId: string;
            serviceId: string;
            currency: string;
            status: string;
            notes: string | null;
            createdAt: Date;
            updatedAt: Date;
            durationMinutes: number;
            orderId: string;
            staffId: string | null;
            appointmentDate: Date;
            servicePrice: import("@prisma/client/runtime/library").Decimal;
        })[];
    } & {
        id: string;
        clientId: string | null;
        vendorId: string | null;
        retailerId: string | null;
        manufacturerId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        status: import(".prisma/client").$Enums.order_status;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        notes: string | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
    }>;
    getUserOrders(userId: string): Promise<({
        orderItems: ({
            product: {
                id: string;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
                imageUrl: string;
            };
        } & {
            id: string;
            currency: string | null;
            createdAt: Date;
            updatedAt: Date;
            orderId: string;
            productId: string;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
            title: string | null;
            type: string | null;
            refId: string | null;
            subtotal: import("@prisma/client/runtime/library").Decimal | null;
        })[];
        serviceAppointments: ({
            service: {
                id: string;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
                imageUrl: string;
            };
            vendor: {
                id: string;
                email: string;
                fullName: string;
                businessName: string;
            };
        } & {
            id: string;
            vendorId: string;
            serviceId: string;
            currency: string;
            status: string;
            notes: string | null;
            createdAt: Date;
            updatedAt: Date;
            durationMinutes: number;
            orderId: string;
            staffId: string | null;
            appointmentDate: Date;
            servicePrice: import("@prisma/client/runtime/library").Decimal;
        })[];
    } & {
        id: string;
        clientId: string | null;
        vendorId: string | null;
        retailerId: string | null;
        manufacturerId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        status: import(".prisma/client").$Enums.order_status;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        notes: string | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
    })[]>;
    confirmOrder(id: string, userId: string, userRole: string): Promise<{
        id: string;
        clientId: string | null;
        vendorId: string | null;
        retailerId: string | null;
        manufacturerId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        status: import(".prisma/client").$Enums.order_status;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        notes: string | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
    }>;
    completeOrder(id: string, userId: string, userRole: string): Promise<{
        id: string;
        clientId: string | null;
        vendorId: string | null;
        retailerId: string | null;
        manufacturerId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        status: import(".prisma/client").$Enums.order_status;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        notes: string | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
    }>;
    cancelOrder(id: string, userId: string, userRole: string, reason?: string): Promise<{
        id: string;
        clientId: string | null;
        vendorId: string | null;
        retailerId: string | null;
        manufacturerId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        status: import(".prisma/client").$Enums.order_status;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        notes: string | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
    }>;
    disputeOrder(id: string, userId: string, reason: string, evidence?: any): Promise<{
        id: string;
        clientId: string | null;
        vendorId: string | null;
        retailerId: string | null;
        manufacturerId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        status: import(".prisma/client").$Enums.order_status;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        notes: string | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
    }>;
    updateEscrowStatus(id: string, escrowAmount: number, escrowStatus: string): Promise<{
        id: string;
        clientId: string | null;
        vendorId: string | null;
        retailerId: string | null;
        manufacturerId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        status: import(".prisma/client").$Enums.order_status;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        notes: string | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
    }>;
    updateCommission(id: string, commissionAmount: number, commissionRate: number): Promise<{
        id: string;
        clientId: string | null;
        vendorId: string | null;
        retailerId: string | null;
        manufacturerId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        status: import(".prisma/client").$Enums.order_status;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        notes: string | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
    }>;
    getOrdersByStatus(status: order_status): Promise<({
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
            currency: string | null;
            createdAt: Date;
            updatedAt: Date;
            orderId: string;
            productId: string;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
            title: string | null;
            type: string | null;
            refId: string | null;
            subtotal: import("@prisma/client/runtime/library").Decimal | null;
        })[];
    } & {
        id: string;
        clientId: string | null;
        vendorId: string | null;
        retailerId: string | null;
        manufacturerId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        status: import(".prisma/client").$Enums.order_status;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        notes: string | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
    })[]>;
    getOrdersByUser(userId: string, userRole: string): Promise<({
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
            currency: string | null;
            createdAt: Date;
            updatedAt: Date;
            orderId: string;
            productId: string;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
            title: string | null;
            type: string | null;
            refId: string | null;
            subtotal: import("@prisma/client/runtime/library").Decimal | null;
        })[];
    } & {
        id: string;
        clientId: string | null;
        vendorId: string | null;
        retailerId: string | null;
        manufacturerId: string | null;
        serviceId: string | null;
        serviceType: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        status: import(".prisma/client").$Enums.order_status;
        statusEnhanced: import(".prisma/client").$Enums.order_status_enhanced | null;
        customerEmail: string;
        customerPhone: string | null;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        notes: string | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        confirmedAt: Date | null;
        completedAt: Date | null;
        completionConfirmedAt: Date | null;
        disputedAt: Date | null;
        autoReleaseAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
    })[]>;
    getOrderItemsByRetailerId(retailerId: string): Promise<({
        order: {
            clientId: string;
            createdAt: Date;
        };
        product: {
            id: string;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
        };
    } & {
        id: string;
        currency: string | null;
        createdAt: Date;
        updatedAt: Date;
        orderId: string;
        productId: string;
        quantity: number;
        unitPrice: import("@prisma/client/runtime/library").Decimal;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        title: string | null;
        type: string | null;
        refId: string | null;
        subtotal: import("@prisma/client/runtime/library").Decimal | null;
    })[]>;
    getServiceAppointmentsByVendorId(vendorId: string): Promise<({
        order: {
            clientId: string;
            createdAt: Date;
        };
        service: {
            id: string;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
        };
    } & {
        id: string;
        vendorId: string;
        serviceId: string;
        currency: string;
        status: string;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        durationMinutes: number;
        orderId: string;
        staffId: string | null;
        appointmentDate: Date;
        servicePrice: import("@prisma/client/runtime/library").Decimal;
    })[]>;
}
