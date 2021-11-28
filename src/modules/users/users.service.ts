import { Injectable, Inject } from '@nestjs/common';

import { User } from './user.entity';
import { USER_REPOSITORY } from '../../core/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: User): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async findOneByFirebaseIdRole(id: string, role: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: { firebase_user_id: id, role },
    });
  }

  async findOneByFirebaseId(id: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: { firebase_user_id: id },
    });
  }
}
