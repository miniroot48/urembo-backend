import { IsString, IsOptional, IsInt, Min, Max, IsEnum } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  serviceId: string;

  @IsString()
  appointmentId: string;

  @IsString()
  clientId: string;

  @IsString()
  vendorId: string;

  @IsOptional()
  @IsString()
  staffId?: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  reviewText?: string;
}
