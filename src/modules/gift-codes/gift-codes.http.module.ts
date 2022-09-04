import { Module } from '@nestjs/common';
import { GiftCodesController } from './gift-codes.controller';
import { GiftCodesService } from './gift-codes.service';
import { GiftCodesModule } from '../../repositories/gift-codes.module';
import { AuthGuard } from '../../guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthClientModule } from '../auth-client/auth-client.module';

@Module({
  imports: [GiftCodesModule, AuthClientModule],
  controllers: [GiftCodesController],
  providers: [
    GiftCodesService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class GiftCodesHttpModule {}
