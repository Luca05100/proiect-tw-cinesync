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
    <li className={cardClass} data-testid="item" data-id={film.id}>
      <label className="task-main">
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
          <h3 data-testid="item-title">{film.titlu}</h3>

          <span className={`badge badge-${tip}`}>
            {ETICHETE_TIP[tip]}
          </span>

          {film.an && <span className="year"> {film.an}</span>}
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
          data-testid="item-delete"
        >
          Șterge
        </button>
      </div>
    </li>
  );
}