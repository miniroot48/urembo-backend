import { IsString, IsOptional, IsBoolean, IsIn, MaxLength } from 'class-validator';

export class CreateCmsPagesDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  @MaxLength(255)
  slug: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  @IsIn(['text', 'pdf'])
  contentType?: string;

  @IsOptional()
  @IsString()
  pdfUrl?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
