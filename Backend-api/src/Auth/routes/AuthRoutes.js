import express from "express";
import { AuthController } from "../controllers/AuthController.js";

const router = express.Router();
router.post("/usuario/registrar", AuthController.registrar);

export default router;
