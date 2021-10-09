import { Injectable, Inject } from '@nestjs/common';

import { NGOPickup } from './ngo_pickup.entity';
import { NGOPICKUP_REPOSITORY } from '../../core/constants';
import { NGOPickupDto } from './dto/ngo_pickup.dto';

@Injectable()
export class NGOPickupService {
  constructor(
    @Inject(NGOPICKUP_REPOSITORY)
    private readonly postRepository: typeof NGOPickup,
  ) {}

  async create(post: NGOPickupDto): Promise<NGOPickup> {
    return await this.postRepository.create<NGOPickup>({
      pickup_request_id: post.pickup_request_id,
      userId: post.userId,
    } as NGOPickup);
  }
}
