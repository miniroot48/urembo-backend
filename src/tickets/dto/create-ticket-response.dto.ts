import { IsString, IsOptional, IsBoolean, IsObject } from 'class-validator';

export class CreateTicketResponseDto {
  @IsString()
  message: string;

  @IsOptional()
  @IsBoolean()
  isInternal?: boolean;

  @IsOptional()
  @IsObject()
  attachments?: any;
}
