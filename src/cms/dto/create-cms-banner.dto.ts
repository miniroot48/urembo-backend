import { IsString, IsOptional, IsBoolean, IsInt, IsUrl, MaxLength, Min } from 'class-validator';

export class CreateCmsBannerDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  subtitle?: string;

  @IsString()
  @IsUrl()
  imageUrl: string;

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
  ctaLink?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  position?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
