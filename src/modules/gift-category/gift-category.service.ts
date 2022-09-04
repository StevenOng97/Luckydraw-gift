import { BaseService } from './../../services/base.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGiftCategoryDto } from '../../dtos/create-gift-category.dto';
import { GiftCategory } from '../../entities/gift-category.entity';
import { GiftCategoryRepository } from '../../repositories/gift-category.repository';
import { LoggerService } from '../../services/logger.service';

@Injectable()
export class GiftCategoryService extends BaseService<
  GiftCategory,
  GiftCategoryRepository
> {
  constructor(
    @InjectRepository(GiftCategoryRepository)
    private giftCategoryRepository: GiftCategoryRepository,
    private loggerService: LoggerService,
  ) {
    super(giftCategoryRepository, loggerService);
  }

  getGiftCategories(): Promise<GiftCategory[]> {
    return this.giftCategoryRepository.getGiftCategories();
  }

  async getGiftCategoryById(id: string): Promise<GiftCategory> {
    const found = await this.giftCategoryRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async deleteGiftCategory(id: string): Promise<void> {
    const result = await this.giftCategoryRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateGiftCategory(
    id: string,
    giftCategory: any,
  ): Promise<GiftCategory> {
    const gift = await this.getGiftCategoryById(id);

    const updatedGiftObj = Object.assign(gift, giftCategory);

    await this.giftCategoryRepository.save(updatedGiftObj);

    return updatedGiftObj;
  }
}
