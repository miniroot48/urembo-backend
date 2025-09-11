import { IsString, IsOptional, IsBoolean, IsIn, MaxLength } from 'class-validator';

export class CreateCmsThemeSettingDto {
  @IsString()
  @MaxLength(100)
  settingKey: string;

  @IsString()
  settingValue: string;

  @IsString()
  @IsIn(['color', 'font_size', 'spacing', 'radius', 'shadow', 'mode'])
  settingType: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
