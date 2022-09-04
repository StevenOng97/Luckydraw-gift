import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateGiftCategoryDto } from '../../dtos/create-gift-category.dto';
import { GiftCategory } from '../../entities/gift-category.entity';
import { GiftCategoryService } from './gift-category.service';

@Controller('gift-category')
export class GiftCategoryController {
  constructor(private giftCategoryService: GiftCategoryService) {}

  @Get()
  getGiftCategories(): Promise<GiftCategory[]> {
    return this.giftCategoryService.getGiftCategories();
  }

  @Get('/:id')
  getGiftCategoryById(@Param('id') id: string): Promise<GiftCategory> {
    return this.giftCategoryService.getGiftCategoryById(id);
  }

  @Post()
  createGiftCategory(
    @Body() createGiftCategoryDto: CreateGiftCategoryDto,
  ): Promise<GiftCategory> {
    return this.giftCategoryService.createGiftCategory(createGiftCategoryDto);
  }

  @Delete('/:id')
  deleteGiftCategory(@Param('id') id: string): Promise<void> {
    return this.giftCategoryService.deleteGiftCategory(id);
  }

  @Patch('/:id/status')
  updateGiftCategory(
    @Param('id') id: string,
    @Body() updateGiftCategoryDto: any,
  ): Promise<GiftCategory> {
    return this.giftCategoryService.updateGiftCategory(
      id,
      updateGiftCategoryDto,
    );
  }
}
