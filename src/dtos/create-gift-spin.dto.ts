import { IsNotEmpty } from 'class-validator';
import { Gift } from '../entities/gift.entity';

export class CreateGiftSpinDto {
  @IsNotEmpty()
  giftId: string;

  @IsNotEmpty()
  userId: String;
}
