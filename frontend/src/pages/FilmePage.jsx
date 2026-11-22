import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import FilmList from "../components/FilmList.jsx";
import Poza from "../components/Poza.jsx";
import FilmForm from "../components/FilmForm.jsx";
import { createFilm, deleteFilm, fetchFilme, updateFilm } from "../api.js";
import { ETICHETE_TIP } from "../constants.js";
import { acumZile, formatDurata } from "../utils.js";
import styles from "./FilmePage.module.css";

const FILTRE = [
  { key: "toate", label: "Toate" },
  { key: "film", label: "Filme" },
  { key: "serial", label: "Seriale" },
  { key: "documentar", label: "Documentare" },
];

// Element aleator dintr-o lista
function alegeLaIntamplare(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

export default function FilmePage() {
  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtru, setFiltru] = useState("toate");
  const [heroId, setHeroId] = useState(null);
  const { cautare } = useOutletContext(); // textul din bara de cautare

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

  /* Hero: titlul ales la intamplare sau, implicit, primul nevazut. */
  const heroFilm =
    filmeDeVazut.find((film) => film.id === heroId) || filmeDeVazut[0] || null;

  /* Alege un alt titlu nevazut decat cel afisat acum. */
  function handleAltul() {
    const alte = filmeDeVazut.filter((film) => film.id !== heroFilm.id);

    if (alte.length > 0) {
      setHeroId(alegeLaIntamplare(alte).id);
    }
  }

  const termen = cautare.trim().toLowerCase();

  const dupaFiltru = (lista) =>
    lista
      .filter((film) => filtru === "toate" || film.tip === filtru)
      .filter((film) => film.titlu.toLowerCase().includes(termen));

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
              {/* Fundal: aceeasi poza, estompata */}
              {heroFilm.poza && (
                <div
                  className={styles.heroFundal}
                  style={{ backgroundImage: `url(${heroFilm.poza})` }}
                  aria-hidden="true"
                />
              )}

              {/* Poza din dreapta; pe ecran ingust ramane sub text */}
              <Poza film={heroFilm} className={styles.heroPoza} />

              <p className={styles.heroLabel}>Urmează în lista ta</p>
              <h2 className={styles.heroTitle}>{heroFilm.titlu}</h2>

              <p className={styles.heroMeta}>
                <span className={`badge badge-${heroFilm.tip}`}>
                  {ETICHETE_TIP[heroFilm.tip] ?? heroFilm.tip}
                </span>
                {heroFilm.an && <span>{heroFilm.an}</span>}
                {heroFilm.sezoane && <span>{heroFilm.sezoane} sezoane</span>}
                {heroFilm.durata && (
                  <span>
                    {formatDurata(heroFilm.durata)}
                    {heroFilm.tip === "serial" && " / episod"}
                  </span>
                )}
                {heroFilm.nota && (
                  <span className={styles.nota}>★ {heroFilm.nota}</span>
                )}
                {heroFilm.genuri && <span>{heroFilm.genuri}</span>}
                {heroFilm.adaugat && (
                  <span>Adăugat {acumZile(heroFilm.adaugat)}</span>
                )}
              </p>

              <p className={styles.heroDescription}>
                {heroFilm.descriere ||
                  "Titlu salvat în colecția ta. Pornește când ești gata și bifează-l după ce termini."}
              </p>

              <div className={styles.heroActions}>
                <button
                  type="button"
                  className={styles.heroBtn}
                  onClick={() => handleToggle(heroFilm.id)}
                >
                  ✓ Marchează ca văzut
                </button>

                <button
                  type="button"
                  className={styles.heroBtnSecundar}
                  onClick={handleAltul}
                  disabled={filmeDeVazut.length < 2}
                >
                  ⤮ Alege altul la întâmplare
                </button>
              </div>

              {/* Progresul din colectie */}
              <div className={styles.progress}>
                <p className={styles.progressLabel}>Progresul tău</p>
                <p className={styles.progressCount}>
                  {filmeVizionate.length}
                  <span>/{filme.length}</span>
                  <small>văzute</small>
                </p>
                <div
                  className={styles.bar}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={filme.length}
                  aria-valuenow={filmeVizionate.length}
                >
                  <div
                    className={styles.barFill}
                    style={{
                      width: `${(filmeVizionate.length / filme.length) * 100}%`,
                    }}
                  />
                </div>
                <p className={styles.progressNote}>
                  Mai ai {filmeDeVazut.length} titluri de văzut.
                </p>
              </div>
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
