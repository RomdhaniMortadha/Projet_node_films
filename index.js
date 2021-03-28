require("./db");
const express = require("express");
const films = require("./route/Films");
const seance = require("./route/Seance");
const reservation = require("./route/Reservation");
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use("/api/films", films);
app.use("/api/seance", seance);
app.use("/api/reservation", reservation);

app.listen(port, () => console.log("Server on", port));
