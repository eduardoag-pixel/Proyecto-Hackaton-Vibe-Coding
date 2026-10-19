import {test} from 'node:test';
import assert from 'node:assert/strict';
import {placspTerritory} from '../lib/placsp.js';

const entry=(title,location,extra='')=>`<entry><title>${title}</title><summary>Órgano de contratación</summary><cac:RealizedLocation><cbc:CountrySubentityCode>${location}</cbc:CountrySubentityCode></cac:RealizedLocation>${extra}</entry>`;
test('a Canary time-zone reminder does not admit a tender performed in Valencia',()=>{
 const xml=entry('Mantenimiento en Valencia','ES523','<cbc:Description>Horario peninsular (1 hora menos en Canarias)</cbc:Description>');
 assert.equal(placspTerritory(xml).relevant,false);
 assert.match(placspTerritory(xml).reason,/fuera de Canarias/);
});
test('Canary execution or a Canary lot is admitted',()=>{
 assert.equal(placspTerritory(entry('Servicio','ES709')).relevant,true);
 assert.equal(placspTerritory(entry('Servicio','ES523','<cac:RealizedLocation><cbc:CountrySubentityCode>ES705</cbc:CountrySubentityCode></cac:RealizedLocation>')).relevant,true);
});
test('title and contracting body are used only when place is absent',()=>{
 assert.equal(placspTerritory('<entry><title>Servicio en Tenerife</title></entry>').relevant,true);
 assert.equal(placspTerritory(entry('Servicio en Tenerife','ES523')).relevant,false);
});
