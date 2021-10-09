import { Injectable, Inject } from '@nestjs/common';

import { PickupRequest } from './pickup_request.entity';
import { PICKUP_REQUEST_REPOSITORY } from '../../core/constants';
import { PickupRequestDto } from './dto/pickup_request.dto';

@Injectable()
export class PickupRequestService {
  constructor(
    @Inject(PICKUP_REQUEST_REPOSITORY)
    private readonly postRepository: typeof PickupRequest,
  ) {}

  async create(post: PickupRequestDto): Promise<PickupRequest> {
    return await this.postRepository.create<PickupRequest>({
      number_of_meals: post.number_of_meals,
      prepared_time: post.prepared_time,
      expiry_time: post.expiry_time,
      price: post.price,
      food_items: post.food_items,
      userId: post.userId,
    } as PickupRequest);
  }
}
