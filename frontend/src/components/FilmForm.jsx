import { useState } from "react";

const TIPURI = [
  { value: "film", label: "Film" },
  { value: "serial", label: "Serial" },
  { value: "documentar", label: "Documentar" },
];

const TITLU_MAX = 100;
const AN_MIN = 1900;

// Formular controlat: state-ul React este sursa de adevăr pentru câmpuri
export default function FilmForm({ onAdd }) {
  const [titlu, setTitlu] = useState("");
  const [tip, setTip] = useState("film");
  const [an, setAn] = useState("");
  const [eroare, setEroare] = useState("");
  const [trimite, setTrimite] = useState(false);

  function valideaza() {
    const t = titlu.trim();
    const anCurent = new Date().getFullYear();
    const anText = an.trim();

    if (t === "") return "Titlul este obligatoriu.";
    if (t.length > TITLU_MAX) {
      return `Titlul are maximum ${TITLU_MAX} de caractere.`;
    }
    if (!TIPURI.some((x) => x.value === tip)) return "Tipul ales nu este valid.";
    if (anText === "") return "Anul este obligatoriu.";

    const anNumar = Number(anText);
    if (!Number.isInteger(anNumar) || anNumar < AN_MIN || anNumar > anCurent) {
      return `Anul trebuie să fie între ${AN_MIN} și ${anCurent}.`;
    }

    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault(); // oprește reîncărcarea paginii

    if (trimite) return;

    const mesaj = valideaza();
    if (mesaj) {
      setEroare(mesaj);
      return;
    }

    setEroare("");
    setTrimite(true);

    try {
      await onAdd({
        titlu: titlu.trim(),
        tip,
        an: Number(an.trim()),
        vazut: false,
      });

      // Golim câmpurile doar după ce serverul a confirmat salvarea
      setTitlu("");
      setTip("film");
      setAn("");
    } catch (err) {
      setEroare(err instanceof Error ? err.message : "Salvarea a eșuat.");
    } finally {
      setTrimite(false);
    }
  }

  return (
    <form
      className="item-form"
      onSubmit={handleSubmit}
      noValidate
      data-testid="form"
    >
      <label>
        Titlu
        <input
          type="text"
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
          placeholder="Ex: Interstellar"
          maxLength={TITLU_MAX}
          aria-invalid={Boolean(eroare)}
          data-testid="form-title"
        />
      </label>

      <label>
        Tip
        <select
          value={tip}
          onChange={(e) => setTip(e.target.value)}
          data-testid="form-tip"
        >
          {TIPURI.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        An
        <input
          type="text"
          inputMode="numeric"
          value={an}
          onChange={(e) => setAn(e.target.value)}
          placeholder="Ex: 2014"
          maxLength={4}
          data-testid="form-an"
        />
      </label>

      <button
        type="submit"
        className="btn-add"
        disabled={trimite}
        data-testid="form-submit"
      >
        {trimite ? "Se salvează..." : "Adaugă filmul"}
      </button>

      {eroare && (
        <p className="error form-error" data-testid="form-error">
          {eroare}
        </p>
      )}
    </form>
  );
}
