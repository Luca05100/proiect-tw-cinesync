import { useEffect, useState } from "react";
import FilmList from "../components/FilmList.jsx";
import FilmForm from "../components/FilmForm.jsx";
import { createFilm, deleteFilm, fetchFilme, updateFilm } from "../api.js";
import styles from "./FilmePage.module.css";

const FILTRE = [
  { key: "toate", label: "Toate" },
  { key: "film", label: "Filme" },
  { key: "serial", label: "Seriale" },
  { key: "documentar", label: "Documentare" },
];

export default function FilmePage() {
  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtru, setFiltru] = useState("toate");

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

  const filmeDeVazut = filme.filter((film) => !film.vazut);
  const filmeVizionate = filme.filter((film) => film.vazut);

  /* Primul titlu nevăzut din colecție devine hero. */
  const heroFilm = filmeDeVazut[0] || null;

  const dupaFiltru = (lista) =>
    filtru === "toate" ? lista : lista.filter((film) => film.tip === filtru);

  const filmeFiltrate = dupaFiltru(filmeDeVazut);
  const filmeVizionateFiltrate = dupaFiltru(filmeVizionate);

  return (
    <>
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
          <p className={styles.summary}>
            {filme.length} în listă · {filmeVizionate.length} văzute
          </p>

          {/* HERO SECTION */}
          {heroFilm && (
            <section className={styles.hero} aria-label="Următorul de văzut">
              <p className={styles.heroLabel}>Urmează în lista ta</p>
              <h2 className={styles.heroTitle}>{heroFilm.titlu}</h2>

              <p className={styles.heroDescription}>
                Titlu salvat în colecția ta. Pornește când ești gata și
                bifează-l după ce termini.
              </p>

              <button
                type="button"
                className={styles.heroBtn}
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
              <div className={styles.filters} role="group" aria-label="Filtre">
                {FILTRE.map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    className={
                      filtru === key
                        ? `${styles.filterBtn} ${styles.filterActive}`
                        : styles.filterBtn
                    }
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
    </>
  );
}
