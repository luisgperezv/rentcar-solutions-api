
const express = require("express");

const turnosRoutes = require("./routes/turnos.routes");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/api/turnos", turnosRoutes);

app.listen(PORT, () => {
    console.log("Servidor RentCar Solutions activo");
    console.log(`http://localhost:${PORT}`);
});
