import FilmCard from "./FilmCard.jsx";

export default function FilmList({ filme, onToggle, onDelete }) {
  if (filme.length === 0) {
    return <p className="empty">Lista de filme este goală.</p>;
  }

  return (
    <ul className="item-list">
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