import { IsString, IsObject, IsNotEmpty } from 'class-validator';

export class UpdatePaymentDetailsDto {
  @IsObject()
  @IsNotEmpty()
  paymentAccountDetails: any;

  @IsString()
  @IsNotEmpty()
  paymentAccountType: string;
}
