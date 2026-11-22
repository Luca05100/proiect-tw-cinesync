// Functii mici de formatare folosite in hero si in pagina de detaliu.

// 169 -> "2h 49m"; sub o ora ramane "50 min"
export function formatDurata(minute) {
  if (!minute) return "";

  const ore = Math.floor(minute / 60);
  const rest = minute % 60;

  if (ore === 0) return `${rest} min`;
  return rest === 0 ? `${ore}h` : `${ore}h ${rest}m`;
}

// "2026-11-19" -> "acum 3 zile"
export function acumZile(dataText) {
  if (!dataText) return "";

  const zile = Math.floor((Date.now() - new Date(dataText).getTime()) / 86400000);

  if (zile <= 0) return "azi";
  if (zile === 1) return "ieri";
  return `acum ${zile} zile`;
}
