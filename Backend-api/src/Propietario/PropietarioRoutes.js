import express from "express";
import { PropietarioController } from "./PropietarioController.js";

const router = express.Router();

router.post("/registrar", PropietarioController.registrarPropietario);
router.put("/actualizar/:id", PropietarioController.actualizarPropietario);

export default router;
