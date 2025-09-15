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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsController = void 0;
const common_1 = require("@nestjs/common");
const tickets_service_1 = require("./tickets.service");
const create_ticket_dto_1 = require("./dto/create-ticket.dto");
const update_ticket_dto_1 = require("./dto/update-ticket.dto");
const create_ticket_response_dto_1 = require("./dto/create-ticket-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let TicketsController = class TicketsController {
    constructor(ticketsService) {
        this.ticketsService = ticketsService;
    }
    async getAllTickets(page, limit, status, priority, categoryId, assignedTo, createdBy) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return this.ticketsService.getAllTickets(pageNum, limitNum, status, priority, categoryId, assignedTo, createdBy);
    }
    async getTicketById(id) {
        return this.ticketsService.getTicketById(id);
    }
    async createTicket(createTicketDto, req) {
        return this.ticketsService.createTicket(createTicketDto, req.user.sub);
    }
    async updateTicket(id, updateTicketDto, req) {
        return this.ticketsService.updateTicket(id, updateTicketDto, req.user.sub, req.user.role);
    }
    async deleteTicket(id, req) {
        return this.ticketsService.deleteTicket(id, req.user.sub, req.user.role);
    }
    async addResponse(id, createResponseDto, req) {
        return this.ticketsService.addResponse(id, createResponseDto, req.user.sub);
    }
    async getUserTickets(req, page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return this.ticketsService.getUserTickets(req.user.sub, req.user.role, pageNum, limitNum);
    }
    async getTicketStats(req) {
        return this.ticketsService.getTicketStats(req.user.sub, req.user.role);
    }
    async getTicketCategories() {
        return this.ticketsService.getTicketCategories();
    }
    async createTicketCategory(data, req) {
        if (req.user.role !== 'admin') {
            throw new Error('Only admins can create ticket categories');
        }
        return this.ticketsService.createTicketCategory(data);
    }
    async updateTicketCategory(id, data, req) {
        if (req.user.role !== 'admin') {
            throw new Error('Only admins can update ticket categories');
        }
        return this.ticketsService.updateTicketCategory(id, data);
    }
    async deleteTicketCategory(id, req) {
        if (req.user.role !== 'admin') {
            throw new Error('Only admins can delete ticket categories');
        }
        return this.ticketsService.deleteTicketCategory(id);
    }
    async searchTickets(req, query) {
        return this.ticketsService.searchTickets(query, req.user.sub, req.user.role);
    }
};
exports.TicketsController = TicketsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('priority')),
    __param(4, (0, common_1.Query)('categoryId')),
    __param(5, (0, common_1.Query)('assignedTo')),
    __param(6, (0, common_1.Query)('createdBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getAllTickets", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getTicketById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ticket_dto_1.CreateTicketDto, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "createTicket", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ticket_dto_1.UpdateTicketDto, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "updateTicket", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "deleteTicket", null);
__decorate([
    (0, common_1.Post)(':id/responses'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_ticket_response_dto_1.CreateTicketResponseDto, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "addResponse", null);
__decorate([
    (0, common_1.Get)('my/tickets'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getUserTickets", null);
__decorate([
    (0, common_1.Get)('stats/overview'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getTicketStats", null);
__decorate([
    (0, common_1.Get)('categories/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getTicketCategories", null);
__decorate([
    (0, common_1.Post)('categories'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "createTicketCategory", null);
__decorate([
    (0, common_1.Put)('categories/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "updateTicketCategory", null);
__decorate([
    (0, common_1.Delete)('categories/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "deleteTicketCategory", null);
__decorate([
    (0, common_1.Get)('search/query'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "searchTickets", null);
exports.TicketsController = TicketsController = __decorate([
    (0, common_1.Controller)('tickets'),
    __metadata("design:paramtypes", [tickets_service_1.TicketsService])
], TicketsController);
//# sourceMappingURL=tickets.controller.js.map