import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  // Basic ticket service implementation
  async getAllTickets() {
    return this.prisma.ticket.findMany({
      include: {
        category: true,
        createdByProfile: true,
      },
    });
  }
}
