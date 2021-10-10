import { Injectable, Inject } from '@nestjs/common';

import { PickupRequest } from './pickup_request.entity';
import { PICKUP_REQUEST_REPOSITORY } from '../../core/constants';
import { PickupRequestDto } from './dto/pickup_request.dto';
import { User } from '../users/user.entity';
import { databaseProviders } from '../../core/database/database.providers';

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

  async findAll(id): Promise<PickupRequest[]> {
    return await this.postRepository.findAll({
      where: { id },
      include: [{ model: User }],
    });
  }

  // async findAll(id): Promise<PickupRequest[]> {
  //   return await this.postRepository.findAll({
  //     where: { id }
  //   });
  // }

  async findOne(id): Promise<PickupRequest> {
    return await this.postRepository.findOne({
      where: { id },
      include: [{ model: User }],
    });
  }

  async findByUserId(id): Promise<any> {
    const query = `select a.number_of_meals, a.prepared_time, a.expiry_time, a.price, a.status, c.email, c.name FROM public."PickupRequests" as a left JOIN public."NGOPickups" as b
    ON a.id = b.pickup_request_id left JOIN public."Users" as c
    On b."userId" = c.id where a."userId"=${id};
     `;
    const db = await databaseProviders[0].useFactory();
    const result = await db.query(query);
    if (result && result.length > 0) {
      return result[0];
    }
    return [];
  }

  async update(id, data) {
    const [numberOfAffectedRows, [updatedPost]] =
      await this.postRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );
    return { numberOfAffectedRows, updatedPost };
  }

  async updateStatus(id) {
    const post = await this.findOne(id);
    const pickupRequest = {
      number_of_meals: post.number_of_meals,
      prepared_time: post.prepared_time,
      expiry_time: post.expiry_time,
      price: post.price,
      food_items: post.food_items,
      userId: post.userId,
      status: 'Completed',
    };
    return await this.update(id, pickupRequest);
  }

  async getCountByStatus(id, status) {
    return await this.postRepository.count({
      where: { userId: id, status },
    });
  }
}
