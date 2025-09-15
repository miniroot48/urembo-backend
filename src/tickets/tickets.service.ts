import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { CreateTicketResponseDto } from './dto/create-ticket-response.dto';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  // Generate unique ticket number
  private generateTicketNumber(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `TK-${timestamp}-${random}`.toUpperCase();
  }

  // Create audit log entry
  private async createAuditLog(
    ticketId: string,
    actionType: string,
    performedBy: string,
    previousValue?: string,
    newValue?: string,
    metadata?: any
  ) {
    await this.prisma.ticketAuditLog.create({
      data: {
        ticketId,
        actionType,
        previousValue,
        newValue,
        performedBy,
        metadata,
      },
    });
  }

  // Get all tickets with filtering and pagination
  async getAllTickets(
    page: number = 1,
    limit: number = 10,
    status?: string,
    priority?: string,
    categoryId?: string,
    assignedTo?: string,
    createdBy?: string
  ) {
    const skip = (page - 1) * limit;
    
    const where: any = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (categoryId) where.categoryId = categoryId;
    if (assignedTo) where.assignedTo = assignedTo;
    if (createdBy) where.createdBy = createdBy;

    const [tickets, total] = await Promise.all([
      this.prisma.ticket.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          category: true,
          createdByProfile: {
            select: {
              id: true,
              fullName: true,
              email: true,
              role: true,
            },
          },
          // assignedToProfile: {
          //   select: {
          //     id: true,
          //     fullName: true,
          //     email: true,
          //     role: true,
          //   },
          // },
          order: {
            select: {
              id: true,
              totalAmount: true,
              currency: true,
              status: true,
            },
          },
          appointment: {
            select: {
              id: true,
              appointmentDate: true,
              status: true,
            },
          },
          _count: {
            select: {
              responses: true,
              conversations: true,
            },
          },
        },
      }),
      this.prisma.ticket.count({ where }),
    ]);

    return {
      tickets,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Get ticket by ID
  async getTicketById(id: string) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: {
        category: true,
        createdByProfile: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          },
        },
        // assignedToProfile: {
        //   select: {
        //     id: true,
        //     fullName: true,
        //     email: true,
        //     role: true,
        //   },
        // },
        order: {
          select: {
            id: true,
            totalAmount: true,
            currency: true,
            status: true,
            customerEmail: true,
          },
        },
        appointment: {
          select: {
            id: true,
            appointmentDate: true,
            status: true,
            service: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
        responses: {
          orderBy: { createdAt: 'asc' },
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                email: true,
                role: true,
              },
            },
          },
        },
        conversations: {
          orderBy: { createdAt: 'asc' },
          include: {
            createdByProfile: {
              select: {
                id: true,
                fullName: true,
                email: true,
                role: true,
              },
            },
          },
        },
        auditLogs: {
          orderBy: { performedAt: 'desc' },
          include: {
            performedByProfile: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
}

    return ticket;
  }

  // Create new ticket
  async createTicket(createTicketDto: CreateTicketDto, userId: string) {
    const {
      title,
      description,
      categoryId,
      priority = 'medium',
      clientId,
      orderId,
      appointmentId,
      tags = [],
      metadata,
      dueDate,
    } = createTicketDto;

    // Validate category exists
    if (categoryId) {
      const category = await this.prisma.ticketCategory.findUnique({
        where: { id: categoryId },
      });
      if (!category) {
        throw new BadRequestException('Invalid category ID');
      }
    }

    // Validate order exists if provided
    if (orderId) {
      const order = await this.prisma.order.findUnique({
        where: { id: orderId },
      });
      if (!order) {
        throw new BadRequestException('Invalid order ID');
      }
    }

    // Validate appointment exists if provided
    if (appointmentId) {
      const appointment = await this.prisma.appointment.findUnique({
        where: { id: appointmentId },
      });
      if (!appointment) {
        throw new BadRequestException('Invalid appointment ID');
      }
    }

    const ticket = await this.prisma.ticket.create({
      data: {
        ticketNumber: this.generateTicketNumber(),
        title,
        description,
        categoryId,
        priority,
        createdBy: userId,
        clientId,
        orderId,
        appointmentId,
        tags,
        metadata,
        dueDate: dueDate ? new Date(dueDate) : null,
        lastActivityAt: new Date(),
      },
      include: {
        category: true,
        createdByProfile: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          },
        },
        order: {
          select: {
            id: true,
            totalAmount: true,
            currency: true,
            status: true,
          },
        },
        appointment: {
          select: {
            id: true,
            appointmentDate: true,
            status: true,
          },
        },
      },
    });

    // Create audit log
    await this.createAuditLog(ticket.id, 'TICKET_CREATED', userId, null, 'open');

    return ticket;
  }

  // Update ticket
  async updateTicket(id: string, updateTicketDto: UpdateTicketDto, userId: string, userRole: string) {
    const ticket = await this.getTicketById(id);

    // Check permissions
    if (userRole !== 'admin' && ticket.createdBy !== userId) {
      throw new ForbiddenException('You can only update your own tickets');
    }

    const oldStatus = ticket.status;
    const oldPriority = ticket.priority;
    const oldAssignedTo = ticket.assignedTo;

    const updatedTicket = await this.prisma.ticket.update({
      where: { id },
      data: {
        ...updateTicketDto,
        lastActivityAt: new Date(),
        resolvedAt: updateTicketDto.status === 'resolved' ? new Date() : ticket.resolvedAt,
        closedAt: updateTicketDto.status === 'closed' ? new Date() : ticket.closedAt,
      },
      include: {
        category: true,
        createdByProfile: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          },
        },
        // assignedToProfile: {
        //   select: {
        //     id: true,
        //     fullName: true,
        //     email: true,
        //     role: true,
        //   },
        // },
        order: {
          select: {
            id: true,
            totalAmount: true,
            currency: true,
            status: true,
          },
        },
        appointment: {
          select: {
            id: true,
            appointmentDate: true,
            status: true,
          },
        },
      },
    });

    // Create audit logs for changes
    if (updateTicketDto.status && updateTicketDto.status !== oldStatus) {
      await this.createAuditLog(id, 'STATUS_CHANGED', userId, oldStatus, updateTicketDto.status);
    }
    if (updateTicketDto.priority && updateTicketDto.priority !== oldPriority) {
      await this.createAuditLog(id, 'PRIORITY_CHANGED', userId, oldPriority, updateTicketDto.priority);
    }
    if (updateTicketDto.assignedTo && updateTicketDto.assignedTo !== oldAssignedTo) {
      await this.createAuditLog(id, 'ASSIGNMENT_CHANGED', userId, oldAssignedTo, updateTicketDto.assignedTo);
    }

    return updatedTicket;
  }

  // Delete ticket
  async deleteTicket(id: string, userId: string, userRole: string) {
    const ticket = await this.getTicketById(id);

    // Check permissions
    if (userRole !== 'admin' && ticket.createdBy !== userId) {
      throw new ForbiddenException('You can only delete your own tickets');
    }

    await this.prisma.ticket.delete({
      where: { id },
    });

    return { message: 'Ticket deleted successfully' };
  }

  // Add response to ticket
  async addResponse(ticketId: string, createResponseDto: CreateTicketResponseDto, userId: string) {
    const ticket = await this.getTicketById(ticketId);

    const response = await this.prisma.ticketResponse.create({
      data: {
        ticketId,
        userId,
        message: createResponseDto.message,
        isInternal: createResponseDto.isInternal || false,
        attachments: createResponseDto.attachments,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          },
        },
      },
    });

    // Update ticket last activity
    await this.prisma.ticket.update({
      where: { id: ticketId },
      data: { lastActivityAt: new Date() },
    });

    // Create audit log
    await this.createAuditLog(ticketId, 'RESPONSE_ADDED', userId, null, 'Response added');

    return response;
  }

  // Get user's tickets
  async getUserTickets(userId: string, userRole: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    let where: any = {};
    
    if (userRole === 'admin') {
      // Admin can see all tickets
      where = {};
    } else if (userRole === 'client') {
      // Clients can see their own tickets
      where = { createdBy: userId };
    } else {
      // Other roles can see tickets assigned to them or created by them
      where = {
        OR: [
          { createdBy: userId },
          { assignedTo: userId },
        ],
      };
    }

    const [tickets, total] = await Promise.all([
      this.prisma.ticket.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          category: true,
          createdByProfile: {
            select: {
              id: true,
              fullName: true,
              email: true,
              role: true,
            },
          },
          // assignedToProfile: {
          //   select: {
          //     id: true,
          //     fullName: true,
          //     email: true,
          //     role: true,
          //   },
          // },
          _count: {
            select: {
              responses: true,
              conversations: true,
            },
          },
        },
      }),
      this.prisma.ticket.count({ where }),
    ]);

    return {
      tickets,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Get ticket statistics
  async getTicketStats(userId?: string, userRole?: string) {
    let where: any = {};
    
    if (userRole === 'admin') {
      where = {};
    } else if (userRole === 'client' && userId) {
      where = { createdBy: userId };
    } else if (userId) {
      where = {
        OR: [
          { createdBy: userId },
          { assignedTo: userId },
        ],
      };
    }

    const [
      totalTickets,
      openTickets,
      inProgressTickets,
      resolvedTickets,
      closedTickets,
      highPriorityTickets,
      overdueTickets,
    ] = await Promise.all([
      this.prisma.ticket.count({ where }),
      this.prisma.ticket.count({ where: { ...where, status: 'open' } }),
      this.prisma.ticket.count({ where: { ...where, status: 'in_progress' } }),
      this.prisma.ticket.count({ where: { ...where, status: 'resolved' } }),
      this.prisma.ticket.count({ where: { ...where, status: 'closed' } }),
      this.prisma.ticket.count({ where: { ...where, priority: 'high' } }),
      this.prisma.ticket.count({
        where: {
          ...where,
          dueDate: { lt: new Date() },
          status: { notIn: ['resolved', 'closed'] },
        },
      }),
    ]);

    return {
      totalTickets,
      openTickets,
      inProgressTickets,
      resolvedTickets,
      closedTickets,
      highPriorityTickets,
      overdueTickets,
    };
  }

  // Get ticket categories
  async getTicketCategories() {
    return this.prisma.ticketCategory.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  // Create ticket category
  async createTicketCategory(data: {
    name: string;
    description?: string;
    color?: string;
    icon?: string;
  }) {
    return this.prisma.ticketCategory.create({
      data,
    });
  }

  // Update ticket category
  async updateTicketCategory(id: string, data: {
    name?: string;
    description?: string;
    color?: string;
    icon?: string;
    isActive?: boolean;
  }) {
    return this.prisma.ticketCategory.update({
      where: { id },
      data,
    });
  }

  // Delete ticket category
  async deleteTicketCategory(id: string) {
    // Check if category is in use
    const ticketsCount = await this.prisma.ticket.count({
      where: { categoryId: id },
    });

    if (ticketsCount > 0) {
      throw new BadRequestException('Cannot delete category that is in use');
    }

    return this.prisma.ticketCategory.delete({
      where: { id },
    });
  }

  // Search tickets
  async searchTickets(query: string, userId?: string, userRole?: string) {
    let where: any = {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { ticketNumber: { contains: query, mode: 'insensitive' } },
      ],
    };

    if (userRole === 'admin') {
      // Admin can search all tickets
    } else if (userRole === 'client' && userId) {
      where = { ...where, createdBy: userId };
    } else if (userId) {
      where = {
        ...where,
        OR: [
          { createdBy: userId },
          { assignedTo: userId },
        ],
      };
    }

    return this.prisma.ticket.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        createdByProfile: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          },
        },
        // assignedToProfile: {
        //   select: {
        //     id: true,
        //     fullName: true,
        //     email: true,
        //     role: true,
        //   },
        // },
        _count: {
          select: {
            responses: true,
            conversations: true,
          },
        },
      },
    });
  }
}