'use client';
import { useEffect } from 'react';
export default function Dashboard() {
 useEffect(() => { const s = document.createElement('script'); s.src='/app.js'; s.type='module'; document.body.appendChild(s); return () => { s.remove(); }; }, []);
 return <div id="app"><div style={{padding:60,color:'rgb(44,76,69)'}}>Cargando tu espacio de trabajo…</div></div>;
}
