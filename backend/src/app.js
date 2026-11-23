import express from "express";
import cors from "cors";
import filmeRouter from "./routes/filme.js";

const app = express();

// CORS: browserul blocheaza cererile de pe :5173 catre :3001
// daca serverul nu spune explicit ca le permite
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));

// Transforma corpul JSON al cererii in req.body
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/filme", filmeRouter);

// Ruta necunoscuta
app.use((req, res) => {
  res.status(404).json({ error: "Ruta nu exista" });
});

// Tratare centralizata a erorilor (include JSON invalid din body)
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: status === 500 ? "Eroare interna" : err.message });
});

export default app;
