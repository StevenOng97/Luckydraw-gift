import { IsNotEmpty } from 'class-validator';
import { GiftSpin } from '../entities/gift-spin.entity';

export class CreateGiftDto {
  @IsNotEmpty()
  giftSpinId: GiftSpin;
}
