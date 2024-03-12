import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Invoice } from '../data/types';

@Injectable()
export class InvoiceService {
  constructor(@InjectModel('Invoices') private invoiceModel: Model<Invoice>) {}

  createInvoice(invoice: Invoice): Promise<Invoice> {
    const dueDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    const newInvoice = new this.invoiceModel({
      studentId: invoice.studentId,
      amount: invoice.amount,
      currency: invoice.currency,
      type: invoice.type,
      status: 'outstanding',
      dueDate: dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.invoiceModel.create(newInvoice);
  }
}
