import Users from "../models/users.model";
import dotenv from "dotenv";
dotenv.config();
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import jsonwebtoken from 'jsonwebtoken';
import { RequestHandler } from "express";
import { UsersInterface } from "../interfaces/users.interface";
import MailService from "../middlewares/mailservice";
import { Content } from "mailgen";
import mailGenerator from "../utils/mailgenerator";


export const singUpUser: RequestHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //check for email existence
    const verifyEmail = await Users.findOne({ where: { email } });
    if (verifyEmail) {
      return res.status(400).json({
        message: "Email already taken!"
      })
    }
    // hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    const userData: UsersInterface = {
      user_id: uuidv4(),
      username,
      email,
      password: hashPassword
    };
    //create an instance of the data 
    const userInstanceData = new Users(userData);
    // generate a token for the user
    const generateToken = jsonwebtoken.sign({
      user_id: userInstanceData.user_id,
      email: userInstanceData.email
    }, <string>process.env.SECRET_KEY, {
      expiresIn: '1d'
    });
    //save the token to the database 
    userInstanceData.token = generateToken;
    await userInstanceData.save();

    const verifyToken = () => {
      const digits = '0123456789';
      let uniqueNumber = '';

      while (uniqueNumber.length < 6) {
        const randomDigit = digits.charAt(Math.floor(Math.random() * digits.length));

        if (!uniqueNumber.includes(randomDigit)) {
          uniqueNumber += randomDigit;
        }
      }

      return uniqueNumber;
    };
    const verificationCode = verifyToken();

    userInstanceData.verifyNumber = verificationCode;
    await userInstanceData.save();

    //send an email to the user who signed up!

    const emailContent: Content = {
      body: {
        name: `${userData.username}`,
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
    res.status(500).json({
      message: error.message,
      status: "Failed",
    })
  }
};


export const verifyUser: RequestHandler = async (req, res) => {
  try {
    const { verificationCode } = req.body;
    const theVerificationCode = await Users.findOne({ where: { verifyNumber: verificationCode } });
    if (!theVerificationCode) {
      return res.status(400).json({
        message: "Invalid verification code!"
      })
    }

    theVerificationCode.verify = true;
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


export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password!"
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid email or password!"
      })
    }

    const verifiedUser = user.verify;
    if (!verifiedUser) {
      return res.status(400).json({
        message: "Please verify your email first!"
      })
    };
    const generateToken = jsonwebtoken.sign({
      user_id: user.user_id,
      email: user.email
    }, <string>process.env.SECRET_KEY, {
      expiresIn: '1d'
    });
    user.token = generateToken;
    await user.save();

    return res.status(200).json({
      message: "Success!",
      token: user.token
    });

  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      status: "Failed",
    })
  }
}


