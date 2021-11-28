import { Controller, Body, Post, Get, Request } from '@nestjs/common';

import { AuthService } from './auth.service';
import { FirebaseService } from './firebase-validate.service';
import { UserDto } from '../users/dto/user.dto';
import { FirebaseUserDto } from '../users/dto/firebase-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
  ) {}

  @Get('login')
  async login(@Request() req) {
    return await this.authService.login(req);
  }

  @Post('signup')
  async signUp(@Body() data: FirebaseUserDto) {
    const userInfo = await this.firebaseService.getUserInfo(data.token);
    if (userInfo) {
      const user = new UserDto();
      user.email = userInfo.email;
      user.firebase_user_id = userInfo.user_id;
      user.lat = data.lat;
      user.lng = data.lng;
      user.name = data.name;
      user.role = data.role;
      return await this.authService.create(user);
    }
    return { err: 'Something went wrong' };
  }
}
