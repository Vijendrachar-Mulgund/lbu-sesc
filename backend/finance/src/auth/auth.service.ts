import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SignupRequestObject } from '../data/dto';
import { User } from '../data/types';
import { LoginRequestObject } from '../data/dto/auth/login.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createNewUser(signUpBody: SignupRequestObject) {
    try {
      const userExists = await this.userModel.findOne({
        email: signUpBody.email,
      });

      if (userExists) {
        throw new Error('User with ths email already exists!');
      }

      const currentUsersCount =
        await this.userModel.collection.countDocuments();
      const newUsername = `c${+currentUsersCount + 1}`;

      const createdUser = new this.userModel({
        username: newUsername.toString(),
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

  async checkExistingUser(loginBody: LoginRequestObject) {
    try {
      const user = await this.userModel.findOne({ email: loginBody.email });

      if (!user) {
        throw new Error('The User with this email does not exist!');
      }

      return user;
    } catch (error) {
      return error;
    }
  }

  logout() {
    return { message: 'Logout Service' };
  }
}
