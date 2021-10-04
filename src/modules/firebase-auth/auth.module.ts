import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { FirebaseService } from './firebase-validate.service';

@Module({
  imports: [PassportModule, UsersModule],
  providers: [AuthService, FirebaseService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
