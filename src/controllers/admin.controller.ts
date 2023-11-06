import { RequestHandler } from "express";
import Admin from "../models/admin.model";
import bcrypt from "bcrypt";
import { AdminInterface, AdminOptions } from "../interfaces/admin.interface";
import { generateAdminToken } from "../helpers/generate.token";
import mailGenerator from "../utils/mailgenerator";
import { Content } from "mailgen";
import MailService from "../middlewares/mailservice";


export const registerAuthors: RequestHandler = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, typeOfAdmin, address, socialMediaHandle, aboutAuthor, password, } = req.body;

    const validateEmail = await Admin.findOne({ where: { email } });
    if (validateEmail) {
      return res.status(400).json({
        message: "Email already taken!"
      })
    }

    const bcryptPassword = await bcrypt.hash(password, 10);

    const verifyToken = (): string => {
      const digits = '0123456789';
      let uniqueNumber = '';

      while (uniqueNumber.length < 5) {
        const randomDigit = digits.charAt(Math.floor(Math.random() * digits.length));

        if (!uniqueNumber.includes(randomDigit)) {
          uniqueNumber += randomDigit;
        }
      }

      return uniqueNumber;
    };
    const verificationCode = verifyToken();

    const adminObject: AdminOptions = {
      fullName,
      email,
      phoneNumber,
      typeOfAdmin,
      address,
      socialMediaHandle,
      aboutAuthor,
      verifyNumber: verificationCode,
      password: bcryptPassword
    };

    const adminInstance = new Admin(adminObject);
    const generateToken = generateAdminToken(adminInstance.typeOfAdmin,
      adminInstance.socialMediaHandle,
      adminInstance.isAdmin,
      adminInstance.verified);

    adminInstance.token = generateToken;
    await adminInstance.save();

    const emailContent: Content = {
      body: {
        name: `${adminInstance.fullName.split(" ")[0]}`,
        intro: ` Welcome to Page.com! Please verify your account using this code:`,
        action: {
          instructions: `Here's the code to verify your account below:`,
          button: {
            color: '#673ee6',
            text: verificationCode,
            link: "#",
          },
        },
        outro: 'If you did not sign up for our site, you can ignore this email.',
      },
    };
    const emailBody = mailGenerator.generate(emailContent);
    const emailText = mailGenerator.generatePlaintext(emailContent);

    MailService({
      from: {
        address: <string>process.env.EMAIL
      },
      email: email,
      subject: "Verification Code!",
      message: emailText,
      to: email,
      html: emailBody
    });

    //return a success response
    return res.status(201).json({
      message: "Success!",
    })
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "Failed!"
    })
  }
};