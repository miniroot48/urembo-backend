import { Module } from '@nestjs/common';
import { EscrowService } from './escrow.service';
import { EscrowController } from './escrow.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailModule } from '../email/email.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, EmailModule, ConfigModule],
  providers: [EscrowService],
  controllers: [EscrowController],
  exports: [EscrowService],
})
export class EscrowModule {}
