import { IsEnum, IsOptional, IsString } from 'class-validator';
import { booking_status, appointment_status_enhanced } from '@prisma/client';

export class UpdateAppointmentStatusDto {
  @IsEnum(booking_status)
  status: booking_status;

  @IsOptional()
  @IsEnum(appointment_status_enhanced)
  statusEnhanced?: appointment_status_enhanced;

  @IsOptional()
  @IsString()
  notes?: string;
}
