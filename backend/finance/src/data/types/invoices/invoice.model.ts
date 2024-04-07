export type Invoice = {
  id: string;
  studentId: string;
  email: string;
  amount: number;
  currency: 'GBP' | 'INR';
  dueDate: Date;
  type: 'TUITION' | 'BOOK' | 'OTHER';
  title: string;
  status: 'OUTSTANDING' | 'PAID' | 'CANCELLED';
  createdAt: Date;
  updatedAt: Date;
};
