import { useEffect, useState } from "react";
import FilmList from "./components/FilmList.jsx";
import "./App.css";

const FILME_INITIALE = [
  {
    id: 1,
    titlu: "Interstellar",
    vazut: true,
    tip: "film",
  },
  {
    id: 2,
    titlu: "Stranger Things",
    vazut: false,
    tip: "serial",
  },
  {
    id: 3,
    titlu: "Planeta Pământ",
    vazut: false,
    tip: "documentar",
  },
];

const CHEIE_TEMA = "cinesync-theme";

/* Preferința salvată are prioritate față de tema sistemului. */
function temaInitiala() {
  try {
    const temaSalvata = localStorage.getItem(CHEIE_TEMA);

    if (temaSalvata === "dark" || temaSalvata === "light") {
      return temaSalvata;
    }
  } catch {
    // Continuăm și dacă stocarea locală nu este disponibilă.
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function App() {
  const [filme, setFilme] = useState(FILME_INITIALE);
  const [tema, setTema] = useState(temaInitiala);

  /* Aplicăm tema inclusiv la prima afișare. */
  useEffect(() => {
    document.documentElement.dataset.theme = tema;

    try {
      localStorage.setItem(CHEIE_TEMA, tema);
    } catch {
      // Comutarea funcționează și fără salvarea preferinței.
    }
  }, [tema]);

  function handleToggle(id) {
    setFilme((filmeAnterioare) =>
      filmeAnterioare.map((film) =>
        film.id === id
          ? { ...film, vazut: !film.vazut }
          : film
      )
    );
  }

  function handleDelete(id) {
    setFilme((filmeAnterioare) =>
      filmeAnterioare.filter((film) => film.id !== id)
    );
  }

  function handleTema() {
    setTema((temaAnterioara) =>
      temaAnterioara === "dark" ? "light" : "dark"
    );
  }

  const deVazut = filme.filter((film) => !film.vazut).length;
  const vizionate = filme.length - deVazut;

  return (
    <>
      <header className="app-header">
        <h1>CineSync</h1>

        <p>Filmele tale. Serialele tale. În ritmul tău.</p>

        <span className="app-count">
          {filme.length} în listă · {deVazut} de văzut
        </span>

        <button
          type="button"
          className="theme-toggle"
          onClick={handleTema}
          aria-label="Mod întunecat"
          aria-pressed={tema === "dark"}
          title={
            tema === "dark"
              ? "Activează modul luminos"
              : "Activează modul întunecat"
          }
        >
          <span aria-hidden="true">
            {tema === "dark" ? "☀" : "☾"}
          </span>

          <span aria-hidden="true">
            {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
          </span>
        </button>
      </header>

      <main className="container">
        <section
          className="panel"
          aria-labelledby="titlu-lista"
        >
          <h2 id="titlu-lista">Colecția mea</h2>

          {filme.length > 0 ? (
            <FilmList
              filme={filme}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ) : (
            <p className="empty-state" role="status">
              Lista ta este goală. Nu mai ai titluri în colecție.
            </p>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>
          CineSync · Colecția ta de filme și seriale
          {filme.length > 0 &&
            ` · ${vizionate} ${
              vizionate === 1 ? "titlu vizionat" : "titluri vizionate"
            }`}
        </p>
      </footer>
    </>
  );
}
