import { Module } from '@nestjs/common';

import { NGOPickupService } from './ngo_pickup.service';
import { NGOPickupController } from './ngo_pickup.controller';
import { ngoPickupProviders } from './ngo_pickup.providers';

@Module({
  providers: [NGOPickupService, ...ngoPickupProviders],
  controllers: [NGOPickupController],
})
export class NGOPickupModule {}
