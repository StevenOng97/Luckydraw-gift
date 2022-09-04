import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftCategoryRepository } from './gift-category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GiftCategoryRepository])],
  providers: [],
  exports: [TypeOrmModule],
})
export class GiftCategoryModule {}
