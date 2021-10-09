import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
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
  async signUp(@Body() post: PickupRequestDto, @Request() req) {
    const userInfo = await this.authService.getTokenAndUSerInfo(req);
    if (userInfo) {
      const pickupRequest = new PickupRequestDto();
      pickupRequest.number_of_meals = post.number_of_meals;
      pickupRequest.prepared_time = post.prepared_time;
      pickupRequest.expiry_time = post.expiry_time;
      pickupRequest.price = post.price;
      pickupRequest.food_items = post.food_items;
      pickupRequest.userId = 2;
      console.log(pickupRequest);
      return await this.pickupRequestService.create(pickupRequest);
    }
    return '';
  }
}
