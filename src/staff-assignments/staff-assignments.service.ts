import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStaffAssignmentDto } from './dto/create-staff-assignment.dto';
import { UpdateStaffAssignmentDto } from './dto/update-staff-assignment.dto';

@Injectable()
export class StaffAssignmentsService {
  constructor(private prisma: PrismaService) {}

  async createStaffAssignment(createStaffAssignmentDto: CreateStaffAssignmentDto, assignedBy: string) {
    // Check if user exists
    const user = await this.prisma.profile.findUnique({
      where: { id: createStaffAssignmentDto.userId }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if user already has a staff assignment
    const existingAssignment = await this.prisma.staffAssignment.findFirst({
      where: { userId: createStaffAssignmentDto.userId }
    });

    if (existingAssignment) {
      throw new BadRequestException('User already has a staff assignment');
    }

    const staffAssignment = await this.prisma.staffAssignment.create({
      data: {
        userId: createStaffAssignmentDto.userId,
        role: createStaffAssignmentDto.role,
        permissions: createStaffAssignmentDto.permissions,
        isActive: createStaffAssignmentDto.isActive ?? true,
        assignedBy,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          }
        }
      }
    });

    return staffAssignment;
  }

  async getAllStaffAssignments() {
    return this.prisma.staffAssignment.findMany({
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getStaffAssignmentById(id: string) {
    const staffAssignment = await this.prisma.staffAssignment.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          }
        }
      }
    });

    if (!staffAssignment) {
      throw new NotFoundException('Staff assignment not found');
    }

    return staffAssignment;
  }

  async updateStaffAssignment(id: string, updateStaffAssignmentDto: UpdateStaffAssignmentDto) {
    const staffAssignment = await this.prisma.staffAssignment.findUnique({
      where: { id }
    });

    if (!staffAssignment) {
      throw new NotFoundException('Staff assignment not found');
    }

    return this.prisma.staffAssignment.update({
      where: { id },
      data: updateStaffAssignmentDto,
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          }
        }
      }
    });
  }

  async deleteStaffAssignment(id: string) {
    const staffAssignment = await this.prisma.staffAssignment.findUnique({
      where: { id }
    });

    if (!staffAssignment) {
      throw new NotFoundException('Staff assignment not found');
    }

    await this.prisma.staffAssignment.delete({
      where: { id }
    });

    return { message: 'Staff assignment deleted successfully' };
  }

  async getActiveStaffAssignments() {
    return this.prisma.staffAssignment.findMany({
      where: { isActive: true },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
