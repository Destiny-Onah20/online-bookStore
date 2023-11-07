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


export const loginAdmin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validEmailAddress = await Admin.findOne({ where: { email } });
    if (!validEmailAddress) {
      return res.status(404).json({
        message: "Email address not found!"
      })
    }

    const validPasswordMatch = await bcrypt.compare(password, validEmailAddress.password);
    if (!validPasswordMatch) {
      return res.status(404).json({
        message: "Incorrect password!"
      })
    };

    const verifiedAdmin = validEmailAddress.verified;
    if (!verifiedAdmin) {
      return res.status(400).json({
        message: "Please verify your email address to continue..."
      })
    };

    const generateNewToken = await generateAdminToken(validEmailAddress.typeOfAdmin,
      validEmailAddress.socialMediaHandle,
      validEmailAddress.isAdmin,
      validEmailAddress.verified);
    validEmailAddress.token = generateNewToken;
    await validEmailAddress.save();

    return res.status(200).json({
      message: "Login successful!",
      token: generateNewToken
    })
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "Failed!"
    })
  }
};


export const verifyAdmin: RequestHandler = async (req, res) => {
  try {
    const { verificationCode } = req.body;
    const theVerificationCode = await Admin.findOne({ where: { verifyNumber: verificationCode } });
    if (!theVerificationCode) {
      return res.status(400).json({
        message: "Invalid verification code!"
      })
    }

    theVerificationCode.verified = true;
    await theVerificationCode.save();

    return res.status(201).json({
      message: "Success!",
    })

  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      status: "Failed",
    })
  }
};