import { TicketsService } from './tickets.service';
export declare class TicketsController {
    private ticketsService;
    constructor(ticketsService: TicketsService);
    getAllTickets(): Promise<({
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
            password: string;
            fullName: string | null;
            phone: string | null;
            avatarUrl: string | null;
            role: import(".prisma/client").$Enums.user_role;
            businessName: string | null;
            businessDescription: string | null;
            businessAddress: string | null;
            businessPhone: string | null;
            isVerified: boolean;
            isSuspended: boolean;
            suspendedAt: Date | null;
            suspendedBy: string | null;
            suspensionReason: string | null;
            onboardingStatus: import(".prisma/client").$Enums.onboarding_status | null;
            paymentAccountDetails: import("@prisma/client/runtime/library").JsonValue | null;
            paymentAccountType: string | null;
            paymentDetailsVerified: boolean | null;
            createdAt: Date | null;
            updatedAt: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        status: string;
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        categoryId: string | null;
        clientId: string | null;
        orderId: string | null;
        title: string;
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
