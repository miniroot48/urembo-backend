import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { booking_status, appointment_status_enhanced } from '@prisma/client';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    // Validate that the service exists and belongs to the vendor
    const service = await this.prisma.service.findFirst({
      where: {
        id: createAppointmentDto.serviceId,
        vendorId: createAppointmentDto.vendorId,
        isActive: true,
      },
    });

    if (!service) {
      throw new BadRequestException('Service not found or not available');
    }

    // Validate that the client and vendor exist
    const [client, vendor] = await Promise.all([
      this.prisma.profile.findUnique({ where: { id: createAppointmentDto.clientId } }),
      this.prisma.profile.findUnique({ where: { id: createAppointmentDto.vendorId } }),
    ]);

    if (!client) {
      throw new BadRequestException('Client not found');
    }

    if (!vendor) {
      throw new BadRequestException('Vendor not found');
    }

    // If staffId is provided, validate that the staff exists and belongs to the vendor
    if (createAppointmentDto.staffId) {
      const staff = await this.prisma.staff.findFirst({
        where: {
          id: createAppointmentDto.staffId,
          vendorId: createAppointmentDto.vendorId,
          isActive: true,
        },
      });

      if (!staff) {
        throw new BadRequestException('Staff member not found or not available');
      }
    }

    // Calculate start and end times if not provided
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
        status: createAppointmentDto.status || booking_status.pending,
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

  async getAllAppointments(limit?: number) {
    const queryOptions: any = {
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

  async getAppointmentById(id: string) {
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
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }

  async updateAppointment(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.getAppointmentById(id);

    // Convert date strings to Date objects if provided
    const updateData: any = { ...updateAppointmentDto };
    
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

  async deleteAppointment(id: string) {
    const appointment = await this.getAppointmentById(id);
    
    return this.prisma.appointment.delete({
      where: { id },
    });
  }

  async updateAppointmentStatus(id: string, updateStatusDto: UpdateAppointmentStatusDto) {
    const appointment = await this.getAppointmentById(id);

    const updateData: any = {
      status: updateStatusDto.status,
    };

    if (updateStatusDto.statusEnhanced) {
      updateData.statusEnhanced = updateStatusDto.statusEnhanced;
    }

    if (updateStatusDto.notes) {
      updateData.notes = updateStatusDto.notes;
    }

    // Set completion confirmed timestamp if status is completed
    if (updateStatusDto.status === booking_status.completed) {
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

  async getAppointmentsByVendorId(vendorId: string) {
    // Validate that the vendor exists
    const vendor = await this.prisma.profile.findUnique({
      where: { id: vendorId },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
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

  async getAppointmentsByClientId(clientId: string) {
    // Validate that the client exists
    const client = await this.prisma.profile.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
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

  async getAppointmentsByStaffId(staffId: string) {
    // Validate that the staff exists
    const staff = await this.prisma.staff.findUnique({
      where: { id: staffId },
    });

    if (!staff) {
      throw new NotFoundException('Staff member not found');
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

  async getAppointmentsByStatus(status: booking_status) {
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

  async getAppointmentsByDateRange(startDate: string, endDate: string) {
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

  async getUpcomingAppointments(userId: string, userRole: 'client' | 'vendor' | 'staff') {
    const now = new Date();
    let whereClause: any = {
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

  async getAppointmentStats(vendorId?: string) {
    const whereClause = vendorId ? { vendorId } : {};

    const [
      total,
      pending,
      confirmed,
      completed,
      cancelled,
      rejected,
    ] = await Promise.all([
      this.prisma.appointment.count({ where: whereClause }),
      this.prisma.appointment.count({ where: { ...whereClause, status: booking_status.pending } }),
      this.prisma.appointment.count({ where: { ...whereClause, status: booking_status.confirmed } }),
      this.prisma.appointment.count({ where: { ...whereClause, status: booking_status.completed } }),
      this.prisma.appointment.count({ where: { ...whereClause, status: booking_status.cancelled } }),
      this.prisma.appointment.count({ where: { ...whereClause, status: booking_status.rejected } }),
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
}
