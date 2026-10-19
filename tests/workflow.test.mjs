import {test} from 'node:test';
import assert from 'node:assert/strict';
import {preliminary,calendarRange,isRequested} from '../public/workflow.js';
test('sector diferente sin evidencia queda pendiente, no es una coincidencia',()=>{assert.equal(preliminary({profile:{sector:'Pesca'}},{title:'Ayudas a la hostelería'}).status,'unknown');});
test('coincidencia de tema no sustituye requisitos expresos ni plazo',()=>{const c={profile:{sector:'Pesca',employees:20}},o={title:'Ayudas pesqueras',rules:[{field:'employees',op:'lte',value:10}]};assert.equal(preliminary(c,o).status,'excluded');assert.equal(preliminary(c,{title:'Ayudas pesqueras',deadline:'2020-01-01'}).status,'excluded');assert.equal(preliminary(c,{title:'Ayudas pesqueras'}).status,'potential');});
test('licitación de un comprador hostelero no clasifica al proveedor como hostelero',()=>{assert.equal(preliminary({profile:{sector:'Hostelería'}},{title:'Obras para hostelería',type:'Licitación'}).status,'unknown');});
test('retiradas no cuentan como solicitudes y no se destruye expediente',()=>{assert.equal(isRequested({communication:'Pendiente'},null),true);assert.equal(isRequested({communication:'No cumple'},null),false);assert.equal(isRequested({}, {status:'dismissed'}),false);});
test('calendario conserva semanas completas al cruzar mes y año',()=>{assert.deepEqual(calendarRange('2027-01-01','week'),['2026-12-28','2026-12-29','2026-12-30','2026-12-31','2027-01-01','2027-01-02','2027-01-03']);assert.equal(calendarRange('2026-02-28','fortnight').length,14);assert.equal(calendarRange('2026-02-28','month').length,42);});
