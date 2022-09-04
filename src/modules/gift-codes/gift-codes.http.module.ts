import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftCodesController } from './gift-codes.controller';
import { GiftCodesRepository } from '../../repositories/gift-codes.repository';
import { GiftCodesService } from './gift-codes.service';
import { GiftCodesModule } from '../../repositories/gift-codes.module';

@Module({
  imports: [GiftCodesModule],
  controllers: [GiftCodesController],
  providers: [GiftCodesService],
})
export class GiftCodesHttpModule {}
