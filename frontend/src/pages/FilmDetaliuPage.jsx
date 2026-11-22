import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFilm } from "../api.js";
import Poza from "../components/Poza.jsx";
import { ETICHETE_TIP } from "../constants.js";
import styles from "./FilmDetaliuPage.module.css";

export default function FilmDetaliuPage() {
  const { id } = useParams(); // text din URL, de exemplu "3"
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Se reîncarcă dacă se schimbă id-ul din adresă
  useEffect(() => {
    let ignore = false;

    fetchFilm(id)
      .then((data) => {
        if (!ignore) {
          setFilm(data);
          setError(null); // o eroare de la un id anterior nu mai este valabilă
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <p className="info" data-testid="loading">
        Se încarcă...
      </p>
    );
  }

  if (error) {
    return (
      <section className="panel">
        <p className="error" data-testid="error">
          Filmul nu a putut fi încărcat: {error}
        </p>
        <p>
          <Link to="/">Înapoi la listă</Link>
        </p>
      </section>
    );
  }

  const tip = Object.hasOwn(ETICHETE_TIP, film.tip) ? film.tip : "film";

  return (
    <section className={styles.detail} data-testid="detail">
      <Link to="/" className={styles.back}>
        ← Înapoi la listă
      </Link>

      <h2 className={film.vazut ? styles.done : undefined} data-testid="detail-title">
        {film.titlu}
      </h2>

      <Poza film={film} className={styles.poza} />

      {film.descriere && <p className={styles.descriere}>{film.descriere}</p>}

      <dl className={styles.fields}>
        <dt>Format</dt>
        <dd>
          <span className={`badge badge-${tip}`}>{ETICHETE_TIP[tip]}</span>
        </dd>
        <dt>An</dt>
        <dd>{film.an ?? "—"}</dd>
        <dt>Status</dt>
        <dd>{film.vazut ? "Vizionat" : "De văzut"}</dd>
        <dt>ID</dt>
        <dd>{film.id}</dd>
      </dl>
    </section>
  );
}
