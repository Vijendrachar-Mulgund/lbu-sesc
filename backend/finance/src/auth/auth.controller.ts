import {
  Controller,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { SignupRequestObject } from '../data/dto';
import { comparePassword, restError } from '../utils';
import { User } from '../data/types';
import { AuthGuard } from './auth.guard';

@Controller('api/auth')
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

      const jwt = await this.jwtService.signAsync({ sub: newUser.email });

      const user = {
        id: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        studentId: newUser.studentId,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
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
        request.body.email,
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
        sub: existingUser.email,
      });

      const user = {
        id: existingUser.id,
        firstname: existingUser.firstname,
        lastname: existingUser.lastname,
        email: existingUser.email,
        studentId: existingUser.studentId,
        createdAt: existingUser.createdAt,
        updatedAt: existingUser.updatedAt,
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

  @Put('update/:studentEmail')
  async update(@Req() request: Request, @Res() response: Response) {
    try {
      await this.authService.updateUser(
        request.params.studentEmail,
        request.body,
      );

      return response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'User updated successfully',
      });
    } catch (error) {
      return restError(response, error, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @Post('authenticate')
  async authenticate(@Req() request: Request, @Res() response: Response) {
    try {
      const existingUser: User = await this.authService.checkExistingUser(
        request.body.token.sub,
      );

      const user = {
        id: existingUser?.id,
        firstname: existingUser.firstname,
        lastname: existingUser.lastname,
        email: existingUser.email,
        studentId: existingUser.studentId,
        createdAt: existingUser.createdAt,
        updatedAt: existingUser.updatedAt,
      };

      return response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'User authenticated successfully',
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
