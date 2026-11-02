export const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function fetchFilme() {
  const res = await fetch(`${API_URL}/filme`);

  if (!res.ok) {
    throw new Error(`Eroare server: ${res.status}`);
  }

  const data = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("Răspunsul serverului nu conține o listă de filme");
  }

  return data;
}
