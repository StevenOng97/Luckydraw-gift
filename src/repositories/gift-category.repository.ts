import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { GiftCategory } from '../entities/gift-category.entity';
import { CreateGiftCategoryDto } from '../dtos/create-gift-category.dto';

@EntityRepository(GiftCategory)
export class GiftCategoryRepository extends Repository<GiftCategory> {
  async getGiftCategories(): Promise<GiftCategory[]> {
    const query = this.createQueryBuilder('giftcategory');

    try {
      const giftCategories = await query.getMany();
      return giftCategories;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createGiftCategory(
    createGiftSpinDto: CreateGiftCategoryDto,
  ): Promise<GiftCategory> {
    const { name, rate } = createGiftSpinDto;

    const giftCategory = this.create({
      rate,
      name,
    });

    await this.save(giftCategory);
    return giftCategory;
  }
}
