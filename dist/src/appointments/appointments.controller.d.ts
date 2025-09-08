import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto';
import { booking_status } from '@prisma/client';
export declare class AppointmentsController {
    private appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    getAllAppointments(limit?: string): Promise<{
        id: string;
        serviceId: string;
        clientId: string;
        vendorId: string;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
        durationMinutes: number;
        status: import(".prisma/client").$Enums.booking_status;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getAppointmentById(id: string): Promise<{
        service: {
            id: string;
            durationMinutes: number;
            price: import("@prisma/client/runtime/library").Decimal;
            name: string;
            description: string;
            category: string;
        };
        client: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
            avatarUrl: string;
        };
        vendor: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
            avatarUrl: string;
            businessName: string;
        };
        tickets: {
            id: string;
            status: string;
            createdAt: Date;
            title: string;
            priority: string;
        }[];
        serviceReviews: {
            id: string;
            createdAt: Date;
            rating: number;
            reviewText: string;
        }[];
    } & {
        id: string;
        serviceId: string;
        clientId: string;
        vendorId: string;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
        durationMinutes: number;
        status: import(".prisma/client").$Enums.booking_status;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<{
        service: {
            id: string;
            durationMinutes: number;
            price: import("@prisma/client/runtime/library").Decimal;
            name: string;
            category: string;
        };
        client: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
        };
        vendor: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
            businessName: string;
        };
    } & {
        id: string;
        serviceId: string;
        clientId: string;
        vendorId: string;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
        durationMinutes: number;
        status: import(".prisma/client").$Enums.booking_status;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateAppointment(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<{
        service: {
            id: string;
            durationMinutes: number;
            price: import("@prisma/client/runtime/library").Decimal;
            name: string;
            category: string;
        };
        client: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
        };
        vendor: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
            businessName: string;
        };
    } & {
        id: string;
        serviceId: string;
        clientId: string;
        vendorId: string;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
        durationMinutes: number;
        status: import(".prisma/client").$Enums.booking_status;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteAppointment(id: string): Promise<{
        id: string;
        serviceId: string;
        clientId: string;
        vendorId: string;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
        durationMinutes: number;
        status: import(".prisma/client").$Enums.booking_status;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateAppointmentStatus(id: string, updateStatusDto: UpdateAppointmentStatusDto): Promise<{
        service: {
            id: string;
            durationMinutes: number;
            price: import("@prisma/client/runtime/library").Decimal;
            name: string;
            category: string;
        };
        client: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
        };
        vendor: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
            businessName: string;
        };
    } & {
        id: string;
        serviceId: string;
        clientId: string;
        vendorId: string;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
        durationMinutes: number;
        status: import(".prisma/client").$Enums.booking_status;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAppointmentsByVendorId(vendorId: string): Promise<({
        service: {
            id: string;
            durationMinutes: number;
            price: import("@prisma/client/runtime/library").Decimal;
            name: string;
            category: string;
        };
        client: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
        };
        vendor: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
            businessName: string;
        };
    } & {
        id: string;
        serviceId: string;
        clientId: string;
        vendorId: string;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
        durationMinutes: number;
        status: import(".prisma/client").$Enums.booking_status;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getAppointmentsByClientId(clientId: string): Promise<({
        service: {
            id: string;
            durationMinutes: number;
            price: import("@prisma/client/runtime/library").Decimal;
            name: string;
            category: string;
        };
        client: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
        };
        vendor: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
            businessName: string;
        };
    } & {
        id: string;
        serviceId: string;
        clientId: string;
        vendorId: string;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
        durationMinutes: number;
        status: import(".prisma/client").$Enums.booking_status;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getAppointmentsByStaffId(staffId: string): Promise<({
        service: {
            id: string;
            durationMinutes: number;
            price: import("@prisma/client/runtime/library").Decimal;
            name: string;
            category: string;
        };
        client: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
        };
        vendor: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
            businessName: string;
        };
    } & {
        id: string;
        serviceId: string;
        clientId: string;
        vendorId: string;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
        durationMinutes: number;
        status: import(".prisma/client").$Enums.booking_status;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getAppointmentsByStatus(status: booking_status): Promise<({
        service: {
            id: string;
            durationMinutes: number;
            price: import("@prisma/client/runtime/library").Decimal;
            name: string;
            category: string;
        };
        client: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
        };
        vendor: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
            businessName: string;
        };
    } & {
        id: string;
        serviceId: string;
        clientId: string;
        vendorId: string;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
        durationMinutes: number;
        status: import(".prisma/client").$Enums.booking_status;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getAppointmentsByDateRange(startDate: string, endDate: string): Promise<({
        service: {
            id: string;
            durationMinutes: number;
            price: import("@prisma/client/runtime/library").Decimal;
            name: string;
            category: string;
        };
        client: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
        };
        vendor: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
            businessName: string;
        };
    } & {
        id: string;
        serviceId: string;
        clientId: string;
        vendorId: string;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
        durationMinutes: number;
        status: import(".prisma/client").$Enums.booking_status;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getUpcomingAppointments(req: any, userRole: 'client' | 'vendor' | 'staff'): Promise<({
        service: {
            id: string;
            durationMinutes: number;
            price: import("@prisma/client/runtime/library").Decimal;
            name: string;
            category: string;
        };
        client: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
        };
        vendor: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
            businessName: string;
        };
    } & {
        id: string;
        serviceId: string;
        clientId: string;
        vendorId: string;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
        durationMinutes: number;
        status: import(".prisma/client").$Enums.booking_status;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getAppointmentStats(vendorId?: string): Promise<{
        total: number;
        pending: number;
        confirmed: number;
        completed: number;
        cancelled: number;
        rejected: number;
    }>;
    getMyAppointments(req: any): Promise<{
        id: string;
        serviceId: string;
        clientId: string;
        vendorId: string;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
        durationMinutes: number;
        status: import(".prisma/client").$Enums.booking_status;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getMyUpcomingAppointments(req: any): Promise<({
        service: {
            id: string;
            durationMinutes: number;
            price: import("@prisma/client/runtime/library").Decimal;
            name: string;
            category: string;
        };
        client: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
        };
        vendor: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
            businessName: string;
        };
    } & {
        id: string;
        serviceId: string;
        clientId: string;
        vendorId: string;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
        durationMinutes: number;
        status: import(".prisma/client").$Enums.booking_status;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getMyAppointmentStats(req: any): Promise<{
        total: number;
        pending: number;
        confirmed: number;
        completed: number;
        cancelled: number;
        rejected: number;
    }>;
}
