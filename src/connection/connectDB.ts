import mongoose from "mongoose";
import config from "../config";

const connectDB = async () => {
  try {
    await mongoose.connect(config.database_url);
    console.log(`DB connection successful! at ${new Date().toLocaleString()}`);
  } catch (err) {
    console.error("DB Connection Error:", err);
    process.exit(1);
  }
};

export = connectDB;
