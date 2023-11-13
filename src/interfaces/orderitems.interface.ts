export interface FullOrderBody {
  orderItemId: number;
  customerId: number;
  totalPrice: number;
  processed: boolean;
  createdAt: Date;
  updatedAt: Date;
}