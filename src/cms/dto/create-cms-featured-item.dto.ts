import { IsString, IsOptional, IsBoolean, IsInt, IsIn, Min } from 'class-validator';

export class CreateCmsFeaturedItemDto {
  @IsString()
  @IsIn(['product', 'service', 'vendor', 'retailer', 'manufacturer'])
  itemType: string;

  @IsString()
  itemId: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  position?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
