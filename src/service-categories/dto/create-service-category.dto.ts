import { IsString, IsNumber, IsOptional, IsBoolean, IsUUID, Min, MaxLength } from 'class-validator';

export class CreateServiceCategoryDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  imageUrl?: string;

  @IsNumber()
  @Min(1)
  level: number;

  @IsOptional()
  @IsUUID()
  parentId?: string;

  @IsNumber()
  @Min(0)
  position: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
