import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Controller('invoice')
export class InvoiceController {
  @UseGuards(AuthGuard)
  @Get()
  async getInvoices() {
    return 'This is all the invoices!';
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createInvoice() {
    return 'Invoice created!';
  }

  @UseGuards(AuthGuard)
  @Get(':invoiceId')
  async getInvoice(@Param('invoiceId') invoiceId: string) {
    return `This is invoice ${invoiceId}!'`;
  }

  @UseGuards(AuthGuard)
  @Post(':invoiceId/pay')
  async payInvoice(@Param('invoiceId') invoiceId: string) {
    return `Invoice ${invoiceId} paid!`;
  }

  @UseGuards(AuthGuard)
  @Get('/outstandingBalance')
  async checkOutstandingBalance() {
    return 'Outstanding balance checked!';
  }
}
