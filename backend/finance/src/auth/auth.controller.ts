import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { SignupRequestObject } from '../data/dto';
import { LoginRequestObject } from '../data/dto';
import { comparePassword, restError } from '../utils';
import { User } from '../data/types';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  async signup(@Req() request: Request, @Res() response: Response) {
    try {
      const newUser: User = await this.authService.createNewUser(
        request.body as SignupRequestObject,
      );

      if (newUser instanceof Error) {
        throw new Error(newUser?.message);
      }

      const jwt = await this.jwtService.signAsync({ id: newUser.username });

      const user = {
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
      };

      response.status(HttpStatus.CREATED).json({
        status: 'success',
        message: 'User created successfully',
        token: jwt,
        user,
      });
    } catch (error) {
      return restError(response, error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Req() request: Request, @Res() response: Response) {
    try {
      const existingUser: User = await this.authService.checkExistingUser(
        request.body as LoginRequestObject,
      );

      if (!existingUser?.email) {
        throw new Error('Invalid username or password password');
      }

      const isPasswordValid = await comparePassword(
        request.body.password,
        existingUser.password,
      );

      if (!isPasswordValid) {
        throw new Error('Invalid username or password password');
      }

      const jwt = await this.jwtService.signAsync({
        id: existingUser.username,
      });

      const user = {
        name: existingUser.name,
        email: existingUser.email,
        username: existingUser.username,
      };

      return response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'User logged in successfully',
        token: jwt,
        user,
      });
    } catch (error) {
      return restError(response, error, HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }
}
