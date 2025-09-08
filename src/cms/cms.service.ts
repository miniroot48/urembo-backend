import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CmsService {
  constructor(private prisma: PrismaService) {}

  // Basic CMS service implementation
  async getSettings() {
    return this.prisma.cmsSettings.findMany({
      where: { isActive: true },
    });
  }
}
