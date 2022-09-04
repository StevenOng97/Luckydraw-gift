import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftRepository } from './gift.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GiftRepository])],
  providers: [],
  exports: [TypeOrmModule],
})
export class GiftModule {}
