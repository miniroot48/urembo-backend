import { PartialType } from '@nestjs/mapped-types';
import { CreateStaffAssignmentDto } from './create-staff-assignment.dto';

export class UpdateStaffAssignmentDto extends PartialType(CreateStaffAssignmentDto) {}
