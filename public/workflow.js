import {assess,normalize} from './model.js';
export function todayCanary(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Atlantic/Canary',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
export function preliminary(client,op,today=todayCanary()){
 const p=client.profile||{}, a=assess(client,op);
 if(op.screenedOut)return {status:'excluded',reasons:[op.screeningReason||'Fuera del ámbito de revisión']};
 if(p.active==='No')return {status:'excluded',reasons:['Cliente inactivo']};
 if(op.deadline&&op.deadline<today)return {status:'excluded',reasons:['Plazo registrado vencido']};
 if(a.no.length)return {status:'excluded',reasons:a.no};
 if(a.yes.length)return {status:'potential',reasons:a.yes,uncertain:!op.verified||a.unknown.length>0};
 // Topic relevance is a positive signal only, never proof of eligibility or exclusion.
 const title=normalize(op.title), reasons=[];
 const terms={Pesca:['pesquer','pesca','acuicult'],Agricultura:['agrari','agricol'],Industria:['industrial','industria'],Hostelería:['hosteler','restauracion'],Turismo:['turistic'],Comercio:['comercio minorista','comercial minorista'],Tecnología:['software','tecnolog']};
 if(op.type!=='Licitación'&&(terms[p.sector]||[]).some(t=>title.includes(t)))reasons.push('El anuncio menciona actividad de '+p.sector);
 for(const [field,words,label] of [['energy',['eficiencia energetica','ahorro energetico'],'eficiencia energética'],['digitalisation',['digitalizacion','transformacion digital'],'digitalización'],['innovation',['innovacion','investigacion y desarrollo'],'innovación']])if(p[field]==='Sí'&&words.some(w=>title.includes(w)))reasons.push('Interés declarado en '+label);
 return {status:reasons.length?'potential':'unknown',reasons:reasons.length?reasons:['El anuncio no aporta criterios suficientes para esta ficha'],uncertain:true};
}
export function calendarRange(anchor,view){const d=new Date(anchor+'T12:00:00Z');if(view==='month')d.setUTCDate(1);d.setUTCDate(d.getUTCDate()-(d.getUTCDay()+6)%7);let length=view==='week'?7:view==='fortnight'?14:42;return Array.from({length},(_,i)=>{const v=new Date(d);v.setUTCDate(v.getUTCDate()+i);return v.toISOString().slice(0,10);});}
export function isRequested(application,decision){return !!application&&!['Descartado','No cumple'].includes(application.communication)&&decision?.status!=='dismissed';}
