// Valorile fixe și etichetele lor, într-un singur loc.
export const TIPURI = [
  { value: "film", label: "Film" },
  { value: "serial", label: "Serial" },
  { value: "documentar", label: "Documentar" },
];

export const ETICHETE_TIP = Object.fromEntries(
  TIPURI.map((t) => [t.value, t.label])
);
