import { Controller, Request, Get, UseGuards, Param } from '@nestjs/common';
import { AuthService } from '../firebase-auth/auth.service';
import { NGOPickupService } from './ngo_pickup.service';
import { IsNgo } from '../../core/guards/isNgoUser.guard';
import { NGOPickupDto } from './dto/ngo_pickup.dto';
import { PickupRequestService } from '../pickup_request/pickup_request.service';

@Controller('ngo-pickup')
export class NGOPickupController {
  constructor(
    private authService: AuthService,
    private ngoPickupService: NGOPickupService,
    private pickupRequestService: PickupRequestService,
  ) {}
  @UseGuards(IsNgo)
  @Get('pickup-request/:id')
  async assignPickupRequest(@Param('id') id: number, @Request() req) {
    const userDetail = await this.authService.getUserDetail(req);

    if (userDetail) {
      const ngoPickup = new NGOPickupDto();
      ngoPickup.pickup_request_id = id;
      ngoPickup.userId = userDetail.id;
      const result = await this.ngoPickupService.create(ngoPickup);
      await this.pickupRequestService.updateStatus(id);
      return result;
    }
    return '';
  }
}
