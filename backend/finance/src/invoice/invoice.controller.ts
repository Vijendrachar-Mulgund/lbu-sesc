import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthGuard } from '../auth/auth.guard';
import { Invoice } from '../data/types';
import { restError } from '../utils';
import { InvoiceService } from './invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getInvoices() {
    return 'This is all the invoices!';
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createInvoice(@Req() request: Request, @Res() response: Response) {
    try {
      const requestBody: Invoice = request.body;

      if (!requestBody) {
        throw new Error('Invalid request body');
      }

      const newInvoice = await this.invoiceService.createInvoice(requestBody);

      response.status(HttpStatus.CREATED).json({
        status: 'success',
        invoice: {
          invoiceId: newInvoice.id,
          studentId: newInvoice.studentId,
          amount: newInvoice.amount,
          currency: newInvoice.currency,
          dueDate: newInvoice.dueDate,
          type: newInvoice.type,
          status: newInvoice.status,
          createdAt: newInvoice.createdAt,
          updatedAt: newInvoice.updatedAt,
        },
      });
    } catch (error) {
      return restError(response, error, HttpStatus.BAD_REQUEST);
    }
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
