import { IsNotEmpty } from 'class-validator';

export class CreateGiftDto {
  @IsNotEmpty()
  giftCategoryId: string;
}
