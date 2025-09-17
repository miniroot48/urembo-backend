import { IsString, IsOptional, IsBoolean, IsUrl, MaxLength } from 'class-validator';

export class UpdateCmsPageBannerDto {
  @IsOptional()
  @IsString()
  pageRoute?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  subtitle?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  mobileImageUrl?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
