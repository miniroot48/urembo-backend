import { IsString, IsNotEmpty, IsEnum, IsBoolean, IsOptional, IsInt, IsObject } from 'class-validator';
import { user_role, onboarding_field_type } from '@prisma/client';

export class CreateRequirementDto {
  @IsEnum(user_role)
  @IsNotEmpty()
  role: user_role;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsEnum(onboarding_field_type)
  @IsNotEmpty()
  fieldType: onboarding_field_type;

  @IsBoolean()
  @IsOptional()
  isMandatory?: boolean;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  placeholder?: string;

  @IsObject()
  @IsOptional()
  selectOptions?: any;

  @IsInt()
  @IsOptional()
  position?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  isPaymentRelated?: boolean;

  @IsObject()
  @IsOptional()
  validationRules?: any;
}
