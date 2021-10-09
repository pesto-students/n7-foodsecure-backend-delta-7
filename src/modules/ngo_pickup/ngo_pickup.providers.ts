import { NGOPickup } from './ngo_pickup.entity';
import { NGOPICKUP_REPOSITORY } from '../../core/constants';

export const ngoPickupProviders = [
  {
    provide: NGOPICKUP_REPOSITORY,
    useValue: NGOPickup,
  },
];
