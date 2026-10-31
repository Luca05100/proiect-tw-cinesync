const ETICHETE_TIP = {
  film: "Film",
  serial: "Serial",
  documentar: "Documentar",
};

export default function FilmCard({ film, onToggle, onDelete }) {
  const tip = Object.hasOwn(ETICHETE_TIP, film.tip)
    ? film.tip
    : "film";

  const cardClass = film.vazut
    ? "item-card done"
    : "item-card";

  return (
    <li className={cardClass}>
      <label className="task-main">
        <input
          type="checkbox"
          checked={film.vazut}
          onChange={() => onToggle(film.id)}
          aria-label={
            film.vazut
              ? `Marchează ${film.titlu} ca nevizionat`
              : `Marchează ${film.titlu} ca vizionat`
          }
        />

        <div>
          <h3>{film.titlu}</h3>

          <span className={`badge badge-${tip}`}>
            {ETICHETE_TIP[tip]}
          </span>
        </div>
      </label>

      <div className="item-card-details">
        <span className="status">
          {film.vazut ? "✓ Vizionat" : "De văzut"}
        </span>

        <button
          type="button"
          className="btn-danger"
          onClick={() => onDelete(film.id)}
          aria-label={`Șterge ${film.titlu} din colecție`}
        >
          Șterge
        </button>
      </div>
    </li>
  );
}