import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  providers: [InvoiceService, AuthGuard],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
