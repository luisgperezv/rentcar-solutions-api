
const servicio = require("../services/turnos.service");

function obtenerTurnos(req, res) {
    const turnos = servicio.obtenerTurnos();

    return res.status(200).json(turnos);
}

function obtenerTurnoPorId(req, res) {
    const id = Number(req.params.id);

    const turno = servicio.obtenerTurnoPorId(id);

    if (!turno) {
        return res.status(404).json({
            mensaje: "Solicitud no encontrada"
        });
    }

    return res.status(200).json(turno);
}

function crearTurno(req, res) {

    const { cliente, vehiculo, fecha,
            precioBase, prioritario } = req.body || {};

    if (
        typeof cliente !== "string" ||
        !cliente.trim() ||
        typeof vehiculo !== "string" ||
        !vehiculo.trim() ||
        typeof fecha !== "string" ||
        !fecha.trim() ||
        typeof precioBase !== "number" ||
        !Number.isFinite(precioBase) ||
        precioBase <= 0
    ) {
        return res.status(400).json({
            mensaje: "Datos obligatorios incompletos o invalidos"
        });
    }

    if (
        prioritario !== undefined &&
        typeof prioritario !== "boolean"
    ) {
        return res.status(400).json({
            mensaje: "Prioritario debe ser true o false"
        });
    }

    const nuevoTurno = servicio.crearTurno(req.body);

    return res.status(201).json(nuevoTurno);
}

module.exports = {
    obtenerTurnos,
    obtenerTurnoPorId,
    crearTurno
};
