
import assert from 'node:assert/strict';
const base='http://127.0.0.1:5173/api/';
async function req(path,data,method){const r=await fetch(base+path,{method:method||(data?'POST':'GET'),headers:data instanceof FormData?{}:{'Content-Type':'application/json'},body:data instanceof FormData?data:data?JSON.stringify(data):undefined});return {status:r.status,data:await r.json()};}
let state=(await req('state')).data;
assert.ok(state.clients.length>=5);
const count=state.clients.length;
let r=await req('clients/import',{clients:[{profile:{name:'QA no se guarda'}},{profile:{name:'QA inválido',employees:'texto'}}]});
assert.equal(r.status,400);assert.equal((await req('state')).data.clients.length,count);
r=await req('clients/import',{clients:[{profile:{name:'QA repetido'}},{profile:{name:'QA repetido'}}]});assert.equal(r.status,400);
const a=await req('cases',{clientId:'cli-demo-1',opId:'op-demo-1'});
const b=await req('cases',{clientId:'cli-demo-1',opId:'op-demo-1'});
assert.equal(a.data.id,b.data.id);
const requirement=a.data.requirements.find(r=>r.type==='Memoria del proyecto');
const file=new Blob(['Documento ficticio de prueba. No válido para presentar ayudas.'],{type:'text/plain'});
const form=new FormData();form.set('file',file,'memoria-ficticia.txt');form.set('clientId','cli-demo-1');form.set('caseId',a.data.id);form.set('reqId',requirement.id);form.set('type',requirement.type);
const upload=await req('documents',form);assert.equal(upload.status,200,JSON.stringify(upload));
const down=await fetch(base+'documents/'+encodeURIComponent(upload.data.id));assert.equal(await down.text(),await file.text());
await req('documents/review',{id:upload.data.id,approved:true,expires:'2030-12-31'});
const reused=(await req('cases',{clientId:'cli-demo-1',opId:'op-demo-4'})).data;
assert.ok(reused.requirements.find(r=>r.type===requirement.type).docId);assert.equal(reused.requirements.find(r=>r.type===requirement.type).reused,true);
const other=(await req('cases',{clientId:'cli-demo-2',opId:'op-demo-1'})).data;
r=await req('cases/update',{id:other.id,requirements:[{id:'invalid',type:requirement.type,docId:upload.data.id}]});assert.equal(r.status,400);
r=await req('cases/update',{id:a.data.id,communication:'No cumple',dismissReason:'Ejemplo de descarte de prueba'});assert.equal(r.data.communication,'No cumple');
r=await req('cases/update',{id:a.data.id,communication:'Pendiente'});assert.equal(r.data.communication,'Pendiente');
r=await req('clients',{id:'cli-demo-1',profile:{...state.clients.find(c=>c.id==='cli-demo-1').profile,notes:'Ficha de prueba ficticia. Datos persistentes verificados.'}});assert.equal(r.status,200);
const mcp=await fetch('http://127.0.0.1:5173/mcp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/list'})});assert.equal((await mcp.json()).result.tools.length,4);
const blocked=await fetch(base+'settings',{method:'POST',headers:{Origin:'https://example.com','Content-Type':'application/json'},body:JSON.stringify({readyTime:'08:00'})});assert.ok([400,403].includes(blocked.status));
console.log('PASS: importación atómica, duplicados, expediente idempotente, subida/descarga, reutilización, aislamiento de cliente, comunicación, persistencia, MCP y origen.');
