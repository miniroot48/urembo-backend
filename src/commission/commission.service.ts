import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommissionService {
  constructor(private prisma: PrismaService) {}

  // Basic commission service implementation
  async getCommissionSettings() {
    return this.prisma.commissionSettings.findMany();
  }
}
