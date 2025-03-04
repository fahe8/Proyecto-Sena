import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(process.env.SECURITY_AUTH_KEY),
});
