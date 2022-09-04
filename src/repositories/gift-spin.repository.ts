import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { GiftSpin } from '../entities/gift-spin.entity';
import { CreateGiftSpinDto } from '../dtos/create-gift-spin.dto';

@EntityRepository(GiftSpin)
export class GiftSpinRepository extends Repository<GiftSpin> {
  async getGiftSpins(): Promise<GiftSpin[]> {
    const query = this.createQueryBuilder('giftspin');

    try {
      const giftSpins = await query.getMany();
      return giftSpins;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createGiftSpin(gift: any): Promise<GiftSpin> {
    // const { giftId } = createGiftSpinDto;

    const giftSpin = this.create({
      gift,
    });

    await this.save(giftSpin);
    return giftSpin;
  }
}
