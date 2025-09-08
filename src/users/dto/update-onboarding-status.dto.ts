import { IsEnum } from 'class-validator';
import { onboarding_status } from '@prisma/client';

export class UpdateOnboardingStatusDto {
  @IsEnum(onboarding_status)
  status: onboarding_status;
}
