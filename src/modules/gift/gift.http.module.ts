import { GiftCategory } from './../../entities/gift-category.entity';
import { GiftCategoryRepository } from './../../repositories/gift-category.repository';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '../../guards/auth.guard';
import { GiftController } from './gift.controller';
import { GiftRepository } from '../../repositories/gift.repository';
import { GiftService } from './gift.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GiftSpinService } from '../gift-spin/gift-spin.service';
import { GiftModule } from '../../repositories/gift.module';
import { GiftSpinModule } from '../../repositories/gift-spin.module';
import { GiftCategoryModule } from '../../repositories/gift-category.module';
import { AuthClientModule } from '../auth-client/auth-client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GiftCategoryRepository]),
    GiftCategoryModule,
    GiftModule,
    GiftSpinModule,
    AuthClientModule,
  ],
  controllers: [GiftController],
  providers: [
    GiftService,
    GiftSpinService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class GiftHttpModule {}
