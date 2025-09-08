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
exports.AppointmentsController = void 0;
const common_1 = require("@nestjs/common");
const appointments_service_1 = require("./appointments.service");
const create_appointment_dto_1 = require("./dto/create-appointment.dto");
const update_appointment_dto_1 = require("./dto/update-appointment.dto");
const update_appointment_status_dto_1 = require("./dto/update-appointment-status.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const client_1 = require("@prisma/client");
let AppointmentsController = class AppointmentsController {
    constructor(appointmentsService) {
        this.appointmentsService = appointmentsService;
    }
    async getAllAppointments(limit) {
        const limitNum = limit ? parseInt(limit, 10) : undefined;
        return this.appointmentsService.getAllAppointments(limitNum);
    }
    async getAppointmentById(id) {
        return this.appointmentsService.getAppointmentById(id);
    }
    async createAppointment(createAppointmentDto) {
        return this.appointmentsService.createAppointment(createAppointmentDto);
    }
    async updateAppointment(id, updateAppointmentDto) {
        return this.appointmentsService.updateAppointment(id, updateAppointmentDto);
    }
    async deleteAppointment(id) {
        return this.appointmentsService.deleteAppointment(id);
    }
    async updateAppointmentStatus(id, updateStatusDto) {
        return this.appointmentsService.updateAppointmentStatus(id, updateStatusDto);
    }
    async getAppointmentsByVendorId(vendorId) {
        return this.appointmentsService.getAppointmentsByVendorId(vendorId);
    }
    async getAppointmentsByClientId(clientId) {
        return this.appointmentsService.getAppointmentsByClientId(clientId);
    }
    async getAppointmentsByStaffId(staffId) {
        return this.appointmentsService.getAppointmentsByStaffId(staffId);
    }
    async getAppointmentsByStatus(status) {
        return this.appointmentsService.getAppointmentsByStatus(status);
    }
    async getAppointmentsByDateRange(startDate, endDate) {
        return this.appointmentsService.getAppointmentsByDateRange(startDate, endDate);
    }
    async getUpcomingAppointments(req, userRole) {
        return this.appointmentsService.getUpcomingAppointments(req.user.sub, userRole);
    }
    async getAppointmentStats(vendorId) {
        return this.appointmentsService.getAppointmentStats(vendorId);
    }
    async getMyAppointments(req) {
        const userRole = req.user.role;
        switch (userRole) {
            case 'client':
                return this.appointmentsService.getAppointmentsByClientId(req.user.sub);
            case 'vendor':
                return this.appointmentsService.getAppointmentsByVendorId(req.user.sub);
            default:
                return this.appointmentsService.getAllAppointments();
        }
    }
    async getMyUpcomingAppointments(req) {
        const userRole = req.user.role;
        switch (userRole) {
            case 'client':
                return this.appointmentsService.getUpcomingAppointments(req.user.sub, 'client');
            case 'vendor':
                return this.appointmentsService.getUpcomingAppointments(req.user.sub, 'vendor');
            default:
                return [];
        }
    }
    async getMyAppointmentStats(req) {
        const userRole = req.user.role;
        if (userRole === 'vendor') {
            return this.appointmentsService.getAppointmentStats(req.user.sub);
        }
        return this.appointmentsService.getAppointmentStats();
    }
};
exports.AppointmentsController = AppointmentsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getAllAppointments", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getAppointmentById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appointment_dto_1.CreateAppointmentDto]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "createAppointment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_appointment_dto_1.UpdateAppointmentDto]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "updateAppointment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "deleteAppointment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_appointment_status_dto_1.UpdateAppointmentStatusDto]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "updateAppointmentStatus", null);
__decorate([
    (0, common_1.Get)('vendor/:vendorId'),
    __param(0, (0, common_1.Param)('vendorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getAppointmentsByVendorId", null);
__decorate([
    (0, common_1.Get)('client/:clientId'),
    __param(0, (0, common_1.Param)('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getAppointmentsByClientId", null);
__decorate([
    (0, common_1.Get)('staff/:staffId'),
    __param(0, (0, common_1.Param)('staffId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getAppointmentsByStaffId", null);
__decorate([
    (0, common_1.Get)('status/:status'),
    __param(0, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getAppointmentsByStatus", null);
__decorate([
    (0, common_1.Get)('date-range'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getAppointmentsByDateRange", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('upcoming/:userRole'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('userRole')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getUpcomingAppointments", null);
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, common_1.Query)('vendorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getAppointmentStats", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('my/appointments'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getMyAppointments", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('my/upcoming'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getMyUpcomingAppointments", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('my/stats'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getMyAppointmentStats", null);
exports.AppointmentsController = AppointmentsController = __decorate([
    (0, common_1.Controller)('appointments'),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService])
], AppointmentsController);
//# sourceMappingURL=appointments.controller.js.map