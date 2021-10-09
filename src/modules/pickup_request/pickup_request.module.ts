import { Module, forwardRef } from '@nestjs/common';

import { PickupRequestService } from './pickup_request.service';
import { PickupRequestController } from './pickup_request.controller';
import { pickupRequestProviders } from './pickup_request.providers';
import { AuthModule } from '../firebase-auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [PickupRequestService, ...pickupRequestProviders],
  controllers: [PickupRequestController],
})
export class PickupRequestsModule {}
