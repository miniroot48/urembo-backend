import { OrdersService, CreateOrderDto, UpdateOrderDto } from './orders.service';
import { order_status } from '@prisma/client';
import { CancelOrderDto } from './dto/cancel-order.dto';
import { DisputeOrderDto } from './dto/dispute-order.dto';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    getAllOrders(status?: string): Promise<({
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
        userId: string | null;
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
        userId: string | null;
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
    }>;
    createOrder(createOrderDto: CreateOrderDto): Promise<{
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
        userId: string | null;
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
    }>;
    createAuthenticatedOrder(req: any, createOrderDto: CreateOrderDto): Promise<{
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
        userId: string | null;
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
    }>;
    updateOrder(id: string, req: any, updateOrderDto: UpdateOrderDto): Promise<{
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
        userId: string | null;
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
    }>;
    getUserOrders(req: any): Promise<({
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
        userId: string | null;
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
    })[]>;
    confirmOrder(id: string, req: any): Promise<{
        id: string;
        userId: string | null;
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
    }>;
    completeOrder(id: string, req: any): Promise<{
        id: string;
        userId: string | null;
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
    }>;
    cancelOrder(id: string, req: any, body: CancelOrderDto): Promise<{
        id: string;
        userId: string | null;
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
    }>;
    disputeOrder(id: string, req: any, body: DisputeOrderDto): Promise<{
        id: string;
        userId: string | null;
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
        userId: string | null;
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
    })[]>;
    getOrdersByUser(userId: string, req: any): Promise<({
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
        userId: string | null;
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
