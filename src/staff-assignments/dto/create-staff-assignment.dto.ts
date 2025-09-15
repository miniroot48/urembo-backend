import { IsString, IsObject, IsOptional, IsEnum, IsBoolean } from 'class-validator';

export class CreateStaffAssignmentDto {
  @IsString()
  userId: string;

  @IsEnum(['support', 'business_dev'])
  role: 'support' | 'business_dev';

  @IsObject()
  permissions: {
    manage_users?: boolean;
    manage_products?: boolean;
    manage_orders?: boolean;
    manage_tickets?: boolean;
    view_analytics?: boolean;
    manage_payments?: boolean;
    manage_settings?: boolean;
  };

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
