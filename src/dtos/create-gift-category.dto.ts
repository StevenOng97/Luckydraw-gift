import { IsNotEmpty } from 'class-validator';
import { Gift } from '../entities/gift.entity';

export class CreateGiftCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  rate: number;

  @IsNotEmpty()
  giftId: Gift;
}
