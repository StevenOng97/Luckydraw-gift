import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateGiftCodesDto } from '../../dtos/create-gift-codes.dto';
import { GiftCodes } from '../../entities/gift-codes.entity';
import { GiftCodesService } from './gift-codes.service';

@Controller('gift-codes')
export class GiftCodesController {
  constructor(private giftCodesService: GiftCodesService) {}

  @Get()
  getGiftCodes(): Promise<GiftCodes[]> {
    return this.giftCodesService.getGiftCodes();
  }

  @Get('/:id')
  getGiftCodeById(@Param('id') id: string): Promise<GiftCodes> {
    return this.giftCodesService.getGiftCodeById(id);
  }

  @Post()
  createGiftCode(
    @Body() createGiftCodeDto: CreateGiftCodesDto,
  ): Promise<GiftCodes> {
    return this.giftCodesService.createGiftCode(createGiftCodeDto);
  }

  @Delete('/:id')
  deleteGiftCode(@Param('id') id: string): Promise<void> {
    return this.giftCodesService.deleteGiftCode(id);
  }

  @Patch('/:id/status')
  updateGiftCode(
    @Param('id') id: string,
    @Body() updateGiftDto: any,
  ): Promise<GiftCodes> {
    return this.giftCodesService.updateGiftCode(id, updateGiftDto);
  }
}
