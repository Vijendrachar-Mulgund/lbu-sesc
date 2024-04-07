import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Invoice } from '../data/types';
import { invoiceStatus } from '../data/enums';

@Injectable()
export class InvoiceService {
  constructor(@InjectModel('Invoices') private invoiceModel: Model<Invoice>) {}

  getInvoices(studentEmail: string): Promise<Invoice[]> {
    return this.invoiceModel.find({ email: studentEmail }).exec();
  }

  createInvoice(invoice: Invoice, studentEmail: string): Promise<Invoice> {
    const dueDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    const newInvoice = new this.invoiceModel({
      studentId: invoice.studentId,
      email: studentEmail,
      amount: invoice.amount,
      currency: invoice.currency,
      type: invoice.type,
      status: invoiceStatus.OUTSTANDING,
      title: invoice.title,
      dueDate: dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.invoiceModel.create(newInvoice);
  }

  getInvoiceById(invoiceId: string, studentEmail: string): Promise<Invoice> {
    return this.invoiceModel
      .findOne({ _id: invoiceId, email: studentEmail })
      .exec();
  }

  payInvoice(invoiceId: string, studentEmail: string): Promise<Invoice> {
    const updatedInvoice = this.invoiceModel
      .findOneAndUpdate(
        { _id: invoiceId, email: studentEmail },
        { status: invoiceStatus.PAID, updatedAt: new Date() },
        { new: true },
      )
      .exec();
    return updatedInvoice;
  }
}
