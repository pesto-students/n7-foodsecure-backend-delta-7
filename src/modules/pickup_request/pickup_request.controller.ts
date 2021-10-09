import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import { AuthService } from '../firebase-auth/auth.service';
import { PickupRequestService } from './pickup_request.service';
import { IsRestaurant } from '../../core/guards/isRestaurant.guard';
import { PickupRequestDto } from './dto/pickup_request.dto';

@Controller('pickup-requests')
export class PickupRequestController {
  constructor(
    private authService: AuthService,
    private pickupRequestService: PickupRequestService,
  ) {}

  @UseGuards(IsRestaurant)
  @Post('add')
  async add(@Body() post: PickupRequestDto, @Request() req) {
    const userDetail = await this.authService.getUserDetail(req);
    if (userDetail) {
      const pickupRequest = new PickupRequestDto();
      pickupRequest.number_of_meals = post.number_of_meals;
      pickupRequest.prepared_time = post.prepared_time;
      pickupRequest.expiry_time = post.expiry_time;
      pickupRequest.price = post.price;
      pickupRequest.food_items = post.food_items;
      pickupRequest.userId = userDetail.id;
      return await this.pickupRequestService.create(pickupRequest);
    }
    return '';
  }

  @UseGuards(IsRestaurant)
  @Get('count')
  async getPickupRequestByID(@Request() req) {
    const userDetail = await this.authService.getUserDetail(req);
    if (userDetail) {
      const pendingCount = await this.pickupRequestService.getCountByStatus(
        userDetail.id,
        'Pending',
      );
      const completedCount = await this.pickupRequestService.getCountByStatus(
        userDetail.id,
        'Completed',
      );
      return { completedCount, pendingCount };
    }
    return '';
  }
}
