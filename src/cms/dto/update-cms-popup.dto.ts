import { IsString, IsOptional, IsBoolean, IsInt, IsIn, IsArray, IsDateString, Min, MaxLength } from 'class-validator';

export class UpdateCmsPopupDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  @IsIn(['promotion', 'alert', 'discount', 'maintenance', 'announcement'])
  popupType?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  targetPages?: string[];

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  maxDisplaysPerSession?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
