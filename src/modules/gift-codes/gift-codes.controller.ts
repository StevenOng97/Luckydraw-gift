import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CreateGiftCodesDto } from '../../dtos/create-gift-codes.dto';
import { GiftCodes } from '../../entities/gift-codes.entity';
import { GiftCodesService } from './gift-codes.service';
import { Request } from 'express';
import jwt_decode from 'jwt-decode';
import { AccessToken } from 'src/interfaces/i.accessToken';
import { RedeemGiftCodeDto } from '../../dtos/redeem-gift-code.dto';

@Controller('gift-codes')
export class GiftCodesController {
  constructor(private giftCodesService: GiftCodesService) {}

  @Get()
  getGiftCodes(): Promise<GiftCodes[]> {
    return this.giftCodesService.getGiftCodes();
  }

  @Get('/:id')
  getGiftCodeById(@Param('id') id: string): Promise<GiftCodes> {
    return this.giftCodesService.getGiftCodeById(id);
  }

  @Post()
  createGiftCode(
    @Body() createGiftCodeDto: CreateGiftCodesDto,
  ): Promise<GiftCodes> {
    // const accessToken = request.headers['authorization']?.split(' ')[1];
    // const userId = jwt_decode<AccessToken>(accessToken).userId;

    // Logger.verbose(userId);
    // const payload = {
    //   ...createGiftCodeDto,
    //   userId,
    // };
    return this.giftCodesService.createGiftCode(createGiftCodeDto);
  }

  @Put('/:id')
  redeemGiftCode(@Req() request: Request, @Param('id') id: string): any {
    const accessToken = request.headers['authorization']?.split(' ')[1];
    const userId = jwt_decode<AccessToken>(accessToken).userId;

    const redeemGiftCodeDto: RedeemGiftCodeDto = {
      id,
      userId,
    };

    return this.giftCodesService.redeemGiftCode(redeemGiftCodeDto);
  }

  @Delete('/:id')
  deleteGiftCode(@Param('id') id: string): Promise<void> {
    return this.giftCodesService.deleteGiftCode(id);
  }

  @Patch('/:id/status')
  updateGiftCode(
    @Param('id') id: string,
    @Body() updateGiftDto: any,
  ): Promise<GiftCodes> {
    return this.giftCodesService.updateGiftCode(id, updateGiftDto);
  }
}
