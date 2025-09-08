import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SubmitRequirementDto } from './submit-requirement.dto';

export class BulkSubmitDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmitRequirementDto)
  submissions: SubmitRequirementDto[];
}
