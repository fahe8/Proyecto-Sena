import express from "express";
import { UsuarioController } from "../controllers/UsuarioController.js";

const router = express.Router();

router.get("/", UsuarioController.obtenerTodosUsuarios);
router.post("/registrar", UsuarioController.registrar);
router.put("/actualizar", UsuarioController.actualizarUsuario);

export default router;
