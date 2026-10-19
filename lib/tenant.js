// SQL is authored by the application, never supplied by visitors. Fail closed.
export function scopedSQL(sql, tenant) {
  if (!/^[a-f0-9]{64}$/.test(tenant)) throw Error('Espacio inválido');
  const scope = `tenant_id='${tenant}'`;
  if (/^SELECT /i.test(sql)) return sql.replace(/\bFROM (records|documents)\b/g, (_, t) => `FROM (SELECT * FROM tenant_${t} WHERE ${scope})`);
  if (/^INSERT INTO (records|documents) /i.test(sql)) return sql
    .replace(/^INSERT INTO (records|documents) \(/i, (_, t) => `INSERT INTO tenant_${t} (tenant_id,`)
    .replace(/VALUES \(/i, `VALUES ('${tenant}',`)
    .replace('ON CONFLICT(id)', 'ON CONFLICT(tenant_id,id)');
  if (/^(DELETE FROM|UPDATE) (records|documents) /i.test(sql)) return sql
    .replace(/^(DELETE FROM|UPDATE) (records|documents) /i, '$1 tenant_$2 ')
    .replace('WHERE ', `WHERE ${scope} AND `);
  throw Error('Operación de datos no autorizada');
}
export async function tenantId(userId) {
  if (!userId) throw Error('Inicia sesión para acceder a tu asesoría');
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(userId));
  return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
}
