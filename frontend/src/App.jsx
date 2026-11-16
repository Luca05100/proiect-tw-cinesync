import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import FilmePage from "./pages/FilmePage.jsx";
import FilmDetaliuPage from "./pages/FilmDetaliuPage.jsx";
import DesprePage from "./pages/DesprePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Harta rutelor. Layout înconjoară fiecare pagină.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<FilmePage />} />
        <Route path="/filme/:id" element={<FilmDetaliuPage />} />
        <Route path="/despre" element={<DesprePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
