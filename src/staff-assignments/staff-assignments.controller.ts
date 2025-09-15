import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { StaffAssignmentsService } from './staff-assignments.service';
import { CreateStaffAssignmentDto } from './dto/create-staff-assignment.dto';
import { UpdateStaffAssignmentDto } from './dto/update-staff-assignment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('staff-assignments')
export class StaffAssignmentsController {
  constructor(private readonly staffAssignmentsService: StaffAssignmentsService) {}

  @Post()
  create(@Body() createStaffAssignmentDto: CreateStaffAssignmentDto, @Request() req) {
    return this.staffAssignmentsService.createStaffAssignment(
      createStaffAssignmentDto, 
      req.user.sub
    );
  }

  @Get()
  findAll() {
    return this.staffAssignmentsService.getAllStaffAssignments();
  }

  @Get('active')
  findActive() {
    return this.staffAssignmentsService.getActiveStaffAssignments();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffAssignmentsService.getStaffAssignmentById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffAssignmentDto: UpdateStaffAssignmentDto) {
    return this.staffAssignmentsService.updateStaffAssignment(id, updateStaffAssignmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffAssignmentsService.deleteStaffAssignment(id);
  }
}
