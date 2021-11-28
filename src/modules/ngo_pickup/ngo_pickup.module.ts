import { Module } from '@nestjs/common';

import { NGOPickupService } from './ngo_pickup.service';
import { NGOPickupController } from './ngo_pickup.controller';
import { ngoPickupProviders } from './ngo_pickup.providers';
import { AuthModule } from '../firebase-auth/auth.module';
import { PickupRequestsModule } from '../pickup_request/pickup_request.module';

@Module({
  imports: [AuthModule, PickupRequestsModule],
  providers: [NGOPickupService, ...ngoPickupProviders],
  controllers: [NGOPickupController],
})
export class NGOPickupModule {}
