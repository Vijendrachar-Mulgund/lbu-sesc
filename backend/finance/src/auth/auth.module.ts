import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { hashPassword } from '../utils';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from '../data/schemas/';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', async function () {
            const user = this as any;
            user.password = await hashPassword(user.password);
          });
          return schema;
        },
      },
    ]),

    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
