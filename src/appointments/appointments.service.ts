import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  // Basic appointment service implementation
  async getAllAppointments() {
    return this.prisma.appointment.findMany({
      include: {
        service: true,
        client: true,
        vendor: true,
      },
    });
  }
}
