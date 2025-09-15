import { IsString, IsOptional, IsDateString, IsEnum, IsArray, IsObject } from 'class-validator';

export class UpdateLiveSessionDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  scheduledStart?: string;

  @IsOptional()
  @IsDateString()
  scheduledEnd?: string;

  @IsOptional()
  @IsEnum(['scheduled', 'live', 'ended', 'cancelled'])
  status?: 'scheduled' | 'live' | 'ended' | 'cancelled';

  @IsOptional()
  @IsString()
  streamUrl?: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsObject()
  metadata?: any;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  timezone?: string;
}
