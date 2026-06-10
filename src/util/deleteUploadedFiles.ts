import fs from "fs";
import chalk from "chalk";

const deleteUploadedFiles = (uploadedFiles?: string[]): void => {
  if (!uploadedFiles || uploadedFiles.length === 0) return;

  uploadedFiles.forEach((filePath: string) => {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err: NodeJS.ErrnoException | null) => {
        if (err) {
          console.error(
            chalk.bgRed(`❌ Failed to delete file: ${filePath}`),
            err,
          );
        } else {
          console.log(chalk.bgGreen(`✅ Deleted file: ${filePath}`));
        }
      });
    } else {
      console.error(chalk.bgYellow(`⚠️ File does not exist: ${filePath}`));
    }
  });
};

export = deleteUploadedFiles;
