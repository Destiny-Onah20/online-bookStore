export interface BookInterface {
  id: number;
  adminId: number;
  title: string;
  description: string;
  author: string;
  pdfFile: string;
  pdfCloudId: string;
  bookImage: string;
  category: string;
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
  category: string;
  pdfFile: string;
  pdfCloudId: string;
  cloudId: string;
  price: number;
  stock: number;
}

export interface BookInputInterfaceSchema {
  title: string;
  description: string;
  price: string;
  category: string;
  stock: string;
}