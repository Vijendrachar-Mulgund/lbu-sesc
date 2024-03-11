import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConnectionUrl } from './utils';
import { InvoiceModule } from './invoice/invoice.module';

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
    InvoiceModule,
  ],
})
export class AppModule {}
