import test from 'node:test';
import assert from 'node:assert/strict';
import {findReusable,reusableDocument} from '../public/archive.js';
const doc={id:'doc',client_id:'one',scope:'library',approved:1,type:'Cuentas anuales',year:'2025',created:'2026-10-01'};
test('cuentas: exige mismo cliente y ejercicio explícito',()=>{
 assert.equal(reusableDocument(doc,'one','Cuentas anuales 2025','2026-10-19'),true);
 assert.equal(reusableDocument(doc,'two','Cuentas anuales 2025','2026-10-19'),false);
 assert.equal(reusableDocument(doc,'one','Cuentas anuales 2024','2026-10-19'),false);
 assert.equal(reusableDocument(doc,'one','Cuentas anuales','2026-10-19'),false);
});
test('no reutiliza archivos de trámite, pendientes o caducados',()=>{
 for(const change of [{scope:'case'},{approved:0},{expires:'2026-10-18'}])assert.equal(reusableDocument({...doc,...change},'one','Cuentas anuales 2025','2026-10-19'),false);
});
test('elige versión más reciente sin eliminar la anterior',()=>{
 const docs=[{...doc,id:'old'},{...doc,id:'new',created:'2026-10-15'}];
 assert.equal(findReusable(docs,'one','Cuentas anuales 2025','2026-10-19').id,'new');assert.equal(docs.length,2);
});
