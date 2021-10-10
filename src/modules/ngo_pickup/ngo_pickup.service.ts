import { Injectable, Inject } from '@nestjs/common';

import { NGOPickup } from './ngo_pickup.entity';
import { NGOPICKUP_REPOSITORY } from '../../core/constants';
import { NGOPickupDto } from './dto/ngo_pickup.dto';
import { databaseProviders } from '../../core/database/database.providers';

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

  async findPendingPickupRequests(latLng: any, status: string): Promise<any> {
    const { lat_min, lat_max, lng_min, lng_max } = latLng;
    const query = `select b.id as pickupId, a.name, a.email, b.price, b.prepared_time, b.expiry_time, b.number_of_meals FROM public."Users" as a Inner join public."PickupRequests" as b
   on b."userId" = a.id
   where a."lat" >=${lat_min}
   and a."lng" <= ${lat_max} and 
   a."lng" >=${lng_min} and 
   a."lng"<=${lng_max} and 
   role = 'restaurant' and 
   status='${status}'`;
   console.log("NGO Query : " + query);
    const db = await databaseProviders[0].useFactory();
    const result = await db.query(query);
    if (result && result.length > 0) {
      return result[0];
    }
    return [];
  }
}
