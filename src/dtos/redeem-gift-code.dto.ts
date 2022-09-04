import { IsNotEmpty } from 'class-validator';

export class RedeemGiftCodeDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  userId: string;
}
