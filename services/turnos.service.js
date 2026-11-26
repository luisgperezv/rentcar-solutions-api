const turnos = [];

let siguienteId = 1;

const N = 4;
const porcentajeRecargo = N * 2;

function obtenerTurnos() {
    return turnos;
}

function obtenerTurnoPorId(id) {
    return turnos.find(turno => turno.id === id);
}

function crearTurno(datos) {

    const recargo = datos.prioritario
        ? datos.precioBase * (porcentajeRecargo / 100)
        : 0;

    const nuevoTurno = {
        id: siguienteId++,
        cliente: datos.cliente,
        vehiculo: datos.vehiculo,
        fecha: datos.fecha,
        precioBase: datos.precioBase,
        prioritario: datos.prioritario === true,
        recargo: recargo,
        totalPagar: datos.precioBase + recargo
    };

    turnos.push(nuevoTurno);

    return nuevoTurno;
}

module.exports = {
    obtenerTurnos,
    obtenerTurnoPorId,
    crearTurno
};
