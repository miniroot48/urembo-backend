import { IsString, IsOptional, IsArray, IsEnum, IsDateString, IsObject, IsInt, Min, Max } from 'class-validator';

export class UpdateTicketDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsEnum(['low', 'medium', 'high', 'urgent'])
  priority?: 'low' | 'medium' | 'high' | 'urgent';

  @IsOptional()
  @IsEnum(['open', 'in_progress', 'resolved', 'closed', 'cancelled'])
  status?: 'open' | 'in_progress' | 'resolved' | 'closed' | 'cancelled';

  @IsOptional()
  @IsString()
  assignedTo?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsObject()
  metadata?: any;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  satisfactionRating?: number;

  @IsOptional()
  @IsString()
  feedback?: string;
}
