import express from "express";
import { EmpresaController } from "../controllers/EmpresaController.js";

const router = express.Router();

router.get("/", EmpresaController.obtenerTodosEmpresa);
router.post("/", EmpresaController.crearEmpresa);
router.put("/", EmpresaController.actualizarEmpresa);

export default router;
