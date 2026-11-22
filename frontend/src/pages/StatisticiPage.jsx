import { useEffect, useState } from "react";
import { fetchFilme } from "../api.js";
import { TIPURI } from "../constants.js";

export default function StatisticiPage() {
  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* Incarcam lista o singura data, la montare. */
  useEffect(() => {
    let ignore = false;

    fetchFilme()
      .then((data) => !ignore && setFilme(data))
      .catch((err) => !ignore && setError(err.message))
      .finally(() => !ignore && setLoading(false));

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <p className="info">Se încarcă statisticile...</p>;
  if (error) return <p className="error">{error}</p>;

  const vazute = filme.filter((f) => f.vazut).length;

  return (
    <section className="panel">
      <h2>Statistici</h2>
      <p>
        {filme.length} titluri în listă, {vazute} văzute și{" "}
        {filme.length - vazute} de văzut.
      </p>

      <ul>
        {TIPURI.map((t) => (
          <li key={t.value}>
            {t.label}: {filme.filter((f) => f.tip === t.value).length}
          </li>
        ))}
      </ul>
    </section>
  );
}
