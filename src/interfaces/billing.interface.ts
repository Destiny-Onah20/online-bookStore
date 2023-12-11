export interface BillingInterface {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  user: number;
  country: string;
  state: string;
  town: string;
  homeAddress: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface billingDataInterface {
  fullName: string;
  email: string;
  phoneNumber: string;
  user: number;
  country: string;
  state: string;
  town: string;
  homeAddress: string;
};

export interface billingInputInterface {
  fullName: string;
  email: string;
  phoneNumber: string;
  country: string;
  state: string;
  town: string;
  homeAddress: string;
};