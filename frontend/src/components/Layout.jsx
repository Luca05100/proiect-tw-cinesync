import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

const CHEIE_TEMA = "cinesync-theme";

/* Preferinta salvata are prioritate fata de tema sistemului. */
function temaInitiala() {
  try {
    const temaSalvata = localStorage.getItem(CHEIE_TEMA);

    if (temaSalvata === "dark" || temaSalvata === "light") {
      return temaSalvata;
    }
  } catch {
    // Continuam si daca stocarea locala nu este disponibila.
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// NavLink marcheaza singur pagina curentă
function navClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

export default function Layout() {
  const [tema, setTema] = useState(temaInitiala);
  const [cautare, setCautare] = useState("");
  const inputRef = useRef(null);

  /* Aplicam tema inclusiv la prima afisare. */
  useEffect(() => {
    document.documentElement.dataset.theme = tema;

    try {
      localStorage.setItem(CHEIE_TEMA, tema);
    } catch {
      // Comutarea functioneaza si fara salvarea preferintei.
    }
  }, [tema]);

  /* Tasta "/" muta focusul in cautare, ca in screenshot. */
  useEffect(() => {
    function handleTasta(e) {
      const tag = document.activeElement?.tagName;
      const scriem = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

      if (e.key === "/" && !scriem) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleTasta);
    return () => window.removeEventListener("keydown", handleTasta);
  }, []);

  function handleTema() {
    setTema((anterioara) => (anterioara === "dark" ? "light" : "dark"));
  }

  return (
    <>
      <header className={styles.header}>
        <span className={styles.logo}>
          Cine<span className={styles.logoAccent}>Sync</span>
        </span>

        <nav className={styles.nav} data-testid="nav">
          <NavLink to="/" end className={navClass}>
            Lista mea
          </NavLink>
          <NavLink to="/statistici" className={navClass}>
            Statistici
          </NavLink>
          <NavLink to="/despre" className={navClass}>
            Despre
          </NavLink>
        </nav>

        {/* Cautarea filtreaza lista din pagina curenta */}
        <label className={styles.search}>
          <svg
            className={styles.searchIcon}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4.5 4.5" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={cautare}
            onChange={(e) => setCautare(e.target.value)}
            placeholder="Caută în listă"
            aria-label="Caută în listă"
          />
          <kbd className={styles.kbd} aria-hidden="true">
            /
          </kbd>
        </label>

        <button
          type="button"
          className={styles.themeToggle}
          onClick={handleTema}
          aria-label="Mod întunecat"
          aria-pressed={tema === "dark"}
          title={
            tema === "dark"
              ? "Activează modul luminos"
              : "Activează modul întunecat"
          }
        >
          <span aria-hidden="true">{tema === "dark" ? "☀" : "☾"}</span>
        </button>
      </header>

      <main className={styles.main}>
        <Outlet context={{ cautare }} />
      </main>

      <footer className={styles.footer}>
        <p>CineSync · Colecția ta de filme și seriale · Proiect Tehnologii Web</p>
      </footer>
    </>
  );
}
