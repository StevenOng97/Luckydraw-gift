import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { CreateGiftDto } from '../../dtos/create-gift.dto';
import { Gift } from '../../entities/gift.entity';
import { GiftService } from './gift.service';

@Controller('gift')
export class GiftController {
  constructor(private giftService: GiftService) {}

  @Get()
  getGifts(): Promise<Gift[]> {
    return this.giftService.getGifts();
  }

  @Get('/:id')
  getGiftById(@Param('id') id: string): Promise<Gift> {
    return this.giftService.getGiftById(id);
  }

  @Post()
  creatGift(@Body() createGiftDto: CreateGiftDto): Promise<Gift> {
    return this.giftService.createGift(createGiftDto);
  }

  @Delete('/:id')
  deleteGift(@Param('id') id: string): Promise<void> {
    return this.giftService.deleteGift(id);
  }

  @Patch('/:id/status')
  updateGift(
    @Param('id') id: string,
    @Body() updateGiftDto: any,
  ): Promise<Gift> {
    return this.giftService.updateGift(id, updateGiftDto);
  }
}
