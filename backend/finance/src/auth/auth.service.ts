import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SignupRequestObject } from '../data/dto';
import { User } from '../data/types';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async signUp(signUpBody: SignupRequestObject) {
    try {
      const currentUsersCount =
        await this.userModel.collection.countDocuments();
      const newUserId = `c${+currentUsersCount + 1}`;

      const createdUser = new this.userModel({
        userId: newUserId.toString(),
        name: signUpBody.name,
        email: signUpBody.email,
        password: signUpBody.password,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return await createdUser.save();
    } catch (error) {
      return error;
    }
  }

  login() {
    return { message: 'Login Service' };
  }

  logout() {
    return { message: 'Logout Service' };
  }
}
