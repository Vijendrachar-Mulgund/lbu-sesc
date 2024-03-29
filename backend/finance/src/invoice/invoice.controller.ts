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

@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getInvoices(@Req() request: Request, @Res() response: Response) {
    try {
      const username: string = request.body.token.id;

      const invoices: Invoice[] =
        await this.invoiceService.getInvoices(username);

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
  @Post('create')
  async createInvoice(@Req() request: Request, @Res() response: Response) {
    try {
      const requestBody: Invoice = request.body;

      if (!requestBody) {
        throw new Error('Invalid request body');
      }
      const username: string = request.body.token.id;

      const newInvoice: Invoice = await this.invoiceService.createInvoice(
        requestBody,
        username,
      );

      response.status(HttpStatus.CREATED).json({
        status: 'success',
        message: 'Invoice created successfully',
        invoice: {
          invoiceId: newInvoice.id,
          username: newInvoice.username,
          amount: newInvoice.amount,
          currency: newInvoice.currency,
          dueDate: newInvoice.dueDate,
          type: newInvoice.type,
          material: newInvoice.material,
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
      const username: string = request.body.token.id;

      const invoices: Invoice[] =
        await this.invoiceService.getInvoices(username);

      let balance: number = 0;

      if (invoices.length === 0) {
        balance = 0;
      } else {
        balance = invoices.reduce((acc, invoice) => {
          if (invoice.status === 'outstanding') {
            return acc + invoice.amount;
          }
          return acc;
        }, 0);
      }

      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Balance retrieved successfully',
        balance,
      });
    } catch (error) {
      restError(response, error, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @Get(':invoiceId')
  async getInvoice(@Req() request: Request, @Res() response: Response) {
    try {
      const username: string = request.body.token.id;
      const invoiceId: string = request.params.invoiceId;

      const invoice: Invoice = await this.invoiceService.getInvoiceById(
        invoiceId,
        username,
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
  @Post(':invoiceId/pay')
  async payInvoice(@Req() request: Request, @Res() response: Response) {
    try {
      const username: string = request.body.token.id;
      const invoiceId: string = request.params.invoiceId;

      const invoice = await this.invoiceService.payInvoice(invoiceId, username);

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
