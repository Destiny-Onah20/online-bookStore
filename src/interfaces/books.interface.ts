export interface BookInterface {
  id: number;
  adminId: number;
  title: string;
  description: string;
  author: string;
  bookImage: string;
  cloudId: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookInputInterface {
  title: string;
  adminId: number;
  description: string;
  author: string;
  bookImage: string;
  cloudId: string;
  price: number;
  stock: number;
}

export interface BookInputInterfaceSchema {
  title: string;
  description: string;
  price: string;
  stock: string;
}