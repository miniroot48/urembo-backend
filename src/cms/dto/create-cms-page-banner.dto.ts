import { IsString, IsOptional, IsBoolean, IsUrl, MaxLength } from 'class-validator';

export class CreateCmsPageBannerDto {
  @IsString()
  pageRoute: string;

  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  subtitle?: string;

  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsString()
  mobileImageUrl?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
