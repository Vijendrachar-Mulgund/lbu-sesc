import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Invoice } from '../data/types';
import { invoiceStatus } from '../data/enums';

@Injectable()
export class InvoiceService {
  constructor(@InjectModel('Invoices') private invoiceModel: Model<Invoice>) {}

  createInvoice(invoice: Invoice, studentId: string): Promise<Invoice> {
    const dueDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    const newInvoice = new this.invoiceModel({
      studentId: studentId,
      amount: invoice.amount,
      currency: invoice.currency,
      type: invoice.type,
      status: invoiceStatus.OUTSTANDING,
      material: invoice.material,
      dueDate: dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.invoiceModel.create(newInvoice);
  }

  getInvoices(studentId: string): Promise<Invoice[]> {
    return this.invoiceModel.find({ studentId: studentId }).exec();
  }

  getInvoiceById(invoiceId: string, username: string): Promise<Invoice> {
    return this.invoiceModel.findOne({ _id: invoiceId, username }).exec();
  }

  payInvoice(invoiceId: string, username: string): Promise<Invoice> {
    const updatedInvoice = this.invoiceModel
      .findOneAndUpdate(
        { _id: invoiceId, username },
        { status: invoiceStatus.PAID, updatedAt: new Date() },
        { new: true },
      )
      .exec();
    return updatedInvoice;
  }
}
