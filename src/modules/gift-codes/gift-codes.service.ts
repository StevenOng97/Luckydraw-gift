import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGiftCodesDto } from '../../dtos/create-gift-codes.dto';
import { GiftCodes } from '../../entities/gift-codes.entity';
import { GiftCodesRepository } from '../../repositories/gift-codes.repository';

@Injectable()
export class GiftCodesService {
  constructor(
    @InjectRepository(GiftCodesRepository)
    private giftCodesRepository: GiftCodesRepository,
  ) {}

  getGiftCodes(): Promise<GiftCodes[]> {
    return this.giftCodesRepository.getGiftCodes();
  }

  async getGiftCodeById(id: string): Promise<GiftCodes> {
    const found = await this.giftCodesRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  createGiftCode(createGiftCodeDto: CreateGiftCodesDto): Promise<GiftCodes> {
    return this.giftCodesRepository.createGiftCode(createGiftCodeDto);
  }

  async deleteGiftCode(id: string): Promise<void> {
    const result = await this.giftCodesRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateGiftCode(id: string, giftCode: any): Promise<GiftCodes> {
    const gift = await this.getGiftCodeById(id);

    const updatedGiftObj = Object.assign(gift, giftCode);

    await this.giftCodesRepository.save(updatedGiftObj);

    return updatedGiftObj;
  }
}
