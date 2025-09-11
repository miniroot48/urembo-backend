import { IsString, IsOptional, IsBoolean, IsInt, IsUrl, MaxLength, Min } from 'class-validator';

export class UpdateCmsCategoryBannerDto {
  @IsOptional()
  @IsString()
  categorySlug?: string;

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
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  mobileImageUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  ctaText?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  ctaUrl?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  position?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
