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
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TicketsService = class TicketsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateTicketNumber() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 5);
        return `TK-${timestamp}-${random}`.toUpperCase();
    }
    async createAuditLog(ticketId, actionType, performedBy, previousValue, newValue, metadata) {
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
    async getAllTickets(page = 1, limit = 10, status, priority, categoryId, assignedTo, createdBy) {
        const skip = (page - 1) * limit;
        const where = {};
        if (status)
            where.status = status;
        if (priority)
            where.priority = priority;
        if (categoryId)
            where.categoryId = categoryId;
        if (assignedTo)
            where.assignedTo = assignedTo;
        if (createdBy)
            where.createdBy = createdBy;
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
    async getTicketById(id) {
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
            throw new common_1.NotFoundException('Ticket not found');
        }
        return ticket;
    }
    async createTicket(createTicketDto, userId) {
        const { title, description, categoryId, priority = 'medium', clientId, orderId, appointmentId, tags = [], metadata, dueDate, } = createTicketDto;
        if (categoryId) {
            const category = await this.prisma.ticketCategory.findUnique({
                where: { id: categoryId },
            });
            if (!category) {
                throw new common_1.BadRequestException('Invalid category ID');
            }
        }
        if (orderId) {
            const order = await this.prisma.order.findUnique({
                where: { id: orderId },
            });
            if (!order) {
                throw new common_1.BadRequestException('Invalid order ID');
            }
        }
        if (appointmentId) {
            const appointment = await this.prisma.appointment.findUnique({
                where: { id: appointmentId },
            });
            if (!appointment) {
                throw new common_1.BadRequestException('Invalid appointment ID');
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
        await this.createAuditLog(ticket.id, 'TICKET_CREATED', userId, null, 'open');
        return ticket;
    }
    async updateTicket(id, updateTicketDto, userId, userRole) {
        const ticket = await this.getTicketById(id);
        if (userRole !== 'admin' && ticket.createdBy !== userId) {
            throw new common_1.ForbiddenException('You can only update your own tickets');
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
    async deleteTicket(id, userId, userRole) {
        const ticket = await this.getTicketById(id);
        if (userRole !== 'admin' && ticket.createdBy !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own tickets');
        }
        await this.prisma.ticket.delete({
            where: { id },
        });
        return { message: 'Ticket deleted successfully' };
    }
    async addResponse(ticketId, createResponseDto, userId) {
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
        await this.prisma.ticket.update({
            where: { id: ticketId },
            data: { lastActivityAt: new Date() },
        });
        await this.createAuditLog(ticketId, 'RESPONSE_ADDED', userId, null, 'Response added');
        return response;
    }
    async getUserTickets(userId, userRole, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        let where = {};
        if (userRole === 'admin') {
            where = {};
        }
        else if (userRole === 'client') {
            where = { createdBy: userId };
        }
        else {
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
    async getTicketStats(userId, userRole) {
        let where = {};
        if (userRole === 'admin') {
            where = {};
        }
        else if (userRole === 'client' && userId) {
            where = { createdBy: userId };
        }
        else if (userId) {
            where = {
                OR: [
                    { createdBy: userId },
                    { assignedTo: userId },
                ],
            };
        }
        const [totalTickets, openTickets, inProgressTickets, resolvedTickets, closedTickets, highPriorityTickets, overdueTickets,] = await Promise.all([
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
    async getTicketCategories() {
        return this.prisma.ticketCategory.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' },
        });
    }
    async createTicketCategory(data) {
        return this.prisma.ticketCategory.create({
            data,
        });
    }
    async updateTicketCategory(id, data) {
        return this.prisma.ticketCategory.update({
            where: { id },
            data,
        });
    }
    async deleteTicketCategory(id) {
        const ticketsCount = await this.prisma.ticket.count({
            where: { categoryId: id },
        });
        if (ticketsCount > 0) {
            throw new common_1.BadRequestException('Cannot delete category that is in use');
        }
        return this.prisma.ticketCategory.delete({
            where: { id },
        });
    }
    async searchTickets(query, userId, userRole) {
        let where = {
            OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { ticketNumber: { contains: query, mode: 'insensitive' } },
            ],
        };
        if (userRole === 'admin') {
        }
        else if (userRole === 'client' && userId) {
            where = { ...where, createdBy: userId };
        }
        else if (userId) {
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
                _count: {
                    select: {
                        responses: true,
                        conversations: true,
                    },
                },
            },
        });
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map