import {
  Controller,
  Get,
  HttpStatus,
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
import { invoiceStatus } from '../data/enums';

@Controller('api/invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getInvoices(@Req() request: Request, @Res() response: Response) {
    try {
      const studentEmail: string = request.body.token.sub;

      const invoices: Invoice[] =
        await this.invoiceService.getInvoices(studentEmail);

      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Invoices list updated successfully',
        invoices,
      });
    } catch (error) {
      restError(response, error, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  async createInvoice(@Req() request: Request, @Res() response: Response) {
    try {
      const requestBody: Invoice = request.body;

      if (!requestBody) {
        throw new Error('Invalid request body');
      }
      const studentEmail: string = request.body.token.sub;

      const newInvoice: Invoice = await this.invoiceService.createInvoice(
        requestBody,
        studentEmail,
      );

      response.status(HttpStatus.CREATED).json({
        status: 'success',
        message: 'Invoice created successfully',
        invoice: {
          invoiceId: newInvoice.id,
          email: newInvoice.email,
          studentId: newInvoice.studentId,
          amount: newInvoice.amount,
          currency: newInvoice.currency,
          dueDate: newInvoice.dueDate,
          type: newInvoice.type,
          title: newInvoice.title,
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
  @Get('balance')
  async getBalance(@Req() request: Request, @Res() response: Response) {
    try {
      const username: string = request.body.token.sub;

      const invoices: Invoice[] =
        await this.invoiceService.getInvoices(username);

      let balance: number = 0;
      let currency: string = '';

      if (invoices.length === 0) {
        balance = 0;
      } else {
        balance = invoices.reduce((acc, invoice) => {
          if (invoice.status === invoiceStatus.OUTSTANDING) {
            currency = invoice.currency;
            return acc + invoice.amount;
          }
          return acc;
        }, 0);
      }

      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Balance retrieved successfully',
        balance,
        currency,
      });
    } catch (error) {
      restError(response, error, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @Get(':invoiceId')
  async getInvoice(@Req() request: Request, @Res() response: Response) {
    try {
      const studentEmail: string = request.body.token.sub;
      const invoiceId: string = request.params.invoiceId;

      const invoice: Invoice = await this.invoiceService.getInvoiceById(
        invoiceId,
        studentEmail,
      );

      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Invoice retrieved successfully',
        invoice,
      });
    } catch (error) {
      restError(response, error, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @Post('pay/:invoiceId')
  async payInvoice(@Req() request: Request, @Res() response: Response) {
    try {
      const studentEmail: string = request.body.token.sub;
      const invoiceId: string = request.params.invoiceId;

      const invoice = await this.invoiceService.payInvoice(
        invoiceId,
        studentEmail,
      );

      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Invoice paid successfully',
        invoice,
      });
    } catch (error) {
      restError(response, error, HttpStatus.BAD_REQUEST);
    }
  }
}
