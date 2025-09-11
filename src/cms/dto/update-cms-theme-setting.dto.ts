import { IsString, IsOptional, IsBoolean, IsIn, MaxLength } from 'class-validator';

export class UpdateCmsThemeSettingDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  settingKey?: string;

  @IsOptional()
  @IsString()
  settingValue?: string;

  @IsOptional()
  @IsString()
  @IsIn(['color', 'font_size', 'spacing', 'radius', 'shadow', 'mode'])
  settingType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
