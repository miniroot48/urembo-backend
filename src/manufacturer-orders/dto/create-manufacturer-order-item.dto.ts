import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateManufacturerOrderItemDto {
  @IsString()
  orderId: string;

  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unitPrice: number;

  @IsString()
  currency: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsNumber()
  tax?: number;

  @IsOptional()
  @IsString()
  variant?: string;

  @IsOptional()
  @IsString()
  sku?: string;
}
