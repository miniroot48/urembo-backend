import { IsString, IsOptional, IsBoolean, IsInt, IsUrl, IsIn, Min } from 'class-validator';

export class CreateCmsCategoryDto {
  @IsString()
  @IsIn(['service', 'product'])
  categoryType: string;

  @IsString()
  @IsUrl()
  imageUrl: string;

  @IsInt()
  @Min(0)
  providerCount: number;

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
