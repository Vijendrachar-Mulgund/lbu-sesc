export type Invoice = {
  id: string;
  studentId: string;
  amount: number;
  currency: 'GBP' | 'INR';
  dueDate: Date;
  type: 'tuition_fees' | 'library_fees';
  material: {
    name: string;
    type: 'book' | 'course' | 'other';
  };
  status: 'outstanding' | 'paid' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
};
