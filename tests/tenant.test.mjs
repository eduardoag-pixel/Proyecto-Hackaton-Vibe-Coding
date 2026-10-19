import {test} from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import fs from 'node:fs';
import {scopedSQL,tenantId} from '../lib/tenant.js';
import {requestIdentity} from '../lib/identity.js';
test('two authenticated accounts cannot read, overwrite or delete each other’s records or documents',async()=>{
 const db=new DatabaseSync(':memory:');db.exec(fs.readFileSync(new URL('../drizzle/0001_tenant_isolation.sql',import.meta.url),'utf8'));
 const a=await tenantId('account-a'),b=await tenantId('account-b');
 const run=(tenant,sql,...args)=>db.prepare(scopedSQL(sql,tenant)).run(...args);
 const rows=(tenant,sql,...args)=>db.prepare(scopedSQL(sql,tenant)).all(...args);
 for(const t of [a,b])run(t,'INSERT INTO records (id,kind,data,updated) VALUES (?,?,?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data,updated=excluded.updated','same-id','client',t,'2026');
 assert.equal(rows(a,'SELECT data FROM records WHERE id=?','same-id')[0].data,a);
 assert.equal(rows(b,'SELECT data FROM records WHERE kind=? ORDER BY updated DESC','client')[0].data,b);
 run(a,'DELETE FROM records WHERE id=?','same-id');assert.equal(rows(b,'SELECT data FROM records WHERE id=?','same-id').length,1);
 run(a,'INSERT INTO documents (id,client_id,case_id,type,name,key,size,mime,created,actor,expires,approved) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)','secret','c',null,'x','accounts.pdf','private-a',1,'pdf','now','A',null,0);
 assert.equal(rows(b,'SELECT * FROM documents WHERE id=?','secret').length,0);
 run(b,'UPDATE documents SET approved=?,expires=? WHERE id=?',1,null,'secret');
 assert.equal(rows(a,'SELECT * FROM documents WHERE id=?','secret')[0].approved,0);
 assert.equal(rows(b,'SELECT * FROM documents ORDER BY created DESC').length,0);
 db.close();
});
test('missing identity cannot select a workspace and service requests are not human users',async()=>{
 await assert.rejects(()=>tenantId(null));
 assert.throws(()=>scopedSQL('SELECT * FROM records',"' OR 1=1"));
 assert.equal(requestIdentity(new Request('https://example.com')).id,null);
 assert.throws(()=>scopedSQL('DROP TABLE records','a'.repeat(64)));
});
