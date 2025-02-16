import express from "express";
import { AuthController } from "../controllers/AuthController.js";
import { authMiddleware } from "../../middlewares/AuthMiddleware.js";

const router = express.Router();
router.post("/iniciarsesion", AuthController.iniciarSesion);
router.get("/protegida", authMiddleware, AuthController.rutaProtegida);
router.get("/cerrarsesion", authMiddleware, AuthController.cerrarSesion);

export default router;
