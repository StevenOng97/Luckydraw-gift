import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftService } from '../gift/gift.service';
import { GiftSpinController } from './gift-spin.controller';
import { GiftSpinRepository } from '../../repositories/gift-spin.repository';
import { GiftSpinService } from './gift-spin.service';
import { GiftRepository } from '../../repositories/gift.repository';
import { GiftSpinModule } from '../../repositories/gift-spin.module';
import { GiftModule } from '../../repositories/gift.module';
import { AuthClientModule } from '../auth-client/auth-client.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../../guards/auth.guard';

@Module({
  imports: [GiftSpinModule, GiftModule, AuthClientModule],
  controllers: [GiftSpinController],
  providers: [
    GiftSpinService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class GiftSpinHttpModule {}
