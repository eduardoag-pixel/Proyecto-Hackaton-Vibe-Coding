// Only the place of performance and the subject/buyer describe territorial relevance.
// The full Atom entry also contains tendering notes, including Canary time-zone reminders.
export function placspTerritory(entry) {
  const locations=[...entry.matchAll(/<cac:RealizedLocation\b[^>]*>([\s\S]*?)<\/cac:RealizedLocation>/g)].map(m=>m[1]);
  const codes=locations.flatMap(location=>[...location.matchAll(/<cbc:CountrySubentityCode\b[^>]*>([^<]+)<\/cbc:CountrySubentityCode>/g)].map(m=>m[1].trim().toUpperCase()));
  const names=locations.flatMap(location=>[...location.matchAll(/<cbc:CountrySubentity\b[^>]*>([^<]+)<\/cbc:CountrySubentity>/g)].map(m=>m[1].trim()));
  const local=/canari|tenerife|palmas|lanzarote|fuerteventura|gomera|hierro|la palma|graciosa/i;
  if(codes.some(code=>/^ES70/.test(code))||names.some(name=>local.test(name)))return {relevant:true,reason:'Ejecución en Canarias',codes,names};
  // A specified place outside the islands is a relevance exclusion for this Canary-only intake,
  // not a legal conclusion that a Canary business is barred from bidding.
  if(codes.length||names.length)return {relevant:false,reason:'Ejecución indicada fuera de Canarias',codes,names};
  const title=entry.match(/<title\b[^>]*>([\s\S]*?)<\/title>/)?.[1]||'';
  const summary=entry.match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/)?.[1]||'';
  if(local.test(title+' '+summary))return {relevant:true,reason:'Asunto u órgano de Canarias; lugar por verificar',codes,names};
  if(/\b(?:ámbito nacional|todo el territorio nacional|toda españa)\b/i.test(title+' '+summary))return {relevant:true,reason:'Ámbito nacional; lugar por verificar',codes,names};
  return {relevant:false,reason:'Sin indicio territorial de interés',codes,names};
}
