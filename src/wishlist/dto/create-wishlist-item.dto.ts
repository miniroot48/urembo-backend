import { IsString, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateWishlistItemDto {
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @IsEnum(['product', 'service'])
  itemType: 'product' | 'service';
}
