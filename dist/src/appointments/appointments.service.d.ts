import { PrismaService } from '../prisma/prisma.service';
import { booking_status } from '@prisma/client';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto';
export declare class AppointmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<{
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
        service: {
            id: string;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            category: string;
            durationMinutes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.booking_status;
        notes: string | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        currency: string;
        durationMinutes: number;
        vendorId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        clientId: string;
        serviceId: string;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
    }>;
    getAllAppointments(limit?: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.booking_status;
        notes: string | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        currency: string;
        durationMinutes: number;
        vendorId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        clientId: string;
        serviceId: string;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
    }[]>;
    getAppointmentById(id: string): Promise<{
        tickets: {
            id: string;
            createdAt: Date;
            status: string;
            title: string;
            priority: string;
        }[];
        serviceReviews: {
            id: string;
            createdAt: Date;
            rating: number;
            reviewText: string;
        }[];
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
        service: {
            id: string;
            name: string;
            description: string;
            price: import("@prisma/client/runtime/library").Decimal;
            category: string;
            durationMinutes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.booking_status;
        notes: string | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        currency: string;
        durationMinutes: number;
        vendorId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        clientId: string;
        serviceId: string;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
    }>;
    updateAppointment(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<{
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
        service: {
            id: string;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            category: string;
            durationMinutes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.booking_status;
        notes: string | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        currency: string;
        durationMinutes: number;
        vendorId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        clientId: string;
        serviceId: string;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
    }>;
    deleteAppointment(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.booking_status;
        notes: string | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        currency: string;
        durationMinutes: number;
        vendorId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        clientId: string;
        serviceId: string;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
    }>;
    updateAppointmentStatus(id: string, updateStatusDto: UpdateAppointmentStatusDto): Promise<{
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
        service: {
            id: string;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            category: string;
            durationMinutes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.booking_status;
        notes: string | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        currency: string;
        durationMinutes: number;
        vendorId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        clientId: string;
        serviceId: string;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
    }>;
    getAppointmentsByVendorId(vendorId: string): Promise<({
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
        service: {
            id: string;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            category: string;
            durationMinutes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.booking_status;
        notes: string | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        currency: string;
        durationMinutes: number;
        vendorId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        clientId: string;
        serviceId: string;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
    })[]>;
    getAppointmentsByClientId(clientId: string): Promise<({
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
        service: {
            id: string;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            category: string;
            durationMinutes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.booking_status;
        notes: string | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        currency: string;
        durationMinutes: number;
        vendorId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        clientId: string;
        serviceId: string;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
    })[]>;
    getAppointmentsByStaffId(staffId: string): Promise<({
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
        service: {
            id: string;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            category: string;
            durationMinutes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.booking_status;
        notes: string | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        currency: string;
        durationMinutes: number;
        vendorId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        clientId: string;
        serviceId: string;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
    })[]>;
    getAppointmentsByStatus(status: booking_status): Promise<({
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
        service: {
            id: string;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            category: string;
            durationMinutes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.booking_status;
        notes: string | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        currency: string;
        durationMinutes: number;
        vendorId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        clientId: string;
        serviceId: string;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
    })[]>;
    getAppointmentsByDateRange(startDate: string, endDate: string): Promise<({
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
        service: {
            id: string;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            category: string;
            durationMinutes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.booking_status;
        notes: string | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        currency: string;
        durationMinutes: number;
        vendorId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        clientId: string;
        serviceId: string;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
    })[]>;
    getUpcomingAppointments(userId: string, userRole: 'client' | 'vendor' | 'staff'): Promise<({
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
        service: {
            id: string;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            category: string;
            durationMinutes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.booking_status;
        notes: string | null;
        price: import("@prisma/client/runtime/library").Decimal | null;
        currency: string;
        durationMinutes: number;
        vendorId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        clientId: string;
        serviceId: string;
        statusEnhanced: import(".prisma/client").$Enums.appointment_status_enhanced | null;
        escrowAmount: import("@prisma/client/runtime/library").Decimal | null;
        escrowStatus: string | null;
        commissionAmount: import("@prisma/client/runtime/library").Decimal | null;
        commissionRate: import("@prisma/client/runtime/library").Decimal | null;
        completionConfirmedAt: Date | null;
        autoReleaseAt: Date | null;
        staffId: string | null;
        appointmentDate: Date;
        startTime: Date | null;
        endTime: Date | null;
    })[]>;
    getAppointmentStats(vendorId?: string): Promise<{
        total: number;
        pending: number;
        confirmed: number;
        completed: number;
        cancelled: number;
        rejected: number;
    }>;
}
