import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class SubmitRequirementDto {
  @IsString()
  @IsNotEmpty()
  requirementId: string;

  @IsString()
  @IsOptional()
  value?: string;

  @IsString()
  @IsOptional()
  fileUrl?: string;
}
