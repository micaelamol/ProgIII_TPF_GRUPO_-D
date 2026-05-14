import express from "express";
import dotenv from "dotenv";
import especialidadesRouter from "./routers/v1/especialidadesRouter.js";
import obrasSocialesRouter from "./routers/v1/obrasSocialesRouter.js"; 

dotenv.config();

const app = express();
app.use(express.json());

// Rutas
app.use("/api/v1/especialidades", especialidadesRouter);
app.use("/api/v1/obras_sociales", obrasSocialesRouter); 

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ estado: "OK", msg: "Servidor funcionando" });
});

// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});