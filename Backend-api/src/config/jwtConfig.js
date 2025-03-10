import dotenv from "dotenv";

dotenv.config();

export default {
  secret: process.env.SECURITY_JWT_KEY,
  expiresIn: "1h",
};
