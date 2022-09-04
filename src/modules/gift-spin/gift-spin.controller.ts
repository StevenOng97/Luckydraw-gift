import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateGiftSpinDto } from '../../dtos/create-gift-spin.dto';
import { GiftSpin } from '../../entities/gift-spin.entity';
import { GiftSpinService } from './gift-spin.service';

@Controller('gift-spin')
export class GiftSpinController {
  constructor(private giftSpinService: GiftSpinService) {}

  @Get()
  getGiftSpins(): Promise<GiftSpin[]> {
    return this.giftSpinService.getGiftSpins();
  }

  @Get('/:id')
  getGiftSpinById(@Param('id') id: string): Promise<GiftSpin> {
    return this.giftSpinService.getGiftSpinById(id);
  }

  @Post()
  createGiftSpin(
    @Body() createGiftSpinDto: CreateGiftSpinDto,
  ): Promise<GiftSpin> {
    return this.giftSpinService.createGiftSpin(createGiftSpinDto);
  }

  @Delete('/:id')
  deleteGiftSpin(@Param('id') id: string): Promise<void> {
    return this.giftSpinService.deleteGiftSpin(id);
  }

  @Patch('/:id/status')
  updateGiftSpin(
    @Param('id') id: string,
    @Body() updateGiftDto: any,
  ): Promise<GiftSpin> {
    return this.giftSpinService.updateGiftSpin(id, updateGiftDto);
  }
}
