import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftCategoryController } from './gift-category.controller';
import { GiftCategoryRepository } from '../../repositories/gift-category.repository';
import { GiftCategoryService } from './gift-category.service';
import { GiftModule } from '../../repositories/gift.module';
import { GiftCategoryModule } from '../../repositories/gift-category.module';

@Module({
  imports: [GiftModule, GiftCategoryModule],
  controllers: [GiftCategoryController],
  providers: [GiftCategoryService],
})
export class GiftCategoryHttpModule {}
