import { Controller, Get } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Get()
  async getAllAppointments() {
    return this.appointmentsService.getAllAppointments();
  }
}
