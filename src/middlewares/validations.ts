import { ZodError, ZodType, z } from "zod";
import { userInputInterface } from "../interfaces/users.interface";
import { RequestHandler } from "express";
import { AdminInput, AdminLoginInput } from "../interfaces/admin.interface";
import { BookInputInterfaceSchema } from "../interfaces/books.interface";
import { billingInputInterface } from "../interfaces/billing.interface";

const schemaObj = z.object({
  body: z.object({}),
  query: z.object({}),
  params: z.object({}),
});

export const validateUserInput = (schema: ZodType<userInputInterface>): RequestHandler => async (req, res, next) => {
  try {
    schemaObj.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    await schema.parseAsync(req.body);
    next();
  } catch (error: any) {
    if (error instanceof ZodError) {
      const theExpectedZodErrorMessage = error.errors.map((error) => error.message);

      return res.status(400).json({
        message: theExpectedZodErrorMessage[0]
      })
    }
    return res.status(500).json({
      message: error.message,
      status: "zod Failed",
    })
  }
}


export const validateAdmin = (schema: ZodType<AdminInput>): RequestHandler => async (req, res, next) => {
  try {
    schemaObj.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    await schema.parseAsync(req.body);
    next();
  } catch (error: any) {
    if (error instanceof ZodError) {
      const theExpectedZodErrorMessage = error.errors.map((error) => error.message);

      return res.status(400).json({
        message: theExpectedZodErrorMessage[0]
      })
    }
    return res.status(500).json({
      message: error.message,
      status: "zod Failed",
    })
  }
}

export const validateAdminLogin = (schema: ZodType<AdminLoginInput>): RequestHandler => async (req, res, next) => {
  try {
    schemaObj.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    await schema.parseAsync(req.body);
    next();
  } catch (error: any) {
    if (error instanceof ZodError) {
      const theExpectedZodErrorMessage = error.errors.map((error) => error.message);

      return res.status(400).json({
        message: theExpectedZodErrorMessage[0]
      })
    }
    return res.status(500).json({
      message: error.message,
      status: "zod Failed",
    })
  }
}


export const validateBookInput = (schema: ZodType<BookInputInterfaceSchema>): RequestHandler => async (req, res, next) => {
  try {
    schemaObj.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    await schema.parseAsync(req.body);
    next();
  } catch (error: any) {
    if (error instanceof ZodError) {
      const theExpectedZodErrorMessage = error.errors.map((error) => error.message);

      return res.status(400).json({
        message: theExpectedZodErrorMessage[0]
      })
    }
    return res.status(500).json({
      message: error.message,
      status: "zod Failed",
    })
  }
}

export const validateBilling = (schema: ZodType<billingInputInterface>): RequestHandler => async (req, res, next) => {
  try {
    schemaObj.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    await schema.parseAsync(req.body);
    next();
  } catch (error: any) {
    if (error instanceof ZodError) {
      const theExpectedZodErrorMessage = error.errors.map((error) => error.message);

      return res.status(400).json({
        message: theExpectedZodErrorMessage[0]
      })
    }
    return res.status(500).json({
      message: error.message,
      status: "zod Failed",
    })
  }
}