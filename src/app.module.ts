import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftHttpModule } from './modules/gift/gift.http.module';
import { GiftCategoryHttpModule } from './modules/gift-category/gift-category.http.module';
import { GiftSpinHttpModule } from './modules/gift-spin/gift-spin.http.module';
import { GiftCodesHttpModule } from './modules/gift-codes/gift-codes.http.module';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admparin',
      database: 'luckydraw-gift', // Modify here
      autoLoadEntities: true,
      synchronize: true,
      migrations: ['./database/migrations/*.ts'],
      cli: {
        migrationsDir: './database/migrations',
      },
    }),
    LoggerModule,
    GiftHttpModule,
    GiftCategoryHttpModule,
    GiftSpinHttpModule,
    GiftCodesHttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
