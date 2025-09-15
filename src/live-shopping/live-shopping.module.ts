import { Module } from '@nestjs/common';
import { LiveShoppingController } from './live-shopping.controller';
import { LiveShoppingService } from './live-shopping.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LiveShoppingController],
  providers: [LiveShoppingService],
  exports: [LiveShoppingService],
})
export class LiveShoppingModule {}
