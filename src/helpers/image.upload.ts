import { RequestHandler, Request, Response, NextFunction } from "express";
import Cloudinary from "../utils/cloudinary";
import { UploadedFile } from "express-fileupload";


export const uploadBookImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.files?.bookImage as UploadedFile[];

    if (!file) {
      return res.status(404).json({
        message: "No file Uploaded!"
      })
    }
    const uploads = Array.isArray(file) ? file : [file];
    for (const file of uploads) {
      const result = await Cloudinary.uploader.upload(file.tempFilePath);

      req.body.bookImage = result.secure_url;
      req.body.cloudId = result.public_id;
    }
    next();
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    })
  }
};

export const uploadBookPdf: RequestHandler = async (req, res, next) => {
  try {
    const file = req.files?.pdfFile as UploadedFile[];

    if (!file) {
      next();
    }
    const uploads = Array.isArray(file) ? file : [file];
    for (const file of uploads) {
      const isPdfFile = (filename: string): boolean => {
        return filename.endsWith(".pdf")
      };
      const filename = file.tempFilePath;
      if (!isPdfFile(filename)) {
        return res.status(400).json({
          message: "Please you are only allowed to upload a pdf file here."
        })
      }
      const result = await Cloudinary.uploader.upload(filename, (err, payload) => {
        if (err) {
          return res.status(400).json({
            message: err.message
          })
        } else {
          return payload
        }
      });

      req.body.pdfFile = result.secure_url;
      req.body.pdfCloudId = result.public_id;

    }
    next();

  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    })
  }
}