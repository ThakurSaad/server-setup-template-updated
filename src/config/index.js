const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const validateConfig = (config) => {
  if (!config.jwt.secret) {
    throw new Error("Missing JWT secret");
  }
  if (!config.database_url) {
    throw new Error("Missing database URL");
  }
};

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  base_url: process.env.BASE_URL,
  database_url: process.env.MONGO_URL,
  auth_level: {
    user: ["USER", "ADMIN", "SUPER_ADMIN"],
    admin: ["ADMIN", "SUPER_ADMIN"],
    super_admin: ["SUPER_ADMIN"],
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  smtp: {
    smtp_host: process.env.SMTP_HOST,
    smtp_port: process.env.SMTP_PORT,
    smtp_service: process.env.SMTP_SERVICE,
    smtp_mail: process.env.SMTP_MAIL,
    smtp_password: process.env.SMTP_PASSWORD,
    NAME: process.env.SERVICE_NAME,
  },
  cloudinary: {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    cloudinary_url: process.env.CLOUDINARY_URL,
  },
  stripe: {
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  },
  variables: {
    email_temp_image: process.env.EMAIL_TEMP_IMAGE,
    email_temp_text_secondary_color:
      process.env.EMAIL_TEMP_TEXT_SECONDARY_COLOR,
  },
};

// Validate configuration
validateConfig(config);

module.exports = config;
