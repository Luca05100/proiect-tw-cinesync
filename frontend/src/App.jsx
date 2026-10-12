const filme = [
  { id: 1, titlu: "Interstellar", vazut: true, tip: "film" },
  { id: 2, titlu: "Stranger Things", vazut: false, tip: "serial" },
  { id: 3, titlu: "Planeta Pământ", vazut: false, tip: "documentar" }
];

export default function App() {
  const deVazut = filme.filter((f) => !f.vazut).length;

  return (
    <>
      <header className="app-header">
        <h1>CineSync</h1>
        <p>Gestionează-ți filmele și serialele preferate (Watchlist).</p>
        <p className="app-count">
          {filme.length} filme, dintre care {deVazut} de văzut
        </p>
      </header>

      <main className="container">
        <section className="panel">
          <h2>Watchlist-ul meu</h2>
          {/* Temporar: date brute; componentele apar în Etapa 4 */}
          <pre>{JSON.stringify(filme, null, 2)}</pre>
        </section>
      </main>
    </>
  );
}