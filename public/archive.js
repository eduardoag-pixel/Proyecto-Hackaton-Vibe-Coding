export const normDoc = value => String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
export function libraryDocument(d){return d.scope==='library'||(!d.scope&&(!d.case_id||d.approved===1));}
export function reusableDocument(d,clientId,type,today){
 if(d.client_id!==clientId||!libraryDocument(d)||!d.approved||d.expires&&d.expires<today)return false;
 const required=normDoc(type),stored=normDoc(d.type),year=required.match(/\b(20\d{2})\b/)?.[1];
 if(/cuentas anuales/.test(required))return !!year&&String(d.year)===year&&required.replace(year,'').trim()===stored.replace(/\b20\d{2}\b/,'').trim();
 return required===stored;
}
export function findReusable(docs,clientId,type,today){return docs.filter(d=>reusableDocument(d,clientId,type,today)).sort((a,b)=>String(b.created).localeCompare(String(a.created)))[0];}
