import * as mongoose from 'mongoose';
import { currencies, invoiceStatus, invoiceTypes } from '../../enums';

export const InvoiceSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    enum: [currencies.GBP, currencies.INR],
    default: currencies.GBP,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: [invoiceTypes.TUITION, invoiceTypes.BOOK],
  },
  title: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    enum: [
      invoiceStatus.OUTSTANDING,
      invoiceStatus.PAID,
      invoiceStatus.CANCELLED,
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Invoice = mongoose.model('Invoice', InvoiceSchema);
