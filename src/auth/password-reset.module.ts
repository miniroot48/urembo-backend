import { Module } from '@nestjs/common';
import { PasswordResetController } from './password-reset.controller';
import { PasswordResetService } from './password-reset.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailModule } from '../email/email.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, EmailModule, ConfigModule],
  controllers: [PasswordResetController],
  providers: [PasswordResetService],
  exports: [PasswordResetService],
})
export class PasswordResetModule {}
