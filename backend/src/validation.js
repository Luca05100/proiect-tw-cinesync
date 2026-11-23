// Validare pe server: datele de la client nu sunt niciodata de incredere.
// Valorile trebuie sa fie identice cu TIPURI din frontend/src/constants.js
export const TIPURI = ["film", "serial", "documentar"];

const TITLU_MAX = 100;
const AN_MIN = 1900;

// partial = true pentru PATCH (se verifica doar campurile trimise)
export function valideazaFilm(body, { partial = false } = {}) {
  const erori = [];
  const date = {};

  if (!partial || body.titlu !== undefined) {
    if (typeof body.titlu !== "string" || body.titlu.trim() === "") {
      erori.push("titlu este obligatoriu");
    } else if (body.titlu.trim().length > TITLU_MAX) {
      erori.push(`titlu are maximum ${TITLU_MAX} de caractere`);
    } else {
      date.titlu = body.titlu.trim();
    }
  }

  if (!partial || body.tip !== undefined) {
    const t = body.tip ?? "film";
    if (!TIPURI.includes(t)) {
      erori.push(`tip trebuie sa fie unul din: ${TIPURI.join(", ")}`);
    } else {
      date.tip = t;
    }
  }

  if (!partial || body.an !== undefined) {
    const anCurent = new Date().getFullYear();
    if (!Number.isInteger(body.an) || body.an < AN_MIN || body.an > anCurent) {
      erori.push(`an trebuie sa fie un numar intreg intre ${AN_MIN} si ${anCurent}`);
    } else {
      date.an = body.an;
    }
  }

  if (body.vazut !== undefined) {
    if (typeof body.vazut !== "boolean") {
      erori.push("vazut trebuie sa fie true sau false");
    } else {
      date.vazut = body.vazut;
    }
  } else if (!partial) {
    date.vazut = false;
  }

  // Campuri text optionale
  for (const camp of ["poza", "descriere", "genuri"]) {
    if (body[camp] !== undefined) {
      if (typeof body[camp] !== "string") {
        erori.push(`${camp} trebuie sa fie text`);
      } else if (camp === "poza" && body.poza.trim() !== "" &&
          !/^(https?:\/\/|\/)\S+$/i.test(body.poza.trim())) {
        erori.push("poza trebuie sa fie o adresa valida");
      } else if (body[camp].trim() !== "") {
        date[camp] = body[camp].trim();
      }
    }
  }

  // Campuri numerice optionale
  for (const camp of ["nota", "durata", "sezoane"]) {
    if (body[camp] !== undefined) {
      if (typeof body[camp] !== "number" || !Number.isFinite(body[camp]) || body[camp] < 0) {
        erori.push(`${camp} trebuie sa fie un numar pozitiv`);
      } else {
        date[camp] = body[camp];
      }
    }
  }

  return { erori, date };
}

// Id-urile din adresa vin ca text; se accepta doar numere intregi pozitive
export function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}
