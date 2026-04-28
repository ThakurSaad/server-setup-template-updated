const { default: status } = require("http-status");
const fs = require("fs").promises;

const ApiError = require("../error/ApiError");

const unlinkFile = async (filePath) => {
  try {
    if (!filePath)
      throw new ApiError(status.BAD_REQUEST, "File path is required");

    await fs.access(filePath).catch((error) => {
      throw error;
    });

    await fs.unlink(filePath);
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = unlinkFile;
