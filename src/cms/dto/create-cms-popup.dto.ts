import { IsString, IsOptional, IsBoolean, IsInt, IsIn, IsArray, IsDateString, Min } from 'class-validator';

export class CreateCmsPopupDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @IsIn(['promotion', 'alert', 'discount', 'maintenance', 'announcement'])
  popupType: string;

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
