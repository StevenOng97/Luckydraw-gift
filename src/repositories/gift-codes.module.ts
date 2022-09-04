import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftCodesRepository } from './gift-codes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GiftCodesRepository])],
  providers: [],
  exports: [TypeOrmModule],
})
export class GiftCodesModule {}
