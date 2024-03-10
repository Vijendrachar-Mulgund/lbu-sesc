import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { SignupRequestObject } from '../data/dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  async signUp(@Req() request: Request, @Res() response: Response) {
    const newUser = await this.authService.signUp(
      request.body as SignupRequestObject,
    );

    const jwt = await this.jwtService.signAsync({ id: newUser.id });

    const user = {
      name: newUser.name,
      email: newUser.email,
      userId: newUser.userId,
    };
    response.status(201).json({
      status: 'success',
      message: 'User created successfully',
      token: jwt,
      user,
    });
  }

  @Post('login')
  login() {
    return this.authService.login();
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }
}
