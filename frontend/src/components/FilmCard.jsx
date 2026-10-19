
const ETICHETE_GEN = { 
  sf: "Sci-Fi & Fantasy", 
  thriller: "Thriller & Mister", 
  actiune: "Acțiune", 
  drama: "Dramă" 
};

export default function FilmCard({ film }) {
  const isVizionat = film.vizionat ? "item-card done" : "item-card";

  return (
    <li className={isVizionat}>
      <div>
        <h3>{film.titlu}</h3>
        {/* Generăm dinamic clasa de badge în funcție de genul filmului */}
        <span className={`badge badge-${film.gen}`}>
          {ETICHETE_GEN[film.gen]}
        </span>
      </div>
      {/* Afișăm statusul condiționat */}
      <span className="status">{film.vizionat ? "Vizionat" : "De văzut"}</span>
    </li>
  );
}