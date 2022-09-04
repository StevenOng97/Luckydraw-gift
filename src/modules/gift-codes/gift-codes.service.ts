import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../services/base.service';
import { CreateGiftCodesDto } from '../../dtos/create-gift-codes.dto';
import { GiftCodes } from '../../entities/gift-codes.entity';
import { GiftCodesRepository } from '../../repositories/gift-codes.repository';
import { LoggerService } from '../../services/logger.service';
import { RedeemGiftCodeDto } from '../../dtos/redeem-gift-code.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class GiftCodesService extends BaseService<
  GiftCodes,
  GiftCodesRepository
> {
  constructor(
    @Inject('AUTH_CLIENT')
    private readonly client: ClientProxy,
    @InjectRepository(GiftCodesRepository)
    private giftCodesRepository: GiftCodesRepository,
    private loggerService: LoggerService,
  ) {
    super(giftCodesRepository, loggerService);
  }

  getGiftCodes(): Promise<GiftCodes[]> {
    return this.giftCodesRepository.getGiftCodes();
  }

  async getGiftCodeById(id: string): Promise<GiftCodes> {
    const found = await this.giftCodesRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Code with ID "${id}" not found`);
    }

    return found;
  }

  createGiftCode(createGiftCodeDto: CreateGiftCodesDto): Promise<GiftCodes> {
    return this.giftCodesRepository.createGiftCode(createGiftCodeDto);
  }

  async redeemGiftCode(
    redeemGiftCodeDto: RedeemGiftCodeDto,
  ): Promise<GiftCodes> {
    const giftCode = await this.getGiftCodeById(redeemGiftCodeDto.id);

    if (!giftCode.isValid) {
      throw new BadRequestException('Code đã được sử dụng.');
    }

    giftCode.redeemBy = redeemGiftCodeDto.userId;
    giftCode.redeemAt = new Date();
    giftCode.isValid = false;

    return await giftCode.save();
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
