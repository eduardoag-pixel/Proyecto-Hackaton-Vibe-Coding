import {scopedSQL,tenantId} from './tenant.js';
import {requestIdentity,actorFields} from './identity.js';
type Actor=string|{id:string|null;email:string|null;name:string;kind:string};
import {findReusable} from '../public/archive.js';
import {placspTerritory} from './placsp.js';

import { env } from 'cloudflare:workers';
import { FIELDS, SOURCES, DOC_TYPES, STATUSES, validateProfile, seedClients, seedOpportunities } from '../public/model.js';
function workspace(tenant:string){
const db=()=>({prepare:(sql:string)=>env.DB!.prepare(scopedSQL(sql,tenant)),batch:(statements:any[])=>env.DB!.batch(statements)});
const json=(x:any,status=200)=>Response.json(x,{status,headers:{'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
const now=()=>new Date().toISOString();
const uid=(prefix='')=>prefix+crypto.randomUUID();
const safe=(s:string)=>s.replace(/[<>:"/\\|?*\u0000-\u001f]/g,'_').replace(/[. ]+$/,'').slice(0,130)||'Sin nombre';
async function all(kind:string){const r=await db().prepare('SELECT data FROM records WHERE kind=? ORDER BY updated DESC').bind(kind).all();return r.results.map((x:any)=>JSON.parse(x.data));}
async function get(id:string){const r:any=await db().prepare('SELECT data FROM records WHERE id=?').bind(id).first();return r?JSON.parse(r.data):null;}
async function save(kind:string,data:any){await db().prepare('INSERT INTO records (id,kind,data,updated) VALUES (?,?,?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data,updated=excluded.updated').bind(data.id,kind,JSON.stringify(data),now()).run();return data;}
async function audit(action:string,actor:Actor,detail:string,caseId?:string){return save('audit',{id:uid('audit-'),action,...actorFields(actor),detail,caseId,at:now()});}
async function account(request:Request){const identity=requestIdentity(request);if(!identity.id)return {identity,profile:null};const id='member:'+identity.id;let profile=await get(id);if(!profile){profile={id,userId:identity.id,email:identity.email,name:identity.name,department:'Administración',signature:'',joined:now(),updated:now(),welcomed:false};await save('member',profile);}return {identity:{...identity,name:profile.name||identity.name},profile};}
const defaults={id:'settings',readyTime:'08:00',window:15,timezone:'Atlantic/Canary',enabled:false,scope:'Canarias y convocatorias nacionales',scheduleStatus:'Sin activar'};
async function state(){const [clients,opportunities,cases,settings,logs,sources,documents]:any=await Promise.all([all('client'),all('opportunity'),all('case'),get('settings'),all('audit'),all('source'),db().prepare('SELECT * FROM documents ORDER BY created DESC').all()]);return {decisions:await all('decision'),ignored:await all('ignored-opportunity'),clients,opportunities,cases,settings:settings||defaults,logs:logs.slice(0,150),sources,documents:await withDocumentMeta(documents.results),customSources:await all('custom-source')};}
async function withDocumentMeta(docs:any[]){const metadata=await all('document-meta');return docs.map(d=>({...d,...(metadata.find((m:any)=>m.docId===d.id)?.values||{})}));}
async function body(req:Request){const text=await req.text();if(text.length>3_000_000)throw Error('Petición demasiado grande');return JSON.parse(text);}
function checkOrigin(req:Request){const origin=req.headers.get('origin');if(origin&&origin!==new URL(req.url).origin)throw Error('Origen no autorizado');if(req.headers.get('sec-fetch-site')==='cross-site')throw Error('Petición no autorizada');}
async function initialize(by:Actor){if((await all('client')).length)throw Error('Ya existen clientes. No se cargará el ejemplo otra vez.');const ops=seedOpportunities();await db().batch([...seedClients.map((c:any)=>db().prepare('INSERT INTO records (id,kind,data,updated) VALUES (?,?,?,?)').bind(c.id,'client',JSON.stringify(c),now())),...ops.map((o:any)=>db().prepare('INSERT INTO records (id,kind,data,updated) VALUES (?,?,?,?)').bind(o.id,'opportunity',JSON.stringify(o),now()))]);await audit('Datos de ejemplo cargados',by,'5 clientes ficticios y 4 oportunidades ficticias.');for(const [ci,oi] of [[0,0],[0,1],[3,2]])await newCase(seedClients[ci].id,ops[oi].id,by);return state();}
async function newCase(clientId:string,opId:string,by:Actor){const [client,op]=await Promise.all([get(clientId),get(opId)]);if(!client?.profile||!op?.title)throw Error('Cliente o convocatoria inexistente');const id='case:'+clientId+':'+opId;const previous=await get(id);if(previous)return previous;
const docs:any=await db().prepare('SELECT * FROM documents WHERE client_id=? AND approved=1').bind(clientId).all();
const reusable=await withDocumentMeta(docs.results);
const data={id,clientId,opId,status:'En preparación',created:now(),updated:now(),communication:'Pendiente',communicationVersion:op.version,requirements:(op.requirements||[]).map((r:any)=>{const type=typeof r==='string'?r:r.type;const d=findReusable(reusable,clientId,type,now().slice(0,10));return {id:uid('req-'),type,docId:d?.id||null,reused:!!d};}),notes:'',dismissReason:''};
await save('case',data);await audit('Expediente abierto',by,client.profile.name+' · '+op.title,id);return data;}
async function removeClient(id:string,by:Actor){const c=await get(id);if(!c?.profile)throw Error('Cliente no encontrado');const cases=(await all('case')).filter((x:any)=>x.clientId===id);if(cases.length)throw Error('El cliente tiene expedientes. Puedes marcarlo como inactivo en su ficha.');const docs:any=await db().prepare('SELECT id FROM documents WHERE client_id=? LIMIT 1').bind(id).first();if(docs)throw Error('El cliente tiene documentos asociados.');await db().prepare('DELETE FROM records WHERE id=? AND kind=?').bind(id,'client').run();await audit('Cliente eliminado',by,c.profile.name);}
async function saveClient(data:any,by:Actor){const profile:any=validateProfile(data.profile);const old=data.id?await get(data.id):null;if(data.id&&!old?.profile)throw Error('Cliente no encontrado');const item={id:old?.id||uid('cli-'),profile,demo:old?.demo??false,created:old?.created||now(),updated:now()};await save('client',item);await audit(old?'Ficha actualizada':'Cliente creado',by,profile.name);return item;}
function validUrl(raw:string){try{const u=new URL(raw);return u.protocol==='https:'&&!u.username&&!u.password;}catch{return false;}}
async function putOpportunity(raw:any,by:Actor){
 if(!raw.title||typeof raw.title!=='string'||raw.title.length>600)throw Error('Título obligatorio, máximo 600 caracteres.');
 if(!['Ayuda','Subvención','Licitación'].includes(raw.type))throw Error('Tipo de oportunidad inválido.');
 const sources=(raw.sources||[]).slice(0,15);if(!raw.demo&&!sources.length)throw Error('Las oportunidades reales necesitan al menos una fuente.');
 if(sources.some((s:any)=>!validUrl(s.url)))throw Error('Las fuentes deben usar HTTPS.');
 let old=raw.id?await get(raw.id):null;
 if(!old){const existing=await all('opportunity');old=existing.find((o:any)=>(raw.externalId&&o.externalId===raw.externalId)||sources.some((s:any)=>(o.sources||[]).some((v:any)=>v.url===s.url)));}
 const id=old?.title?old.id:uid('op-');
 const rules=(raw.rules||[]).slice(0,60);for(const r of rules){if(!FIELDS.some((f:any)=>f.key===r.field)||!['eq','in','contains','lte','gte'].includes(r.op)||r.value===undefined)throw Error('Criterio de encaje inválido.');if(r.op==='in'&&!Array.isArray(r.value))throw Error('El criterio in necesita una lista.');}
 if(raw.deadline&&(!/^\d{4}-\d{2}-\d{2}$/.test(raw.deadline)||isNaN(Date.parse(raw.deadline))))throw Error('Fecha límite inválida');
 const requirements=(raw.requirements||[]).slice(0,60).map((r:any)=>typeof r==='string'?r:String(r.type||'')).filter(Boolean);if(requirements.some((r:string)=>r.length>180))throw Error('Nombre de documento demasiado largo');
 const amount=raw.amount===''||raw.amount==null?null:Number(raw.amount);if(amount!==null&&(!Number.isFinite(amount)||amount<0))throw Error('Importe inválido');
 const item={...old,id,title:raw.title,type:raw.type,organism:String(raw.organism||'').slice(0,300),summary:String(raw.summary||'').slice(0,15000),deadline:raw.deadline||null,amount,sector:String(raw.sector||'Todos').slice(0,150),tag:String(raw.tag||'Revisión').slice(0,100),rules,requirements,sources,verified:raw.verified===true,demo:old?.demo??raw.demo===true,externalId:old?.externalId||raw.externalId||null,version:old?old.version+1:1,created:old?.created||now(),updated:now(),change:old?'Actualización':'Nueva'};
 if(old){const keys=['title','type','organism','summary','deadline','amount','sector','tag','rules','requirements','sources','verified'];if(keys.every(k=>JSON.stringify((old as any)[k]??null)===JSON.stringify((item as any)[k]??null)))return old;await save('version',{id:uid('ver-'),opId:id,version:old.version,data:old,at:now()});}
 await save('opportunity',item);await audit('Oportunidad actualizada',by,item.title);return item;
}
function cleanHtml(s:string){return s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/\s+/g,' ').trim();}
async function fetchBounded(url:string){const r=await fetch(url,{signal:AbortSignal.timeout(25000),headers:{'User-Agent':'Atlante/1.0 (public opportunity monitoring)','Accept':'application/json,text/html,application/atom+xml'}});if(!r.ok)throw Error('HTTP '+r.status);const txt=await r.text();if(txt.length>7_000_000)throw Error('Respuesta demasiado grande');return txt;}
async function hash(text:string){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text));return Array.from(new Uint8Array(b)).map(b=>b.toString(16).padStart(2,'0')).join('');}
async function ingestExternal(externalId:string,partial:any){
 const id='ext-'+await hash(externalId);const old=await get(id);const fp=await hash(JSON.stringify(partial));if(old?.fingerprint===fp&&!old.screenedOut)return {created:0,changed:0};
 // A feed change invalidates prior analysis. Old analysis is kept in version history.
 if(old)await save('version',{id:uid('ver-'),opId:id,version:old.version,data:old,at:now()});
 await save('opportunity',{...partial,id,externalId,fingerprint:fp,demo:false,verified:false,rules:[],requirements:[],amount:null,deadline:null,screenedOut:false,screeningReason:null,version:(old?.version||0)+1,created:old?.created||now(),updated:now(),change:old?'Actualización':'Nueva'});
 return {created:old?0:1,changed:old?1:0};
}
async function screenOutExisting(externalId:string,reason:string){
 const id='ext-'+await hash(externalId),old=await get(id);
 if(old?.title&&!old.screenedOut){await save('opportunity',{...old,screenedOut:true,screeningReason:reason,updated:now()});return 1;}
 return 0;
}
async function scan(by:Actor='Revisión programada'){
 const clients=await all('client');if(!clients.length)return {skipped:true,message:'Añade al menos un cliente antes de consultar las fuentes.'};
 const prev=await get('scan-lock');if(prev&&Date.now()-Date.parse(prev.at)<120000)throw Error('Ya hay una revisión en curso. Espera unos instantes.');
 await save('lock',{id:'scan-lock',at:now()});
 const results:any[]=[];
 try{
 for(const src of SOURCES){
  let result:any={id:'source-'+src.id,sourceId:src.id,checked:now(),status:'error',new:0,changed:0};
  try{
   if(src.id==='bdns'){
    let content:any[]=[];let complete=false;
    // Search national and Canary territorial announcements. Page-bounded, never claimed exhaustive.
    for(let page=0;page<2;page++){const data=JSON.parse(await fetchBounded(src.home+'?page='+page+'&pageSize=50&order=fechaRecepcion&direccion=desc'));if(!Array.isArray(data.content))throw Error('Formato de BDNS no reconocido');content.push(...data.content);if(data.last||data.content.length<50){complete=true;break;}}
    const recent=content.filter(x=>{const t=String(x.descripcion||'')+' '+String(x.nivel2||'');return /canari|tenerife|palmas|lanzarote|fuerteventura|gomera|hierro|la palma/i.test(t)||String(x.nivel1||'').includes('ESTADO');});
    for(const x of recent.slice(0,65)){const code=x.numeroConvocatoria;if(!code)continue;const r=await ingestExternal('BDNS:'+code,{title:String(x.descripcion||'Convocatoria BDNS '+code),type:'Subvención',organism:[x.nivel2,x.nivel3].filter(Boolean).join(' · '),summary:'Publicación detectada en BDNS. Es necesario consultar las bases completas para verificar requisitos, importe y plazo.',sector:'Todos',tag:'Pendiente de análisis',sources:[{name:'BDNS · '+code,url:'https://www.infosubvenciones.es/bdnstrans/GE/es/convocatoria/'+encodeURIComponent(code),section:'Ficha de convocatoria; bases pendientes de analizar'}],published:x.fechaRecepcion});result.new+=r.created;result.changed+=r.changed;}
    result.status='partial';result.message='Consultadas hasta 100 publicaciones recientes; '+recent.length+' candidatas por territorio/órgano. Bases y encaje pendientes de análisis; cobertura no exhaustiva.';
   }else if(src.id==='placsp'){
    const xml=await fetchBounded(src.home!);if(!xml.includes('<feed'))throw Error('El portal no ha devuelto un feed Atom');
    const entries=xml.match(/<entry[\s>][\s\S]*?<\/entry>/g)||[];
    const relevant:string[]=[];let screened=0;
    for(const entry of entries.filter(e=>/canari|tenerife|palmas|lanzarote|fuerteventura|gomera|hierro|ES70|ámbito nacional|territorio nacional/i.test(e))){const id=entry.match(/<id[^>]*>([\s\S]*?)<\/id>/)?.[1];if(!id)continue;const territory=placspTerritory(entry);if(territory.relevant)relevant.push(entry);else screened+=await screenOutExisting('PLACSP:'+id,territory.reason+(territory.names.length?': '+territory.names.join(', '):''));}
    for(const entry of relevant.slice(0,40)){
     const id=entry.match(/<id[^>]*>([\s\S]*?)<\/id>/)?.[1];const title=cleanHtml(entry.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1]||'');const href=entry.match(/<link[^>]*href="([^"]+)"/)?.[1]?.replace(/&amp;/g,'&');if(!id||!title||!href||!validUrl(href))continue;
     const r=await ingestExternal('PLACSP:'+id,{title,type:'Licitación',organism:'Plataforma de Contratación del Sector Público',summary:'Anuncio detectado en el feed de contratación. Pliegos, solvencia y plazo pendientes de análisis.',sector:'Todos',tag:'Pendiente de análisis',sources:[{name:'PLACSP',url:href,section:'Anuncio y pliegos; análisis pendiente'}],published:entry.match(/<updated>([^<]+)<\/updated>/)?.[1]});result.new+=r.created;result.changed+=r.changed;
    }
    result.status='partial';result.screenedOut=screened;result.message='Consultada la página actual del feed de perfiles alojados. Se ha usado la ubicación de ejecución, no las notas horarias del anuncio; '+screened+' anuncios previos apartados por territorio. Pendientes agregación autonómica, paginación, pliegos y análisis.';
   }else{
    const entry=src.id==='bopsct'?'https://www.bopsantacruzdetenerife.es/bopsc2/main1.php':src.id==='boplp'?'https://www.boplaspalmas.net/nbop2/main1.php':src.url;const html=await fetchBounded(entry);const relevant=cleanHtml(html).slice(0,65000);if(relevant.length<150)throw Error('El portal ha devuelto contenido insuficiente');
    const fp=await hash(relevant);const old=await get('source-'+src.id);result.contentChanged=!!old?.fingerprint&&old.fingerprint!==fp;result.fingerprint=fp;result.status='partial';result.message='Índice accesible. Solo se comprueba el índice y sus cambios; todavía no se importan anuncios ni se leen los PDF de este boletín. Cobertura parcial, independiente del análisis con IA.';result.preview=relevant.slice(0,700);
   }
   result.lastSuccess=now();
  }catch(e:any){const old=await get('source-'+src.id);result.lastSuccess=old?.lastSuccess||null;result.message=String(e.message||e).slice(0,400);}
  await save('source',result);results.push(result);
 }
 await audit('Consulta de fuentes',by,results.filter(r=>r.status==='error').length+' incidencias; las fuentes parciales necesitan análisis.');
 return {results};
 }finally{await db().prepare('DELETE FROM records WHERE id=?').bind('scan-lock').run();}
}
async function handle(request:Request){
 try{
 const url=new URL(request.url);const path=url.pathname.replace(/^\/api\/?/,'');const signed=await account(request);const by=signed.identity;
 if(request.method!=='GET')checkOrigin(request);
 if(path==='agency'&&request.method==='POST'){const data=await body(request);const name=String(data.name||'').trim();if(!name||name.length>120)throw Error('Indica el nombre de tu asesoría');const previous=await get('settings');if(previous?.agencyName)throw Error('Tu asesoría ya está creada');await save('settings',{...defaults,agencyName:name,contactEmail:by.email});await audit('Asesoría creada',by,name);return json({ok:true});}
 if(path==='state'&&request.method==='GET')return json({...await state(),actor:by.name,currentUser:signed.profile,team:(await all('member')).map((m:any)=>({userId:m.userId,name:m.name,email:m.email,department:m.department,joined:m.joined}))});
 if(path==='account'&&request.method==='POST'){if(!signed.profile)return json({error:'Inicia sesión con tu cuenta personal'},401);const data=await body(request);const name=String(data.name||'').trim();const department=String(data.department||'').trim();const signature=String(data.signature||'').trim();if(!name||name.length>160||department.length>120||signature.length>2000)throw Error('Revisa los datos del perfil');const profile={...signed.profile,name,department,signature,welcomed:true,updated:now()};await save('member',profile);await audit('Perfil personal actualizado',by,'Perfil y firma guardados');return json(profile);}
 if(path==='account/welcome'&&request.method==='POST'){if(!signed.profile)return json({error:'Inicia sesión con tu cuenta personal'},401);await save('member',{...signed.profile,welcomed:true});return json({ok:true});}
 if(path==='cases/history'&&request.method==='GET'){const id=url.searchParams.get('id');const application=id?await get(id):null;if(!application?.clientId)throw Error('Expediente no encontrado');const records:any=await db().prepare("SELECT data FROM records WHERE kind='audit' AND json_extract(data,'$.caseId')=? ORDER BY updated DESC").bind(id).all();return json(records.results.map((r:any)=>JSON.parse(r.data)));}
 if(path==='initialize'&&request.method==='POST')return json(await initialize(by));
 if(path==='clients'&&request.method==='POST')return json(await saveClient(await body(request),by));
 if(path==='clients/import'&&request.method==='POST'){
  const data=await body(request);if(!Array.isArray(data.clients)||data.clients.length>500)throw Error('Máximo 500 clientes por importación.');
  const incoming=data.clients.map((c:any)=>({profile:validateProfile(c.profile)}));const existing=await all('client');const seen=new Set<string>();let count=0;
  // Entire file validated, including duplicates, before performing any writes.
  for(const c of incoming){const key=c.profile.taxId?String(c.profile.taxId).toUpperCase():'name:'+c.profile.name.toLowerCase();if(seen.has(key))throw Error('Cliente duplicado en el archivo: '+c.profile.name);seen.add(key);if(existing.some((x:any)=>(c.profile.taxId&&String(x.profile.taxId).toUpperCase()===String(c.profile.taxId).toUpperCase())||x.profile.name.toLowerCase()===c.profile.name.toLowerCase()))throw Error('Ya existe el cliente '+c.profile.name+'. Edita su ficha para actualizarlo.');}
  const items=incoming.map((c:any)=>({id:uid('cli-'),profile:c.profile,demo:false,created:now(),updated:now()}));
  if(items.length)await db().batch(items.map((c:any)=>db().prepare('INSERT INTO records (id,kind,data,updated) VALUES (?,?,?,?)').bind(c.id,'client',JSON.stringify(c),now())));
  await audit('Importación de clientes',by,items.length+' fichas importadas');return json({count:items.length});
 }
 if(path.startsWith('clients/')&&request.method==='DELETE'){await removeClient(decodeURIComponent(path.slice(8)),by);return json({ok:true});}
 if(path==='opportunities'&&request.method==='POST')return json(await putOpportunity(await body(request),by));
 if(path==='opportunities/ignore'&&request.method==='POST'){
  const data=await body(request);const ids=data.ids;
  if(!Array.isArray(ids)||!ids.length||ids.length>500||ids.some((id:any)=>typeof id!=='string'||id.length>200)||new Set(ids).size!==ids.length||typeof data.ignored!=='boolean')throw Error('Selección de convocatorias inválida');
  const opportunities=await Promise.all(ids.map((id:string)=>get(id)));
  if(opportunities.some((o:any)=>!o?.title))throw Error('Una convocatoria no existe en esta asesoría');
  if(data.ignored){const cases=await all('case');if(cases.some((c:any)=>ids.includes(c.opId)&&!['Descartado','No cumple'].includes(c.communication)))throw Error('Una convocatoria tiene un expediente activo; gestiona primero ese expediente');}
  const at=now();const items=ids.map((id:string,i:number)=>({id:'ignored-opportunity:'+id,opId:id,status:data.ignored?'ignored':'active',version:opportunities[i].version,at,...actorFields(by)}));
  await db().batch(items.map((item:any)=>db().prepare('INSERT INTO records (id,kind,data,updated) VALUES (?,?,?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data,updated=excluded.updated').bind(item.id,'ignored-opportunity',JSON.stringify(item),at)));
  await audit(data.ignored?'Convocatorias marcadas No interesa':'Convocatorias recuperadas',by,ids.length+' convocatoria(s): '+opportunities.map((o:any)=>o.title).join(' · ').slice(0,1500));
  return json({count:ids.length,ignored:data.ignored});
 }
 if(path==='scan'&&request.method==='POST')return json(await scan(by));
 if(path==='settings/schedule'&&request.method==='POST'){
  const data=await body(request);if(typeof data.automationId!=='string'||data.automationId.length>180||typeof data.status!=='string')throw Error('Referencia de programación inválida');
  const settings={...defaults,...await get('settings'),automationId:data.automationId,enabled:data.enabled===true,scheduleStatus:data.status.slice(0,250)};await save('settings',settings);await audit('Programación registrada',by,settings.scheduleStatus);return json(settings);
 }
 if(path==='settings/identity'&&request.method==='POST'){const data=await body(request);const fields:any={};for(const [key,max] of Object.entries({agencyName:120,contactEmail:254})){if(typeof data[key]!=='string'||data[key].length>max)throw Error('Datos de asesoría inválidos');fields[key]=data[key].trim();}if(!fields.agencyName)throw Error('Indica el nombre de la asesoría');if(fields.contactEmail&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.contactEmail))throw Error('Correo inválido');const settings={...defaults,...await get('settings'),...fields};await save('settings',settings);await audit('Datos de asesoría actualizados',by,'Datos comunes de la asesoría actualizados');return json(settings);}
 if(path==='settings'&&request.method==='POST'){const data=await body(request);if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(data.readyTime))throw Error('Hora inválida');const settings={...defaults,...await get('settings'),readyTime:data.readyTime,window:Math.min(60,Math.max(1,Number(data.window)||15)),scope:String(data.scope||defaults.scope).slice(0,200),timezone:'Atlantic/Canary'};await save('settings',settings);await audit('Preferencias actualizadas',by,'Horario deseado '+settings.readyTime+' Atlantic/Canary. Los cambios de automatización deben aplicarse desde el chat.');return json(settings);}
 if(path==='decisions'&&request.method==='POST'){const data=await body(request);const c=await get(data.clientId),o=await get(data.opId);if(!c?.profile||!o?.title||!['dismissed','active'].includes(data.status))throw Error('Decisión inválida');const reason=String(data.reason||'').trim().slice(0,1500);if(data.status==='dismissed'&&!reason)throw Error('Indica el motivo');const item={id:'decision:'+c.id+':'+o.id,clientId:c.id,opId:o.id,status:data.status,reason,at:now(),...actorFields(by)};await save('decision',item);await audit('Encaje actualizado',by,c.profile.name+' · '+o.title+' · '+reason);return json(item);}
 if(path==='cases'&&request.method==='POST'){const data=await body(request);return json(await newCase(data.clientId,data.opId,by));}
 if(path==='cases/update'&&request.method==='POST'){
  const data=await body(request);const item=await get(data.id);if(!item?.opId)throw Error('Expediente no encontrado');
  if(data.status!==undefined){if(!STATUSES.includes(data.status))throw Error('Estado inválido');item.status=data.status;}
  if(data.communication!==undefined){if(!['Pendiente','Borrador revisado','Abierto en Gmail','Comunicado','Descartado','No cumple'].includes(data.communication))throw Error('Estado de comunicación inválido');item.communication=data.communication;if(['Descartado','No cumple'].includes(data.communication))item.dismissReason=String(data.dismissReason||'').slice(0,1500);}
  if(data.mail!==undefined){if(typeof data.mail.subject!=='string'||typeof data.mail.body!=='string'||data.mail.body.length>20000)throw Error('Borrador inválido');item.mail={to:String(data.mail.to||'').slice(0,254),subject:data.mail.subject.slice(0,500),body:data.mail.body};}
  if(data.notes!==undefined)item.notes=String(data.notes).slice(0,6000);
  if(data.requirements!==undefined){if(!Array.isArray(data.requirements)||data.requirements.length>60)throw Error('Lista de documentos inválida');for(const r of data.requirements){if(!r.type||String(r.type).length>180)throw Error('Tipo documental inválido');if(r.docId){const d:any=await db().prepare('SELECT * FROM documents WHERE id=? AND client_id=?').bind(r.docId,item.clientId).first();if(!d)throw Error('Documento ajeno o inexistente');}}item.requirements=data.requirements;}
  item.updated=now();await save('case',item);await audit('Expediente actualizado',by,(data.communication||data.status||'Documentación / notas / borrador'),item.id);return json(item);
 }
 if(path==='documents'&&request.method==='POST'){
  if(!env.BUCKET)throw Error('El almacenamiento de archivos no está disponible.');
  const form=await request.formData();const file=form.get('file');if(!(file instanceof File)||file.size===0)throw Error('Selecciona un archivo con contenido');if(file.size>20*1024*1024)throw Error('El archivo supera 20 MB.');
  const clientId=String(form.get('clientId')||'');const client=await get(clientId);if(!client?.profile)throw Error('Cliente no encontrado');
  const type=String(form.get('type')||'Otro documento').slice(0,180);const caseId=String(form.get('caseId')||'');const application=caseId?await get(caseId):null;if(caseId&&application?.clientId!==clientId)throw Error('Expediente no válido');
  const op=application?await get(application.opId):null;const category=op?.type==='Licitación'?'Licitaciones':op?.type==='Subvención'?'Subvenciones':op?'Ayudas':'Documentos del cliente';
  const id=uid('doc-');const folder=op?safe(op.title)+' '+now().slice(0,7):'Archivo permanente';const key='asesorias/'+tenant+'/'+category+'/'+safe(client.profile.name)+'/'+folder+'/'+id+'_'+safe(file.name);
  const expires=String(form.get('expires')||'');if(expires&&!/^\d{4}-\d{2}-\d{2}$/.test(expires))throw Error('Fecha de caducidad inválida');
  const scope=form.get('scope')==='library'||!caseId?'library':'case';const year=String(form.get('year')||'');if(year&&!/^20\d{2}$/.test(year))throw Error('Ejercicio inválido');
  await env.BUCKET.put(key,file.stream(),{httpMetadata:{contentType:'application/octet-stream'}});
  try{await db().prepare('INSERT INTO documents (id,client_id,case_id,type,name,key,size,mime,created,actor,expires,approved) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)').bind(id,clientId,caseId||null,type,safe(file.name),key,file.size,file.type||'application/octet-stream',now(),actorFields(by).actor,expires||null,0).run();}catch(e){await env.BUCKET.delete(key);throw e;}
  await save('document-meta',{id:'document-meta:'+id,docId:id,values:{scope,year,...actorFields(by)}});
  if(application){const reqId=String(form.get('reqId')||'');const req=application.requirements.find((r:any)=>r.id===reqId);if(req){if(req.docId){const previous:any=await db().prepare('SELECT name FROM documents WHERE id=?').bind(req.docId).first();await audit('Documento sustituido',by,req.type+' · '+(previous?.name||req.docId)+' → '+safe(file.name),caseId);}req.docId=id;req.reused=false;application.updated=now();await save('case',application);}}
  await audit('Documento subido',by,type+' · '+safe(file.name),caseId||undefined);return json({id,key});
 }
 if(path==='documents/review'&&request.method==='POST'){const data=await body(request);const d:any=await db().prepare('SELECT * FROM documents WHERE id=?').bind(data.id).first();if(!d)throw Error('Documento inexistente');const scope=data.scope==='library'?'library':'case';const year=String(data.year||'');if(year&&!/^20\d{2}$/.test(year))throw Error('Ejercicio inválido');if(data.approved&&scope!=='library')throw Error('Solo se reutilizan documentos del archivo general');if(data.approved&&/cuentas anuales/i.test(d.type)&&!year)throw Error('Indica el ejercicio de las cuentas');const expires=data.expires||null;if(expires&&!/^\d{4}-\d{2}-\d{2}$/.test(expires))throw Error('Fecha inválida');await db().prepare('UPDATE documents SET approved=?,expires=? WHERE id=?').bind(data.approved?1:0,expires,d.id).run();await save('document-meta',{id:'document-meta:'+d.id,docId:d.id,values:{...(await get('document-meta:'+d.id))?.values,scope,year}});await audit('Documento revisado',by,d.name+(data.approved?' · Apto para reutilizar':' · Reutilización desactivada'),d.case_id);return json({ok:true});}
 if(path.startsWith('documents/')&&request.method==='GET'){const d:any=await db().prepare('SELECT * FROM documents WHERE id=?').bind(decodeURIComponent(path.slice(10))).first();if(!d)return json({error:'Documento no encontrado'},404);const file=await env.BUCKET?.get(d.key);if(!file)return json({error:'Archivo no disponible'},404);return new Response(file.body,{headers:{'Content-Type':'application/octet-stream','Content-Disposition':"attachment; filename*=UTF-8''"+encodeURIComponent(d.name),'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});}
 if(path==='sources'&&request.method==='POST'){const data=await body(request);const name=String(data.name||'').trim().slice(0,120);if(!name||!validUrl(data.url))throw Error('Indica nombre y enlace HTTPS válido');const parsed=new URL(data.url);if(parsed.port||!parsed.hostname.includes('.')||/[\[\]:]/.test(parsed.hostname)||/^\d+\./.test(parsed.hostname)||/\.(local|localhost|internal)$/.test(parsed.hostname))throw Error('Usa el dominio público de la fuente');parsed.hash='';const existing=await all('custom-source');if(existing.some((x:any)=>x.url===parsed.href)||SOURCES.some(x=>x.url===parsed.href))throw Error('La fuente ya está registrada');const item={id:uid('custom-source-'),name,url:parsed.href,notes:String(data.notes||'').slice(0,1000),mode:'manual',created:now()};await save('custom-source',item);await audit('Fuente añadida',by,name+' · Consulta manual, lector pendiente');return json(item);}
 if(path==='cases/reuse'&&request.method==='POST'){const data=await body(request);const application=await get(data.id);if(!application?.clientId)throw Error('Expediente inexistente');const docs:any=await db().prepare('SELECT * FROM documents WHERE client_id=? AND approved=1').bind(application.clientId).all();const available=await withDocumentMeta(docs.results);let count=0;for(const r of application.requirements){if(r.docId)continue;const d=findReusable(available,application.clientId,r.type,now().slice(0,10));if(d){r.docId=d.id;r.reused=true;count++;}}application.updated=now();await save('case',application);await audit('Archivo reutilizado',by,count+' documentos vinculados',application.id);return json({count});}
 if(path==='backup'&&request.method==='GET')return json({format:'atlante-1',exported:now(),...await state()});
 return json({error:'Operación no encontrada'},404);
 }catch(e:any){return json({error:String(e.message||'Error inesperado')},400);}
}
const mcpTools=[
{name:'get_workspace',description:'Lee clientes, oportunidades, expedientes, fuentes, preferencias e historial del espacio privado.',inputSchema:{type:'object',properties:{},additionalProperties:false}},
{name:'scan_sources',description:'Consulta las fuentes oficiales configuradas y guarda anuncios detectados sin inventar requisitos. Omite si no hay clientes.',inputSchema:{type:'object',properties:{},additionalProperties:false}},
{name:'upsert_opportunities',description:'Guarda análisis documentales contrastados con fuentes. Para actualizar usa id existente. No dupliques convocatorias ni inventes requisitos. verified solo tras leer bases completas. Cada fuente debe identificar URL y apartado. Conserva el identificador de convocatoria y distingue nuevas convocatorias de cambios.',inputSchema:{type:'object',properties:{opportunities:{type:'array',maxItems:30,items:{type:'object',properties:{id:{type:'string'},title:{type:'string'},type:{type:'string',enum:['Ayuda','Subvención','Licitación']},organism:{type:'string'},summary:{type:'string'},deadline:{type:['string','null']},amount:{type:['number','null']},sector:{type:'string'},tag:{type:'string'},externalId:{type:'string'},verified:{type:'boolean'},rules:{type:'array',items:{type:'object',properties:{field:{type:'string'},op:{type:'string',enum:['eq','in','contains','lte','gte']},value:{},label:{type:'string'}},required:['field','op','value']}},requirements:{type:'array',items:{type:'string'}},sources:{type:'array',items:{type:'object',properties:{name:{type:'string'},url:{type:'string'},section:{type:'string'}},required:['url','section']}}},required:['title','type','sources']}}},required:['opportunities'],additionalProperties:false}},
{name:'initialize_examples',description:'Carga únicamente los datos ficticios iniciales si todavía no hay clientes. Acción solicitada por el usuario para probar la aplicación.',inputSchema:{type:'object',properties:{},additionalProperties:false}}
];
async function mcp(request:Request){
 try{const rpc=await body(request);let result:any;
 if(rpc.method==='server/discover')result={supportedVersions:['2026-07-28'],capabilities:{tools:{}}};
 else if(rpc.method==='initialize')result={protocolVersion:'2025-03-26',capabilities:{tools:{}},serverInfo:{name:'atlante',version:'1.0.0'}};
 else if(rpc.method==='tools/list')result={tools:mcpTools};
 else if(rpc.method==='notifications/initialized')return new Response(null,{status:204});
 else if(rpc.method==='tools/call'){
 const name=rpc.params?.name;let output:any;const signed=await account(request);
 try{if(name==='get_workspace')output={...await state(),fieldDictionary:FIELDS};else if(name==='scan_sources')output=await scan(signed.identity);else if(name==='initialize_examples')output=await initialize(signed.identity);else if(name==='upsert_opportunities'){const list=rpc.params?.arguments?.opportunities;if(!Array.isArray(list)||list.length>30)throw Error('Lista inválida');output=[];for(const op of list)output.push(await putOpportunity(op,signed.identity));}else throw Error('Herramienta desconocida');result={content:[{type:'text',text:JSON.stringify(output)}]};}catch(e:any){result={isError:true,content:[{type:'text',text:e.message}]};}
 }else return json({jsonrpc:'2.0',id:rpc.id,error:{code:-32601,message:'Método no encontrado'}});
 return json({jsonrpc:'2.0',id:rpc.id,result});
 }catch(e:any){return json({jsonrpc:'2.0',id:null,error:{code:-32603,message:e.message}},400);}
}

return {handle,mcp};
}
async function authorized(request:Request,mode:'handle'|'mcp'){
 const identity=requestIdentity(request);
 if(!identity.id)return Response.json({error:'Inicia sesión para acceder a tu asesoría',signIn:true},{status:401,headers:{'Cache-Control':'private, no-store'}});
 const tenant=await tenantId(identity.id);
 if(!env.DB)return Response.json({error:'Base de datos no disponible'},{status:503});
 // Preserve the original owner's workspace exactly once. Other accounts start empty.
 if(identity.email?.toLowerCase()==='eduardoamarogarcia@gmail.com'){
 const migrated=await env.DB.prepare("SELECT tenant_id FROM tenant_migrations WHERE name='original-workspace'").first();
 if(!migrated)await env.DB.batch([
 env.DB.prepare("INSERT OR IGNORE INTO tenant_records SELECT ?,id,kind,data,updated FROM records WHERE NOT EXISTS (SELECT 1 FROM tenant_migrations WHERE name='original-workspace')").bind(tenant),
 env.DB.prepare("INSERT OR IGNORE INTO tenant_documents SELECT ?,id,client_id,case_id,type,name,key,size,mime,created,actor,expires,approved FROM documents WHERE NOT EXISTS (SELECT 1 FROM tenant_migrations WHERE name='original-workspace')").bind(tenant),
 env.DB.prepare("INSERT OR IGNORE INTO tenant_migrations(name,tenant_id) VALUES ('original-workspace',?)").bind(tenant)
 ]);
 }
 return workspace(tenant)[mode](request);
}
export const handle=(request:Request)=>authorized(request,'handle');
export const mcp=(request:Request)=>authorized(request,'mcp');
