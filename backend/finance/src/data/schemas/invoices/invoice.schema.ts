import * as mongoose from 'mongoose';
import { currencies, invoiceStatus } from '../../enums';

export const InvoiceSchema = new mongoose.Schema({
  studentId: {
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
  },
  material: {
    type: Object,
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
