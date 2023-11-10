export interface OrderItems {
  id: number;
  customerId: number;
  adminId: number;
  bookId: number;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface orderDataObject {
  customerId: number,
  adminId: number;
  bookId: number;
  quantity: number;
  price: number;
}