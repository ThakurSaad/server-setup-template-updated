import multer, { StorageEngine } from "multer";
import { Request } from "express";
import fs from "fs";

const allowedMimeTypes: string[] = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];
const allowedFieldNames: string[] = ["profile_image"];

// Validate if the provided MIME type is in the allowed list
const isValidFileType = (mimetype: string): boolean => {
  return allowedMimeTypes.includes(mimetype);
};

// Create upload directory if it doesn't already exist
const createDirIfNotExists = (uploadPath: string): void => {
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
};

const uploadFile = () => {
  const storage: StorageEngine = multer.diskStorage({
    destination: function (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination?: string) => void,
    ): void {
      const uploadPath = `uploads/${file.fieldname}`;

      createDirIfNotExists(uploadPath);

      if (isValidFileType(file.mimetype)) {
        cb(null, uploadPath);
      } else {
        cb(new Error("Invalid file type"));
      }
    },

    filename: function (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename?: string) => void,
    ): void {
      const name = Date.now() + "-" + file.originalname;

      // Store uploaded file paths in req.uploadedFiles for deletion in case of error or rollback needed
      if (!req.uploadedFiles) {
        req.uploadedFiles = [];
      }
      const filePath = `uploads/${file.fieldname}/${name}`;
      req.uploadedFiles.push(filePath);

      cb(null, name);
    },
  });

  // File filter to validate field names and MIME types before upload
  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile?: boolean) => void,
  ): void => {
    // Allow requests without files (when there's no fieldname)
    if (!file.fieldname) return cb(null, true);

    // Check if the fieldname is in the allowed list
    if (!allowedFieldNames.includes(file.fieldname)) {
      return cb(new Error("Invalid fieldname"));
    }

    // Check if the file type is valid
    if (isValidFileType(file.mimetype)) {
      return cb(null, true);
    } else {
      return cb(new Error("Invalid file type"));
    }
  };

  // Configure multer middleware with storage and file filter, accepting up to 4 image fields
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
  }).fields([{ name: "profile_image", maxCount: 1 }]);

  return upload;
};

module.exports = { uploadFile };
