import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GiftService } from '../gift/gift.service';
import { Gift } from '../../entities/gift.entity';
import { GiftRepository } from '../../repositories/gift.repository';
import { CreateGiftSpinDto } from '../../dtos/create-gift-spin.dto';
import { GiftSpin } from '../../entities/gift-spin.entity';
import { GiftSpinRepository } from '../../repositories/gift-spin.repository';
import { BaseService } from '../../services/base.service';
import { LoggerService } from '../../services/logger.service';

@Injectable()
export class GiftSpinService extends BaseService<GiftSpin, GiftSpinRepository> {
  constructor(
    @InjectRepository(GiftSpinRepository)
    private giftSpinRepository: GiftSpinRepository,
    @InjectRepository(Gift)
    private giftService: GiftService,
    private loggerService: LoggerService,
  ) {
    super(giftSpinRepository, loggerService);
  }

  getGiftSpins(): Promise<GiftSpin[]> {
    return this.giftSpinRepository.getGiftSpins();
  }

  async getGiftSpinById(id: string): Promise<GiftSpin> {
    const found = await this.giftSpinRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  createGiftSpin(createGiftSpinDto: CreateGiftSpinDto): Promise<GiftSpin> {
    const { giftId } = createGiftSpinDto;
    const gift = this.giftService.getGiftById(giftId);

    if (gift) {
      return this.giftSpinRepository.createGiftSpin(gift);
    }
  }

  async deleteGiftSpin(id: string): Promise<void> {
    const result = await this.giftSpinRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateGiftSpin(id: string, giftSpin: any): Promise<GiftSpin> {
    const gift = await this.getGiftSpinById(id);

    const updatedGiftObj = Object.assign(gift, giftSpin);

    await this.giftSpinRepository.save(updatedGiftObj);

    return updatedGiftObj;
  }
}
