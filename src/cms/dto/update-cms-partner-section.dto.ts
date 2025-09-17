import { IsString, IsOptional, IsBoolean, IsInt, Min, MaxLength } from 'class-validator';

export class UpdateCmsPartnerSectionDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  subtitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  backgroundImage?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  cta1Text?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  cta1Link?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  cta2Text?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  cta2Link?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  position?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
