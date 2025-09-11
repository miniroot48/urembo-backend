import { IsString, IsOptional, IsBoolean, IsInt, IsUrl, IsIn, Min } from 'class-validator';

export class UpdateCmsCategoryDto {
  @IsOptional()
  @IsString()
  @IsIn(['service', 'product'])
  categoryType?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  providerCount?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  position?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  subcategoryId?: string;

  @IsOptional()
  @IsString()
  productCategoryId?: string;

  @IsOptional()
  @IsString()
  productSubcategoryId?: string;
}
