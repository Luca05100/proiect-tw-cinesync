import FilmCard from "./FilmCard.jsx";
import styles from "./FilmList.module.css";

export default function FilmList({ filme, onToggle, onDelete }) {
  if (filme.length === 0) {
    return <p className="empty" data-testid="empty">Lista de filme este goală.</p>;
  }

  return (
    <ul className={styles.list}>
      {filme.map((film) => (
        <FilmCard
          key={film.id}
          film={film}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
