import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { SignupRequestObject } from '../data/dto';
import { LoginRequestObject } from '../data/dto';
import { comparePassword, restError } from '../utils';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  async signup(@Req() request: Request, @Res() response: Response) {
    try {
      const newUser = await this.authService.createNewUser(
        request.body as SignupRequestObject,
      );

      if (newUser instanceof Error) {
        throw new Error(newUser?.message);
      }

      const jwt = await this.jwtService.signAsync({ id: newUser.id });

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
      const existingUser = await this.authService.checkExistingUser(
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

      const jwt = await this.jwtService.signAsync({ id: existingUser.id });

      const user = {
        name: existingUser.name,
        email: existingUser.email,
        username: existingUser.username,
      };

      return response.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        token: jwt,
        user,
      });
    } catch (error) {
      return restError(response, error, HttpStatus.UNAUTHORIZED);
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() request: Request, @Res() response: Response) {
    return response.status(200).json({
      status: 'success',
      message: 'User profile retrieved successfully',
    });
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }
}
