import { useState } from "react";
import styles from "./Poza.module.css";

// Afiseaza poza filmului; daca lipseste sau nu se incarca, apare initiala titlului
export default function Poza({ film, className = "" }) {
  const [esuat, setEsuat] = useState(false);
  const clasa = `${styles.poza} ${className}`;

  if (!film.poza || esuat) {
    return (
      <div className={`${clasa} ${styles.gol}`} aria-hidden="true">
        {film.titlu.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      className={clasa}
      src={film.poza}
      alt={`Poster ${film.titlu}`}
      loading="lazy"
      onError={() => setEsuat(true)}
    />
  );
}
