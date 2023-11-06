export interface AdminInterface {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  typeOfAdmin?: string;
  address?: string;
  token: string;
  socialMediaHandle: string;
  aboutAuthor: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  isAdmin: boolean;
  verified: boolean;
  verifyNumber: string;
  cloudId?: string;
};


export interface AdminOptions {
  fullName: string;
  email: string;
  phoneNumber: string;
  typeOfAdmin: string;
  address: string;
  socialMediaHandle: string;
  aboutAuthor: string;
  password: string;
  verifyNumber: string
}

export interface AdminInput {
  fullName: string;
  email: string;
  phoneNumber: string;
  typeOfAdmin: string;
  address: string;
  socialMediaHandle: string;
  aboutAuthor: string;
  password: string;
}