import { Module } from '@nestjs/common';
import { StaffAssignmentsService } from './staff-assignments.service';
import { StaffAssignmentsController } from './staff-assignments.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StaffAssignmentsController],
  providers: [StaffAssignmentsService],
  exports: [StaffAssignmentsService],
})
export class StaffAssignmentsModule {}
