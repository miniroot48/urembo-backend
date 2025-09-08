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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AppointmentsService = class AppointmentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAppointment(createAppointmentDto) {
        const service = await this.prisma.service.findFirst({
            where: {
                id: createAppointmentDto.serviceId,
                vendorId: createAppointmentDto.vendorId,
                isActive: true,
            },
        });
        if (!service) {
            throw new common_1.BadRequestException('Service not found or not available');
        }
        const [client, vendor] = await Promise.all([
            this.prisma.profile.findUnique({ where: { id: createAppointmentDto.clientId } }),
            this.prisma.profile.findUnique({ where: { id: createAppointmentDto.vendorId } }),
        ]);
        if (!client) {
            throw new common_1.BadRequestException('Client not found');
        }
        if (!vendor) {
            throw new common_1.BadRequestException('Vendor not found');
        }
        if (createAppointmentDto.staffId) {
            const staff = await this.prisma.staff.findFirst({
                where: {
                    id: createAppointmentDto.staffId,
                    vendorId: createAppointmentDto.vendorId,
                    isActive: true,
                },
            });
            if (!staff) {
                throw new common_1.BadRequestException('Staff member not found or not available');
            }
        }
        const appointmentDate = new Date(createAppointmentDto.appointmentDate);
        const startTime = createAppointmentDto.startTime ? new Date(createAppointmentDto.startTime) : appointmentDate;
        const endTime = createAppointmentDto.endTime
            ? new Date(createAppointmentDto.endTime)
            : new Date(startTime.getTime() + createAppointmentDto.durationMinutes * 60000);
        return this.prisma.appointment.create({
            data: {
                ...createAppointmentDto,
                appointmentDate,
                startTime,
                endTime,
                status: createAppointmentDto.status || client_1.booking_status.pending,
                currency: createAppointmentDto.currency || 'USD',
                completionConfirmedAt: createAppointmentDto.completionConfirmedAt ? new Date(createAppointmentDto.completionConfirmedAt) : null,
                autoReleaseAt: createAppointmentDto.autoReleaseAt ? new Date(createAppointmentDto.autoReleaseAt) : null,
            },
            include: {
                service: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        durationMinutes: true,
                        category: true,
                    },
                },
                client: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        phone: true,
                    },
                },
                vendor: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                        phone: true,
                    },
                },
            },
        });
    }
    async getAllAppointments(limit) {
        const queryOptions = {
            include: {
                service: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        durationMinutes: true,
                        category: true,
                    },
                },
                client: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        phone: true,
                    },
                },
                vendor: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                        phone: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        };
        if (limit && limit > 0) {
            queryOptions.take = limit;
        }
        return this.prisma.appointment.findMany(queryOptions);
    }
    async getAppointmentById(id) {
        const appointment = await this.prisma.appointment.findUnique({
            where: { id },
            include: {
                service: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        durationMinutes: true,
                        category: true,
                        description: true,
                    },
                },
                client: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        phone: true,
                        avatarUrl: true,
                    },
                },
                vendor: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                        phone: true,
                        avatarUrl: true,
                    },
                },
                tickets: {
                    select: {
                        id: true,
                        title: true,
                        status: true,
                        priority: true,
                        createdAt: true,
                    },
                },
                serviceReviews: {
                    select: {
                        id: true,
                        rating: true,
                        reviewText: true,
                        createdAt: true,
                    },
                },
            },
        });
        if (!appointment) {
            throw new common_1.NotFoundException('Appointment not found');
        }
        return appointment;
    }
    async updateAppointment(id, updateAppointmentDto) {
        const appointment = await this.getAppointmentById(id);
        const updateData = { ...updateAppointmentDto };
        if (updateAppointmentDto.appointmentDate) {
            updateData.appointmentDate = new Date(updateAppointmentDto.appointmentDate);
        }
        if (updateAppointmentDto.startTime) {
            updateData.startTime = new Date(updateAppointmentDto.startTime);
        }
        if (updateAppointmentDto.endTime) {
            updateData.endTime = new Date(updateAppointmentDto.endTime);
        }
        if (updateAppointmentDto.completionConfirmedAt) {
            updateData.completionConfirmedAt = new Date(updateAppointmentDto.completionConfirmedAt);
        }
        if (updateAppointmentDto.autoReleaseAt) {
            updateData.autoReleaseAt = new Date(updateAppointmentDto.autoReleaseAt);
        }
        return this.prisma.appointment.update({
            where: { id },
            data: updateData,
            include: {
                service: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        durationMinutes: true,
                        category: true,
                    },
                },
                client: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        phone: true,
                    },
                },
                vendor: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                        phone: true,
                    },
                },
            },
        });
    }
    async deleteAppointment(id) {
        const appointment = await this.getAppointmentById(id);
        return this.prisma.appointment.delete({
            where: { id },
        });
    }
    async updateAppointmentStatus(id, updateStatusDto) {
        const appointment = await this.getAppointmentById(id);
        const updateData = {
            status: updateStatusDto.status,
        };
        if (updateStatusDto.statusEnhanced) {
            updateData.statusEnhanced = updateStatusDto.statusEnhanced;
        }
        if (updateStatusDto.notes) {
            updateData.notes = updateStatusDto.notes;
        }
        if (updateStatusDto.status === client_1.booking_status.completed) {
            updateData.completionConfirmedAt = new Date();
        }
        return this.prisma.appointment.update({
            where: { id },
            data: updateData,
            include: {
                service: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        durationMinutes: true,
                        category: true,
                    },
                },
                client: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        phone: true,
                    },
                },
                vendor: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                        phone: true,
                    },
                },
            },
        });
    }
    async getAppointmentsByVendorId(vendorId) {
        const vendor = await this.prisma.profile.findUnique({
            where: { id: vendorId },
        });
        if (!vendor) {
            throw new common_1.NotFoundException('Vendor not found');
        }
        return this.prisma.appointment.findMany({
            where: { vendorId },
            include: {
                service: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        durationMinutes: true,
                        category: true,
                    },
                },
                client: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        phone: true,
                    },
                },
                vendor: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                        phone: true,
                    },
                },
            },
            orderBy: { appointmentDate: 'desc' },
        });
    }
    async getAppointmentsByClientId(clientId) {
        const client = await this.prisma.profile.findUnique({
            where: { id: clientId },
        });
        if (!client) {
            throw new common_1.NotFoundException('Client not found');
        }
        return this.prisma.appointment.findMany({
            where: { clientId },
            include: {
                service: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        durationMinutes: true,
                        category: true,
                    },
                },
                client: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        phone: true,
                    },
                },
                vendor: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                        phone: true,
                    },
                },
            },
            orderBy: { appointmentDate: 'desc' },
        });
    }
    async getAppointmentsByStaffId(staffId) {
        const staff = await this.prisma.staff.findUnique({
            where: { id: staffId },
        });
        if (!staff) {
            throw new common_1.NotFoundException('Staff member not found');
        }
        return this.prisma.appointment.findMany({
            where: { staffId },
            include: {
                service: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        durationMinutes: true,
                        category: true,
                    },
                },
                client: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        phone: true,
                    },
                },
                vendor: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                        phone: true,
                    },
                },
            },
            orderBy: { appointmentDate: 'desc' },
        });
    }
    async getAppointmentsByStatus(status) {
        return this.prisma.appointment.findMany({
            where: { status },
            include: {
                service: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        durationMinutes: true,
                        category: true,
                    },
                },
                client: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        phone: true,
                    },
                },
                vendor: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                        phone: true,
                    },
                },
            },
            orderBy: { appointmentDate: 'desc' },
        });
    }
    async getAppointmentsByDateRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return this.prisma.appointment.findMany({
            where: {
                appointmentDate: {
                    gte: start,
                    lte: end,
                },
            },
            include: {
                service: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        durationMinutes: true,
                        category: true,
                    },
                },
                client: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        phone: true,
                    },
                },
                vendor: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                        phone: true,
                    },
                },
            },
            orderBy: { appointmentDate: 'asc' },
        });
    }
    async getUpcomingAppointments(userId, userRole) {
        const now = new Date();
        let whereClause = {
            appointmentDate: {
                gte: now,
            },
        };
        switch (userRole) {
            case 'client':
                whereClause.clientId = userId;
                break;
            case 'vendor':
                whereClause.vendorId = userId;
                break;
            case 'staff':
                whereClause.staffId = userId;
                break;
        }
        return this.prisma.appointment.findMany({
            where: whereClause,
            include: {
                service: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        durationMinutes: true,
                        category: true,
                    },
                },
                client: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        phone: true,
                    },
                },
                vendor: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                        phone: true,
                    },
                },
            },
            orderBy: { appointmentDate: 'asc' },
        });
    }
    async getAppointmentStats(vendorId) {
        const whereClause = vendorId ? { vendorId } : {};
        const [total, pending, confirmed, completed, cancelled, rejected,] = await Promise.all([
            this.prisma.appointment.count({ where: whereClause }),
            this.prisma.appointment.count({ where: { ...whereClause, status: client_1.booking_status.pending } }),
            this.prisma.appointment.count({ where: { ...whereClause, status: client_1.booking_status.confirmed } }),
            this.prisma.appointment.count({ where: { ...whereClause, status: client_1.booking_status.completed } }),
            this.prisma.appointment.count({ where: { ...whereClause, status: client_1.booking_status.cancelled } }),
            this.prisma.appointment.count({ where: { ...whereClause, status: client_1.booking_status.rejected } }),
        ]);
        return {
            total,
            pending,
            confirmed,
            completed,
            cancelled,
            rejected,
        };
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map