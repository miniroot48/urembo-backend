import { IsString, IsOptional, IsBoolean, IsObject } from 'class-validator';

export class CreateLiveMessageDto {
  @IsString()
  sessionId: string;

  @IsString()
  userId: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  messageType?: 'text' | 'emoji' | 'system' | 'product_highlight';

  @IsOptional()
  @IsBoolean()
  isModerator?: boolean;

  @IsOptional()
  @IsObject()
  metadata?: any;

  @IsOptional()
  @IsString()
  productId?: string;

  @IsOptional()
  @IsString()
  replyToMessageId?: string;
}
