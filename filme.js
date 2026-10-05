const TIPURI = ["film", "serial", "documentar"];

const filme = [
  { id: 1, titlu: "Interstellar", vazut: true, tip: "film" },
  { id: 2, titlu: "Stranger Things", vazut: false, tip: "serial" },
  { id: 3, titlu: "Planeta Pământ", vazut: false, tip: "documentar" }
];

function listeazaTitluri(lista) {
  return lista.map((f) => f.titlu);
}

function numaraDeVazut(lista) {
  return lista.filter((f) => !f.vazut).length;
}

function cautaDupaTitlu(lista, text) {
  const textMic = text.toLowerCase();
  return lista.filter((f) => f.titlu.toLowerCase().includes(textMic));
}

function nextId(lista) {
  return lista.reduce((max, f) => Math.max(max, f.id), 0) + 1;
}

function adaugaTitlu(lista, titlu, tip = "film") {
  const titluCurat = titlu.trim();

  if (titluCurat === "") {
    console.log("Titlul nu poate fi gol.");
    return lista;
  }

  if (!TIPURI.includes(tip)) {
    console.log(`Format invalid: ${tip}`);
    return lista;
  }

  const nou = {
    id: nextId(lista),
    titlu: titluCurat,
    vazut: false,
    tip: tip
  };

  return [...lista, nou];
}

function comutaVazut(lista, id) {
  return lista.map((f) => 
    f.id === id ? { ...f, vazut: !f.vazut } : f
  );
}

function stergeTitlu(lista, id) {
  return lista.filter((f) => f.id !== id);
}

console.log("--- Citire ---");
console.log("Titluri:", listeazaTitluri(filme).join(", "));
console.log("De vizionat (nevizionate):", numaraDeVazut(filme));
console.log("Căutare 'planeta':", listeazaTitluri(cautaDupaTitlu(filme, "planeta")).join(", "));

console.log("--- Adăugare ---");
let lista = adaugaTitlu(filme, "Inception", "film");
console.log("Lista nouă are:", lista.length, "titluri");
console.log("Originalul a rămas cu:", filme.length, "titluri");

console.log("--- Modificare și ștergere ---");
lista = comutaVazut(lista, 2);
console.log("După bifarea id 2 (Stranger Things), de vizionat au rămas:", numaraDeVazut(lista));

lista = stergeTitlu(lista, 3);
console.log("După ștergerea id 3 (Planeta Pământ), titluri:", listeazaTitluri(lista).join(", "));

console.log("--- Validare ---");
adaugaTitlu(lista, "   ", "film"); // Va declanșa prima eroare
adaugaTitlu(lista, "Matrix", "3d-format"); // Va declanșa a doua eroare