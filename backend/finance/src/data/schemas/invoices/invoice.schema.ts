import * as mongoose from 'mongoose';

export const InvoiceSchema = new mongoose.Schema({
  username: {
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
