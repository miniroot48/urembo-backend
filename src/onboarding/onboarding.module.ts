import { Module } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { OnboardingController } from './onboarding.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [PrismaModule, EmailModule],
  controllers: [OnboardingController],
  providers: [OnboardingService],
  exports: [OnboardingService],
})
export class OnboardingModule {}
