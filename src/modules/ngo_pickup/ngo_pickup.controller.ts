import { Controller, Request, Get, UseGuards, Param } from '@nestjs/common';
import { AuthService } from '../firebase-auth/auth.service';
import { NGOPickupService } from './ngo_pickup.service';
import { IsNgo } from '../../core/guards/isNgoUser.guard';
import { NGOPickupDto } from './dto/ngo_pickup.dto';

@Controller('ngo-pickup')
export class NGOPickupController {
  constructor(
    private authService: AuthService,
    private ngoPickupService: NGOPickupService,
  ) {}
  @UseGuards(IsNgo)
  @Get('pickup-request/:id')
  async assignPickupRequest(@Param('id') id: number, @Request() req) {
    const userDetail = await this.authService.getUserDetail(req);
    if (userDetail) {
      const ngoPickup = new NGOPickupDto();
      ngoPickup.pickup_request_id = id;
      ngoPickup.userId = userDetail.id;
      return await this.ngoPickupService.create(ngoPickup);
    }
    return '';
  }
}
