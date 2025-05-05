// delete file if error occurs during file upload

const fs = require("fs");

const deleteUploadedFiles = (uploadedFiles) => {
  if (!uploadedFiles) return;

  uploadedFiles.forEach((filePath) => {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Failed to delete file: ${filePath}`, err);
        else console.log(`✅ Deleted file: ${filePath}`);
      });
    }
  });
};

module.exports = deleteUploadedFiles;
