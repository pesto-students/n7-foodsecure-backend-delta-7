import { PickupRequest } from './pickup_request.entity';
import { PICKUP_REQUEST_REPOSITORY } from '../../core/constants';

export const pickupRequestProviders = [
  {
    provide: PICKUP_REQUEST_REPOSITORY,
    useValue: PickupRequest,
  },
];
