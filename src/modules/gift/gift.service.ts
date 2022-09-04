import { BaseService } from './../../services/base.service';
import { GiftCategoryRepository } from './../../repositories/gift-category.repository';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGiftDto } from '../../dtos/create-gift.dto';
import { Gift } from '../../entities/gift.entity';
import { GiftRepository } from '../../repositories/gift.repository';
import { LoggerService } from '../../services/logger.service';

@Injectable()
export class GiftService extends BaseService<Gift, GiftRepository> {
  constructor(
    @InjectRepository(GiftRepository)
    private giftRepository: GiftRepository,
    @InjectRepository(GiftCategoryRepository)
    private giftCategoryRepository: GiftCategoryRepository,
    private loggerService: LoggerService,
  ) {
    super(giftRepository, loggerService);
  }

  getGifts(): Promise<Gift[]> {
    return this.giftRepository.getGifts();
  }

  async getGiftById(id: string): Promise<Gift> {
    const found = await this.giftRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createGift(createGiftDto: CreateGiftDto): Promise<Gift> {
    const category = await this.giftCategoryRepository.findOne(
      createGiftDto.giftCategoryId,
    );

    Logger.verbose(category);

    if (!category) {
      //throw error
    }

    return this.store({ giftCategory: category });
    // return this.giftRepository.createGift(createGiftDto);
  }

  async deleteGift(id: string): Promise<void> {
    const result = await this.giftRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateGift(id: string, updateGiftObj: any): Promise<Gift> {
    const gift = await this.getGiftById(id);

    const updatedGiftObj = Object.assign(gift, updateGiftObj);

    await this.giftRepository.save(updatedGiftObj);

    return updatedGiftObj;
  }
}
