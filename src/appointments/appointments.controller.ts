import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Patch,
  Body, 
  Param, 
  Query, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { booking_status } from '@prisma/client';

@Controller('appointments')
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Get()
  async getAllAppointments(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : undefined;
    return this.appointmentsService.getAllAppointments(limitNum);
  }

  @Get(':id')
  async getAppointmentById(@Param('id') id: string) {
    return this.appointmentsService.getAppointmentById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.createAppointment(createAppointmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateAppointment(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ) {
    return this.appointmentsService.updateAppointment(id, updateAppointmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteAppointment(@Param('id') id: string) {
    return this.appointmentsService.deleteAppointment(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  async updateAppointmentStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateAppointmentStatusDto
  ) {
    return this.appointmentsService.updateAppointmentStatus(id, updateStatusDto);
  }

  @Get('vendor/:vendorId')
  async getAppointmentsByVendorId(@Param('vendorId') vendorId: string) {
    return this.appointmentsService.getAppointmentsByVendorId(vendorId);
  }

  @Get('client/:clientId')
  async getAppointmentsByClientId(@Param('clientId') clientId: string) {
    return this.appointmentsService.getAppointmentsByClientId(clientId);
  }

  @Get('staff/:staffId')
  async getAppointmentsByStaffId(@Param('staffId') staffId: string) {
    return this.appointmentsService.getAppointmentsByStaffId(staffId);
  }

  @Get('status/:status')
  async getAppointmentsByStatus(@Param('status') status: booking_status) {
    return this.appointmentsService.getAppointmentsByStatus(status);
  }

  @Get('date-range')
  async getAppointmentsByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
  ) {
    return this.appointmentsService.getAppointmentsByDateRange(startDate, endDate);
  }

  @UseGuards(JwtAuthGuard)
  @Get('upcoming/:userRole')
  async getUpcomingAppointments(
    @Request() req,
    @Param('userRole') userRole: 'client' | 'vendor' | 'staff'
  ) {
    return this.appointmentsService.getUpcomingAppointments(req.user.sub, userRole);
  }

  @Get('stats')
  async getAppointmentStats(@Query('vendorId') vendorId?: string) {
    return this.appointmentsService.getAppointmentStats(vendorId);
  }

  // Convenience endpoints for authenticated users
  @UseGuards(JwtAuthGuard)
  @Get('my/appointments')
  async getMyAppointments(@Request() req) {
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

  @UseGuards(JwtAuthGuard)
  @Get('my/upcoming')
  async getMyUpcomingAppointments(@Request() req) {
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

  @UseGuards(JwtAuthGuard)
  @Get('my/stats')
  async getMyAppointmentStats(@Request() req) {
    const userRole = req.user.role;
    
    if (userRole === 'vendor') {
      return this.appointmentsService.getAppointmentStats(req.user.sub);
    }
    
    return this.appointmentsService.getAppointmentStats();
  }
}
