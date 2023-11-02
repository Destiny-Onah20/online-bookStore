import Mailgen from 'mailgen';

const mailGenerator = new Mailgen({
  theme: "salted",
  product: {
    name: "Page.com",
    logo: "Page",
    link: "#"
  }
});

export default mailGenerator;