import { IsString, IsDateString, IsNumber, IsOptional, IsEnum, IsUUID, Min } from 'class-validator';
import { booking_status, appointment_status_enhanced } from '@prisma/client';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsString()
  @IsUUID()
  serviceId?: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  clientId?: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  vendorId?: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  staffId?: string;

  @IsOptional()
  @IsDateString()
  appointmentDate?: string;

  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  durationMinutes?: number;

  @IsOptional()
  @IsEnum(booking_status)
  status?: booking_status;

  @IsOptional()
  @IsEnum(appointment_status_enhanced)
  statusEnhanced?: appointment_status_enhanced;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalAmount?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsNumber()
  escrowAmount?: number;

  @IsOptional()
  @IsString()
  escrowStatus?: string;

  @IsOptional()
  @IsNumber()
  commissionAmount?: number;

  @IsOptional()
  @IsNumber()
  commissionRate?: number;

  @IsOptional()
  @IsDateString()
  completionConfirmedAt?: string;

  @IsOptional()
  @IsDateString()
  autoReleaseAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
