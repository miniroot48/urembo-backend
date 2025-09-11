import { IsString, IsOptional, IsBoolean, IsInt, IsObject, Min } from 'class-validator';

export class UpdateCmsFooterContentDto {
  @IsOptional()
  @IsString()
  sectionKey?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsObject()
  content?: any;

  @IsOptional()
  @IsInt()
  @Min(0)
  position?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
