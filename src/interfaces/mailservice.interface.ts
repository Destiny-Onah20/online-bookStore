interface mailInterface {
  email: string;
  to: string
  subject: string;
  from: {
    name?: string,
    address: string
  },
  message: string;
  html: string
}

export default mailInterface;