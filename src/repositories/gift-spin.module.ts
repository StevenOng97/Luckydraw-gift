import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftSpinRepository } from './gift-spin.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GiftSpinRepository])],
  providers: [],
  exports: [TypeOrmModule],
})
export class GiftSpinModule {}
