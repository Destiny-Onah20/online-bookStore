export interface paymentInterface {
  id: number;
  orderId: number;
  totalAmount: number;
  reference: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}