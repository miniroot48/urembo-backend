import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateQcStatusDto {
  @IsString()
  @IsNotEmpty()
  qcStatus: string;
}
