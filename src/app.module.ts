import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';
// import { PickupRequestsModule } from './modules/pickup_request/pickup_request.module';
import { AuthModule } from './modules/firebase-auth/auth.module';
// import { NGOPickupModule } from './modules/ngo_pickup/ngo_pickup.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    // PickupRequestsModule,
    AuthModule,
    // NGOPickupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
