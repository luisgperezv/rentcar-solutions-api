
const express = require("express");

const router = express.Router();

const controlador = require("../controllers/turnos.controller");

router.get("/", controlador.obtenerTurnos);

router.get("/:id", controlador.obtenerTurnoPorId);

router.post("/", controlador.crearTurno);

module.exports = router;
