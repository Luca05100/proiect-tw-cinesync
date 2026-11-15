import { useEffect, useState } from "react";
import FilmList from "./components/FilmList.jsx";
import FilmForm from "./components/FilmForm.jsx";
import { createFilm, deleteFilm, fetchFilme, updateFilm } from "./api.js";
import "./App.css";

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
  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [tema, setTema] = useState(temaInitiala);
  const [filtru, setFiltru] = useState("toate");

  /* Aplicăm tema inclusiv la prima afișare. */
  useEffect(() => {
    document.documentElement.dataset.theme = tema;

    try {
      localStorage.setItem(CHEIE_TEMA, tema);
    } catch {
      // Comutarea funcționează și fără salvarea preferinței.
    }
  }, [tema]);

  /* Încărcăm filmele de la API la montarea componentei. */
  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await fetchFilme();

        if (!ignore) {
          setFilme(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error ? err.message : "A apărut o eroare necunoscută"
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  /* Întâi serverul, apoi state-ul: pe ecran ajunge doar ce s-a salvat. */
  async function handleAdd(film) {
    const creat = await createFilm(film); // serverul întoarce elementul cu id
    setFilme((prev) => [...prev, creat]);
  }

  async function handleToggle(id) {
    const film = filme.find((f) => f.id === id);

    if (!film) return;

    try {
      const actualizat = await updateFilm(id, { vazut: !film.vazut });
      setError(null);
      setFilme((prev) => prev.map((f) => (f.id === id ? actualizat : f)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare necunoscută");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteFilm(id);
      setError(null);
      setFilme((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare necunoscută");
    }
  }

  function handleTema() {
    setTema((temaAnterioara) =>
      temaAnterioara === "dark" ? "light" : "dark"
    );
  }

  const deVazut = filme.filter((film) => !film.vazut).length;
  const vizionate = filme.length - deVazut;

  /* Primul titlu nevăzut din colecție devine hero. */
  const heroFilm = filme.find((film) => !film.vazut) || null;

  const filmeDeVazut = filme.filter((film) => !film.vazut);
  const filmeFiltrate =
    filtru === "toate"
      ? filmeDeVazut
      : filmeDeVazut.filter((film) => film.tip === filtru);

  const filmeVizionate = filme.filter((film) => film.vazut);
  const filmeVizionateFiltrate =
    filtru === "toate"
      ? filmeVizionate
      : filmeVizionate.filter((film) => film.tip === filtru);

  return (
    <>
      <header className="app-header">
        <h1>CineSync</h1>

        <p>Filmele tale. Serialele tale. În ritmul tău.</p>

        {!loading && (
          <span className="app-count">
            {filme.length} în listă · {vizionate} văzute
          </span>
        )}

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
          <span aria-hidden="true">{tema === "dark" ? "☀" : "☾"}</span>

          <span aria-hidden="true">
            {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
          </span>
        </button>
      </header>

      <main className="container">
        {/* STAREA DE ÎNCĂRCARE */}
        {loading && (
          <section className="panel" aria-busy="true">
            <p className="info" role="status" data-testid="loading">
              Se încarcă lista de filme și seriale...
            </p>
          </section>
        )}

        {/* EROAREA PAGINII: lista rămâne pe ecran dacă o bifare/ștergere eșuează */}
        {error && (
          <section className="panel">
            <p className="error" role="alert" data-testid="error">
              {error}. Verifică dacă serverul este pornit cu{" "}
              <code>npm run api</code>.
            </p>
          </section>
        )}

        {!loading && (
          <>
            {/* HERO SECTION */}
            {heroFilm && (
              <section className="hero-section" aria-label="Următorul de văzut">
                <p className="hero-label">Urmează în lista ta</p>
                <h2 className="hero-title">{heroFilm.titlu}</h2>

                <p className="hero-description">
                  Titlu salvat în colecția ta. Pornește când ești gata și
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

            {/* FORMULAR ADĂUGARE */}
            <FilmForm onAdd={handleAdd} />

            {filme.length === 0 ? (
              <p className="empty-state" role="status" data-testid="empty">
                Nu există niciun titlu în colecție.
              </p>
            ) : (
              <>
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

                {/* DE VĂZUT */}
                <section className="panel" aria-labelledby="titlu-de-vazut">
                  <h2 id="titlu-de-vazut">De văzut</h2>

                  {filmeFiltrate.length > 0 ? (
                    <FilmList
                      filme={filmeFiltrate}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                    />
                  ) : (
                    <p className="empty-state" role="status">
                      Niciun titlu de văzut
                      {filtru !== "toate" ? " în această categorie" : ""}.
                    </p>
                  )}
                </section>

                {/* VIZIONATE */}
                <section className="panel" aria-labelledby="titlu-vizionate">
                  <h2 id="titlu-vizionate">Vizionate</h2>

                  {filmeVizionateFiltrate.length > 0 ? (
                    <FilmList
                      filme={filmeVizionateFiltrate}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                    />
                  ) : (
                    <p className="empty-state" role="status">
                      Niciun titlu vizionat
                      {filtru !== "toate" ? " în această categorie" : ""}.
                    </p>
                  )}
                </section>
              </>
            )}
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>
          CineSync · Colecția ta de filme și seriale
          {!loading &&
            filme.length > 0 &&
            ` · ${vizionate} ${
              vizionate === 1 ? "titlu vizionat" : "titluri vizionate"
            }`}
        </p>
      </footer>
    </>
  );
}
