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
    const token = this.checkUserRole(role, request);
    if (token) {
      const uid = await this.firebaseService.validate(token);
      if (uid) {
        return await this.userService.findOneByFirebaseIdRole(uid, role);
      }
    }

    return false;
  }

  checkUserRole(role, request) {
    return role == request.headers['role'] ? this.getToken(request) : '';
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

  async getTokenAndUSerInfo(req) {
    const token = this.getToken(req);
    if (token) {
      return await this.firebaseService.getUserInfo(token);
    }
    return null;
  }
}
