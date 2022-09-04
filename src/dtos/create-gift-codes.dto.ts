import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateGiftCodesDto {
  @IsNotEmpty()
  value: string;

  @IsBoolean()
  @IsNotEmpty()
  isValid: boolean;

  @IsNotEmpty()
  userId: string;
}
