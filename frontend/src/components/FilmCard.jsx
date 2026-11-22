import { Link } from "react-router-dom";
import { ETICHETE_TIP } from "../constants.js";
import Poza from "./Poza.jsx";
import styles from "./FilmCard.module.css";

export default function FilmCard({ film, onToggle, onDelete }) {
  const tip = Object.hasOwn(ETICHETE_TIP, film.tip) ? film.tip : "film";

  const cardClass = film.vazut ? `${styles.card} ${styles.done}` : styles.card;

  return (
    <li className={cardClass} data-testid="item" data-id={film.id}>
      <Poza film={film} className={styles.poza} />

      <div className={styles.main}>
        <input
          type="checkbox"
          checked={film.vazut}
          onChange={() => onToggle(film.id)}
          data-testid="item-toggle"
          aria-label={
            film.vazut
              ? `Marchează ${film.titlu} ca nevizionat`
              : `Marchează ${film.titlu} ca vizionat`
          }
        />

        <div>
          <h3 className={styles.title}>
            <Link
              to={`/filme/${film.id}`}
              className={styles.titleLink}
              data-testid="item-link"
            >
              {film.titlu}
            </Link>
          </h3>

          <span className={`badge badge-${tip}`}>{ETICHETE_TIP[tip]}</span>

          {film.an && <span className={styles.year}> {film.an}</span>}
        </div>
      </div>

      <div className={styles.details}>
        <span className={styles.status}>
          {film.vazut ? "✓ Vizionat" : "De văzut"}
        </span>

        <button
          type="button"
          className="btn-danger"
          onClick={() => onDelete(film.id)}
          aria-label={`Șterge ${film.titlu} din colecție`}
          data-testid="item-delete"
        >
          Șterge
        </button>
      </div>
    </li>
  );
}
