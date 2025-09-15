import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { CreateTicketResponseDto } from './dto/create-ticket-response.dto';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    getAllTickets(page?: string, limit?: string, status?: string, priority?: string, categoryId?: string, assignedTo?: string, createdBy?: string): Promise<{
        tickets: ({
            _count: {
                responses: number;
                conversations: number;
            };
            order: {
                id: string;
                status: import(".prisma/client").$Enums.order_status;
                currency: string;
                totalAmount: import("@prisma/client/runtime/library").Decimal;
            };
            appointment: {
                id: string;
                status: import(".prisma/client").$Enums.booking_status;
                appointmentDate: Date;
            };
            category: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                isActive: boolean;
                color: string | null;
                icon: string | null;
            };
            createdByProfile: {
                id: string;
                email: string;
                fullName: string;
                role: import(".prisma/client").$Enums.user_role;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            title: string;
            status: string;
            categoryId: string | null;
            tags: string[];
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            clientId: string | null;
            orderId: string | null;
            ticketNumber: string;
            priority: string;
            createdBy: string;
            assignedTo: string | null;
            appointmentId: string | null;
            resolvedAt: Date | null;
            closedAt: Date | null;
            lastActivityAt: Date | null;
            escalatedAt: Date | null;
            dueDate: Date | null;
            satisfactionRating: number | null;
            feedback: string | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getTicketById(id: string): Promise<{
        order: {
            id: string;
            status: import(".prisma/client").$Enums.order_status;
            currency: string;
            customerEmail: string;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
        };
        appointment: {
            id: string;
            service: {
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
            };
            status: import(".prisma/client").$Enums.booking_status;
            appointmentDate: Date;
        };
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            isActive: boolean;
            color: string | null;
            icon: string | null;
        };
        createdByProfile: {
            id: string;
            email: string;
            fullName: string;
            role: import(".prisma/client").$Enums.user_role;
        };
        responses: ({
            user: {
                id: string;
                email: string;
                fullName: string;
                role: import(".prisma/client").$Enums.user_role;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            message: string;
            isInternal: boolean;
            attachments: import("@prisma/client/runtime/library").JsonValue | null;
            ticketId: string;
        })[];
        auditLogs: ({
            performedByProfile: {
                id: string;
                email: string;
                fullName: string;
            };
        } & {
            id: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            actionType: string;
            previousValue: string | null;
            newValue: string | null;
            performedAt: Date;
            ticketId: string;
            performedBy: string;
        })[];
        conversations: ({
            createdByProfile: {
                id: string;
                email: string;
                fullName: string;
                role: import(".prisma/client").$Enums.user_role;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            message: string;
            createdBy: string;
            isInternal: boolean;
            attachments: import("@prisma/client/runtime/library").JsonValue | null;
            ticketId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        status: string;
        categoryId: string | null;
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        clientId: string | null;
        orderId: string | null;
        ticketNumber: string;
        priority: string;
        createdBy: string;
        assignedTo: string | null;
        appointmentId: string | null;
        resolvedAt: Date | null;
        closedAt: Date | null;
        lastActivityAt: Date | null;
        escalatedAt: Date | null;
        dueDate: Date | null;
        satisfactionRating: number | null;
        feedback: string | null;
    }>;
    createTicket(createTicketDto: CreateTicketDto, req: any): Promise<{
        order: {
            id: string;
            status: import(".prisma/client").$Enums.order_status;
            currency: string;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
        };
        appointment: {
            id: string;
            status: import(".prisma/client").$Enums.booking_status;
            appointmentDate: Date;
        };
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            isActive: boolean;
            color: string | null;
            icon: string | null;
        };
        createdByProfile: {
            id: string;
            email: string;
            fullName: string;
            role: import(".prisma/client").$Enums.user_role;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        status: string;
        categoryId: string | null;
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        clientId: string | null;
        orderId: string | null;
        ticketNumber: string;
        priority: string;
        createdBy: string;
        assignedTo: string | null;
        appointmentId: string | null;
        resolvedAt: Date | null;
        closedAt: Date | null;
        lastActivityAt: Date | null;
        escalatedAt: Date | null;
        dueDate: Date | null;
        satisfactionRating: number | null;
        feedback: string | null;
    }>;
    updateTicket(id: string, updateTicketDto: UpdateTicketDto, req: any): Promise<{
        order: {
            id: string;
            status: import(".prisma/client").$Enums.order_status;
            currency: string;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
        };
        appointment: {
            id: string;
            status: import(".prisma/client").$Enums.booking_status;
            appointmentDate: Date;
        };
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            isActive: boolean;
            color: string | null;
            icon: string | null;
        };
        createdByProfile: {
            id: string;
            email: string;
            fullName: string;
            role: import(".prisma/client").$Enums.user_role;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        status: string;
        categoryId: string | null;
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        clientId: string | null;
        orderId: string | null;
        ticketNumber: string;
        priority: string;
        createdBy: string;
        assignedTo: string | null;
        appointmentId: string | null;
        resolvedAt: Date | null;
        closedAt: Date | null;
        lastActivityAt: Date | null;
        escalatedAt: Date | null;
        dueDate: Date | null;
        satisfactionRating: number | null;
        feedback: string | null;
    }>;
    deleteTicket(id: string, req: any): Promise<{
        message: string;
    }>;
    addResponse(id: string, createResponseDto: CreateTicketResponseDto, req: any): Promise<{
        user: {
            id: string;
            email: string;
            fullName: string;
            role: import(".prisma/client").$Enums.user_role;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        message: string;
        isInternal: boolean;
        attachments: import("@prisma/client/runtime/library").JsonValue | null;
        ticketId: string;
    }>;
    getUserTickets(req: any, page?: string, limit?: string): Promise<{
        tickets: ({
            _count: {
                responses: number;
                conversations: number;
            };
            category: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                isActive: boolean;
                color: string | null;
                icon: string | null;
            };
            createdByProfile: {
                id: string;
                email: string;
                fullName: string;
                role: import(".prisma/client").$Enums.user_role;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            title: string;
            status: string;
            categoryId: string | null;
            tags: string[];
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            clientId: string | null;
            orderId: string | null;
            ticketNumber: string;
            priority: string;
            createdBy: string;
            assignedTo: string | null;
            appointmentId: string | null;
            resolvedAt: Date | null;
            closedAt: Date | null;
            lastActivityAt: Date | null;
            escalatedAt: Date | null;
            dueDate: Date | null;
            satisfactionRating: number | null;
            feedback: string | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getTicketStats(req: any): Promise<{
        totalTickets: number;
        openTickets: number;
        inProgressTickets: number;
        resolvedTickets: number;
        closedTickets: number;
        highPriorityTickets: number;
        overdueTickets: number;
    }>;
    getTicketCategories(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        color: string | null;
        icon: string | null;
    }[]>;
    createTicketCategory(data: {
        name: string;
        description?: string;
        color?: string;
        icon?: string;
    }, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        color: string | null;
        icon: string | null;
    }>;
    updateTicketCategory(id: string, data: {
        name?: string;
        description?: string;
        color?: string;
        icon?: string;
        isActive?: boolean;
    }, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        color: string | null;
        icon: string | null;
    }>;
    deleteTicketCategory(id: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        color: string | null;
        icon: string | null;
    }>;
    searchTickets(req: any, query: string): Promise<({
        _count: {
            responses: number;
            conversations: number;
        };
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            isActive: boolean;
            color: string | null;
            icon: string | null;
        };
        createdByProfile: {
            id: string;
            email: string;
            fullName: string;
            role: import(".prisma/client").$Enums.user_role;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        status: string;
        categoryId: string | null;
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        clientId: string | null;
        orderId: string | null;
        ticketNumber: string;
        priority: string;
        createdBy: string;
        assignedTo: string | null;
        appointmentId: string | null;
        resolvedAt: Date | null;
        closedAt: Date | null;
        lastActivityAt: Date | null;
        escalatedAt: Date | null;
        dueDate: Date | null;
        satisfactionRating: number | null;
        feedback: string | null;
    })[]>;
}
