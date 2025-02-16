import express from "express";
import { ReservaController } from "../controllers/ReservaController.js";

const router = express.Router();

router.get("/", ReservaController.obtenerTodasReservas);
router.post("/", ReservaController.crearReserva);

export default router;
