import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

const CHEIE_TEMA = "cinesync-theme";

/* Preferința salvată are prioritate față de tema sistemului. */
function temaInitiala() {
  try {
    const temaSalvata = localStorage.getItem(CHEIE_TEMA);

    if (temaSalvata === "dark" || temaSalvata === "light") {
      return temaSalvata;
    }
  } catch {
    // Continuăm și dacă stocarea locală nu este disponibilă.
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// NavLink marchează singur pagina curentă
function navClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

export default function Layout() {
  const [tema, setTema] = useState(temaInitiala);

  /* Aplicăm tema inclusiv la prima afișare. */
  useEffect(() => {
    document.documentElement.dataset.theme = tema;

    try {
      localStorage.setItem(CHEIE_TEMA, tema);
    } catch {
      // Comutarea funcționează și fără salvarea preferinței.
    }
  }, [tema]);

  function handleTema() {
    setTema((anterioara) => (anterioara === "dark" ? "light" : "dark"));
  }

  return (
    <>
      <header className={styles.header}>
        <span className={styles.logo}>CineSync</span>

        <nav className={styles.nav} data-testid="nav">
          <NavLink to="/" end className={navClass}>
            Filme
          </NavLink>
          <NavLink to="/despre" className={navClass}>
            Despre
          </NavLink>
        </nav>

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

          <span aria-hidden="true">
            {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
          </span>
        </button>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p>CineSync · Colecția ta de filme și seriale · Proiect Tehnologii Web</p>
      </footer>
    </>
  );
}
