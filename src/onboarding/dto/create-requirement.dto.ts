import { IsString, IsEnum, IsBoolean, IsOptional, IsArray, IsInt, IsObject } from 'class-validator';

export class CreateRequirementDto {
  @IsEnum(['client', 'vendor', 'retailer', 'admin', 'manufacturer'])
  role: 'client' | 'vendor' | 'retailer' | 'admin' | 'manufacturer';

  @IsString()
  label: string;

  @IsEnum(['text', 'textarea', 'select', 'file', 'email', 'phone', 'url', 'rich_text'])
  fieldType: 'text' | 'textarea' | 'select' | 'file' | 'email' | 'phone' | 'url' | 'rich_text';

  @IsBoolean()
  isMandatory: boolean;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  placeholder?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  selectOptions?: string[];

  @IsInt()
  position: number;

  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsBoolean()
  isPaymentRelated?: boolean;

  @IsOptional()
  @IsObject()
  validationRules?: any;
}