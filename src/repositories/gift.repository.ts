import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { Gift } from '../entities/gift.entity';
import { CreateGiftDto } from '../dtos/create-gift.dto';

@EntityRepository(Gift)
export class GiftRepository extends Repository<Gift> {
  async getGifts(): Promise<Gift[]> {
    const query = this.createQueryBuilder('gift');

    try {
      const gifts = await query.getMany();
      return gifts;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createGift(createGiftDto: CreateGiftDto): Promise<Gift> {
    const { giftSpinId } = createGiftDto;

    const gift = this.create({});

    await this.save(gift);
    return gift;
  }
}
