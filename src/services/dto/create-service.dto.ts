import { IsString, IsNumber, IsOptional, IsBoolean, IsUUID, Min, MaxLength, IsArray } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsString()
  @MaxLength(3)
  currency?: string;

  @IsNumber()
  @Min(1)
  durationMinutes: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  imageUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  category?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsUUID()
  subcategoryId?: string;

  @IsOptional()
  @IsUUID()
  actualServiceId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  deliveryMethod?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  metadata?: any;
}
