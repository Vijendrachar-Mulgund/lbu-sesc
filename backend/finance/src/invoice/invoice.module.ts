import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { AuthGuard } from '../auth/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceSchema } from '../data/schemas/invoices/invoice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Invoices', schema: InvoiceSchema }]),
  ],
  providers: [InvoiceService, AuthGuard],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
