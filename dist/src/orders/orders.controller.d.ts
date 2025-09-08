import { OrdersService, CreateOrderDto, UpdateOrderDto } from './orders.service';
import { order_status } from '@prisma/client';
import { CancelOrderDto } from './dto/cancel-order.dto';
import { DisputeOrderDto } from './dto/dispute-order.dto';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    getAllOrders(status?: string): Promise<({
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
    })[]>;
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
    createOrder(createOrderDto: CreateOrderDto): Promise<{
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
    createAuthenticatedOrder(req: any, createOrderDto: CreateOrderDto): Promise<{
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
    updateOrder(id: string, req: any, updateOrderDto: UpdateOrderDto): Promise<{
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
    getUserOrders(req: any): Promise<({
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
    })[]>;
    confirmOrder(id: string, req: any): Promise<{
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
    completeOrder(id: string, req: any): Promise<{
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
    cancelOrder(id: string, req: any, body: CancelOrderDto): Promise<{
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
    disputeOrder(id: string, req: any, body: DisputeOrderDto): Promise<{
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
    })[]>;
}
