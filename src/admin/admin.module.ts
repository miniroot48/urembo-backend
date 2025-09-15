import { Module } from '@nestjs/common';
import { AdminNotificationService } from './admin-notification.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [PrismaModule, EmailModule],
  providers: [AdminNotificationService],
  exports: [AdminNotificationService],
})
export class AdminModule {}
