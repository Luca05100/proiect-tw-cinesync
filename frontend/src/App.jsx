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
const TIPURI = ["film", "serial", "documentar"];

/* Preferinta salvata are prioritate fata de tema sistemului */
function temaInitiala() {
  try {
    const temaSalvata = localStorage.getItem(CHEIE_TEMA);

    if (temaSalvata === "dark" || temaSalvata === "light") {
      return temaSalvata;
    }
  } catch {
    // Continuam si daca starea locala nu este disponibila (Ingocnito)
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function App() {
  const [filme, setFilme] = useState(FILME_INITIALE);
  const [tema, setTema] = useState(temaInitiala);
  const [filtru, setFiltru] = useState("toate");
  const [titluNou, setTitluNou] = useState("");
  const [tipNou, setTipNou] = useState("film");

  /* Aplicam tema inclusiv la prima afisare  */
  useEffect(() => {
    document.documentElement.dataset.theme = tema;

    try {
      localStorage.setItem(CHEIE_TEMA, tema);
    } catch {
      // Comutarea functioneaza perfect si fara salvarea preferintei.
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

  function handleAdauga(e) {
    e.preventDefault();
    const titluCurat = titluNou.trim();
    if (titluCurat === "" || !TIPURI.includes(tipNou)) return;

    const idNou = filme.reduce((max, f) => Math.max(max, f.id), 0) + 1;
    setFilme((prev) => [
      ...prev,
      { id: idNou, titlu: titluCurat, vazut: false, tip: tipNou },
    ]);
    setTitluNou("");
    setTipNou("film");
  }

  const deVazut = filme.filter((film) => !film.vazut).length;
  const vizionate = filme.length - deVazut;

  /* Primul film nevazut din colecție devine hero */
  const heroFilm = filme.find((f) => !f.vazut) || null;

  /* Filtrare pe sectiunea de carduri */
  const filmeDeVazut = filme.filter((f) => !f.vazut);
  const filmeFiltrate =
    filtru === "toate"
      ? filmeDeVazut
      : filmeDeVazut.filter((f) => f.tip === filtru);

  const filmeVizionate = filme.filter((f) => f.vazut);
  const filmeVizionateFiltrate =
    filtru === "toate"
      ? filmeVizionate
      : filmeVizionate.filter((f) => f.tip === filtru);

  return (
    <>
      <header className="app-header">
        <h1>CineSync</h1>

        <p>Filmele tale. Serialele tale. În ritmul tău.</p>

        <span className="app-count">
          {filme.length} în listă · {vizionate} văzute
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
        { /*  HERO SECTION */ }
        {heroFilm && (
          <section className="hero-section" aria-label="Următorul de văzut">
            <p className="hero-label">Urmează în lista ta</p>
            <h2 className="hero-title">{heroFilm.titlu}</h2>
            <p className="hero-description">
              Film salvat în colecția ta. Pornește când ești gata și
              bifează-l după ce termini.
            </p>
            <button
              type="button"
              className="hero-btn"
              onClick={() => handleToggle(heroFilm.id)}
            >
              Marchează ca văzut
            </button>
          </section>
        )}

        {/* FILTRE */}
        <div className="filter-bar" role="group" aria-label="Filtre">
          {[
            { key: "toate", label: "Toate" },
            { key: "film", label: "Filme" },
            { key: "serial", label: "Seriale" },
            { key: "documentar", label: "Documentare" },
          ].map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className={`filter-btn${filtru === key ? " active" : ""}`}
              onClick={() => setFiltru(key)}
            >
              {label}
            </button>
          ))}
        </div>


        {/* DE VAZUT */}
        <section
          className="panel"
          aria-labelledby="titlu-de-vazut"
        >
          <h2 id="titlu-de-vazut">De văzut</h2>

          {filmeFiltrate.length > 0 ? (
            <FilmList
              filme={filmeFiltrate}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ) : (
            <p className="empty-state" role="status">
              Niciun titlu de văzut {filtru !== "toate" ? "în această categorie" : ""}.
            </p>
          )}
        </section>

        {/* VIZIONATE */}
        <section
          className="panel"
          aria-labelledby="titlu-vizionate"
        >
          <h2 id="titlu-vizionate">Vizionate</h2>

          {filmeVizionateFiltrate.length > 0 ? (
            <FilmList
              filme={filmeVizionateFiltrate}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ) : (
            <p className="empty-state" role="status">
              Niciun titlu vizionat {filtru !== "toate" ? "în această categorie" : ""}.
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