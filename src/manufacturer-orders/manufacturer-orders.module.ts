import { Module } from '@nestjs/common';
import { ManufacturerOrdersController } from './manufacturer-orders.controller';
import { ManufacturerOrdersService } from './manufacturer-orders.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ManufacturerOrdersController],
  providers: [ManufacturerOrdersService],
  exports: [ManufacturerOrdersService],
})
export class ManufacturerOrdersModule {}

