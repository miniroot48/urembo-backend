import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { onboarding_status } from '@prisma/client';

export class ReviewSubmissionDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(onboarding_status)
  @IsNotEmpty()
  status: onboarding_status;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  rejectionReason?: string;
}
