export interface paymentInterface {
  id: number;
  orderId: number;
  totalAmount: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}