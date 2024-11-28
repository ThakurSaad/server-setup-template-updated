const multer = require("multer");
const fs = require("fs");

const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

const isValidFileType = (mimetype) => allowedMimeTypes.includes(mimetype);

const createDirIfNotExists = (uploadPath) => {
  if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
};

const uploadFile = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let uploadPath = "";

      if (file.fieldname === "profile_image")
        uploadPath = "uploads/images/profile";
      else uploadPath = "uploads";

      createDirIfNotExists(uploadPath);

      if (isValidFileType(file.mimetype)) {
        cb(null, uploadPath);
      } else {
        cb(new Error("Invalid file type"));
      }
    },
    filename: function (req, file, cb) {
      const name = Date.now() + "-" + file.originalname;
      cb(null, name);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedFieldNames = ["profile_image"];

    // Allow requests without files (when there's no fieldname)
    if (!file.fieldname) return cb(null, true);

    // Check if the fieldname is valid
    if (!allowedFieldNames.includes(file.fieldname))
      return cb(new Error("Invalid fieldname"));

    // Check if the file type is valid
    if (isValidFileType(file.mimetype)) return cb(null, true);
    else return cb(new Error("Invalid file type"));
  };

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
  }).fields([{ name: "profile_image", maxCount: 1 }]);

  return upload;
};

module.exports = { uploadFile };
