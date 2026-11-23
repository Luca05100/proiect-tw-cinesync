import { Router } from "express";
import { parseId, valideazaFilm } from "../validation.js";

const router = Router();

// Etapa 9: datele stau in memorie si se pierd la repornire
let filme = [
  {
    id: 1, titlu: "Interstellar", vazut: true, tip: "film", an: 2014,
    poza: "/posters/interstellar.jpg", nota: 8.7, durata: 169,
    genuri: "SF, Drama", adaugat: "2026-11-10",
    descriere: "Un grup de exploratori calatoreste printr-o gaura de vierme in cautarea unei noi case pentru omenire.",
  },
  {
    id: 2, titlu: "Stranger Things", vazut: false, tip: "serial", an: 2016,
    poza: "/posters/stranger-things.jpg", nota: 8.6, durata: 50, sezoane: 4,
    genuri: "SF, Horror", adaugat: "2026-11-19",
    descriere: "Un grup de copii dintr-un orasel din Indiana da peste forte supranaturale dupa disparitia unui prieten.",
  },
  {
    id: 3, titlu: "Planeta Pamant", vazut: false, tip: "documentar", an: 2006,
    poza: "/posters/planeta-pamant.jpg", nota: 9.4, durata: 50, sezoane: 1,
    genuri: "Natura, Documentar", adaugat: "2026-11-15",
    descriere: "Un tur spectaculos al planetei, de la pesteri adanci la paduri si desert.",
  },
];
let nextId = 4;

// Valideaza :id si cauta elementul, sau raspunde cu 400 / 404
function gasesteIndex(req, res) {
  const id = parseId(req.params.id);
  if (!id) {
    res.status(400).json({ error: "Id invalid" });
    return -1;
  }
  const index = filme.findIndex((f) => f.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Filmul nu exista" });
  }
  return index;
}

// GET /filme
router.get("/", (req, res) => {
  res.json(filme);
});

// GET /filme/:id
router.get("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  res.json(filme[index]);
});

// POST /filme
router.post("/", (req, res) => {
  const { erori, date } = valideazaFilm(req.body ?? {});
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }
  const film = {
    id: nextId++,
    ...date,
    adaugat: new Date().toISOString().slice(0, 10),
  };
  filme.push(film);
  res.status(201).json(film);
});

// PATCH /filme/:id (modificare partiala)
router.patch("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  const { erori, date } = valideazaFilm(req.body ?? {}, { partial: true });
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }
  filme[index] = { ...filme[index], ...date };
  res.json(filme[index]);
});

// DELETE /filme/:id
router.delete("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  filme.splice(index, 1);
  res.status(204).end();
});

export default router;
