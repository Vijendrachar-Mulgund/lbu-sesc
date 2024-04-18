export interface Invoice {
  _id: string;
  studentId: string;
  email: string;
  amount: number;
  currency: string;
  dueDate: Date;
  type: string;
  title: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
