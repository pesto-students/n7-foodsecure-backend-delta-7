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

  @UseGuards(IsNgo)
  @Get('status-request/:status')
  async getPendingPickUpRequest(
    @Param('status') status: string,
    @Request() req,
  ) {
    const userDetail = await this.authService.getUserDetail(req);
    if (userDetail) {
      const latLng = this.getMaxMinLatLng(userDetail.lat, userDetail.lng);
      return await this.ngoPickupService.findPendingPickupRequests(
        latLng,
        status,
      );
    }
    return '';
  }

  @UseGuards(IsNgo)
  @Get('status-count')
  async getRequestCounts(@Request() req) {
    const res = { pending: 0, completed: 0 };
    const pendingRequest = await this.getPendingPickUpRequest('Pending', req);
    res.pending = this.getCount(pendingRequest);
    const completedRequest = await this.getPendingPickUpRequest(
      'Completed',
      req,
    );
    res.completed = this.getCount(completedRequest);
    return res;
  }

  getCount(data) {
    return data && data.length ? data.length : 0;
  }

  getMaxMinLatLng(lat, lng) {
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    const lat_min = lat - 0.045;
    const lat_max = lat + 0.045;
    const lng_min = lng - 0.045 / Math.cos((lat * Math.PI) / 180);
    const lng_max = lng + 0.045 / Math.cos((lat * Math.PI) / 180);
    return { lat_min, lat_max, lng_min, lng_max };
  }
}
