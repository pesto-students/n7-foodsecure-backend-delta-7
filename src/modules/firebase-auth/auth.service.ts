import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
// import { UsersService } from '../users/users.service';
import { FirebaseService } from './firebase-validate.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async validateUser(role, request: any = '') {
    const token = this.getToken(request);
    if (token) {
      const uid = await this.firebaseService.validate(token);
      if (uid) {
        return await this.userService.findOneByFirebaseIdRole(uid, role);
      }
    }

    return false;
  }

  getToken = (req) => {
    let token = '';
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      token = bearer[1];
    }
    return token;
  };

  public async create(user) {
    // create the user
    const data = await this.userService.create({ ...user });
    return { data };
  }

  public async login(req) {
    // create the user
    const token = this.getToken(req);
    const userInfo = await this.firebaseService.getUserInfo(token);
    if (!!userInfo) {
      const data = await this.userService.findOneByFirebaseId(userInfo.uid);
      return { role: data.role };
    }
    return { err: 'Something went wrong' };
  }
}
