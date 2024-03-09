import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConnectionUrl } from './utils/config/mongodb';

@Module({
  imports: [
    // Environment variables configuration
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      isGlobal: true,
    }),

    // Database connection configuration
    MongooseModule.forRoot(databaseConnectionUrl()),

    // Module Imports
    AuthModule,
    StudentModule,
  ],
})
export class AppModule {}
