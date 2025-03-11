import express from "express";
import { EmpresaController } from "../controllers/EmpresaController.js";

const router = express.Router();

router.get("/", EmpresaController.obtenerTodosEmpresa);
router.post("/", EmpresaController.crearEmpresa);

export default router;
