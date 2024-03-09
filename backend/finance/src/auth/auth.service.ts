import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto } from 'src/utils/dto/signup.dto';
import { User } from 'src/utils/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  signUp(signupDto: SignupDto) {
    this.userModel.collection.insertOne({
      name: signupDto.name,
      email: signupDto.email,
      password: signupDto.password,
    });
  }

  login() {
    return { message: 'Login Service' };
  }

  logout() {
    return { message: 'Logout Service' };
  }
}
