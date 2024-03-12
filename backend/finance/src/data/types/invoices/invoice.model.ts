export type Invoice = {
  id: string;
  studentId: string;
  amount: number;
  currency: 'GBP' | 'INR';
  dueDate: Date;
  type: 'tuition_fees' | 'library_fines';
  status: 'outstanding' | 'paid' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
};
