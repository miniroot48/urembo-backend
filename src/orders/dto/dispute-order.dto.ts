import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';

export class DisputeOrderDto {
  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsOptional()
  @IsObject()
  evidence?: any;
}
