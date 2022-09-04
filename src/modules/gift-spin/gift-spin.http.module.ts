import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftService } from '../gift/gift.service';
import { GiftSpinController } from './gift-spin.controller';
import { GiftSpinRepository } from '../../repositories/gift-spin.repository';
import { GiftSpinService } from './gift-spin.service';
import { GiftRepository } from '../../repositories/gift.repository';
import { GiftSpinModule } from '../../repositories/gift-spin.module';
import { GiftModule } from '../../repositories/gift.module';

@Module({
  imports: [
    GiftSpinModule,
    GiftModule
  ],
  controllers: [GiftSpinController],
  providers: [GiftSpinService, GiftService],
})
export class GiftSpinHttpModule {}
