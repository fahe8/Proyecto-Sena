import express from "express";
import { CanchaController } from "../controllers/CanchaController.js";

const router = express.Router();

router.get("/", CanchaController.obtenerTodasCanchas);
router.get("/:id", CanchaController.obtenerCanchaPorId);
router.post("/", CanchaController.crearCancha);

export default router;
