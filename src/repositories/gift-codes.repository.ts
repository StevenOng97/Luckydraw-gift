import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { GiftCodes } from '../entities/gift-codes.entity';
import { CreateGiftCodesDto } from '../dtos/create-gift-codes.dto';

@EntityRepository(GiftCodes)
export class GiftCodesRepository extends Repository<GiftCodes> {
  async getGiftCodes(): Promise<GiftCodes[]> {
    const query = this.createQueryBuilder('giftcode');

    try {
      const giftCodes = await query.getMany();
      return giftCodes;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createGiftCode(
    createGiftCodeDto: CreateGiftCodesDto,
  ): Promise<GiftCodes> {
    const { value, isValid } = createGiftCodeDto;

    const giftCode = this.create({
      value,
      isValid,
      // user,
    });

    await this.save(giftCode);
    return giftCode;
  }
}
