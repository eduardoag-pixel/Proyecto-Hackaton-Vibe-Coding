let installPrompt;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;});
window.addEventListener('appinstalled',()=>{installPrompt=null;});
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));
document.addEventListener('click',async e=>{
 if(!e.target.closest('[data-install-atlante]'))return;
 if(installPrompt){await installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;return;}
 const d=document.createElement('dialog');d.innerHTML='<h2>Instalar Atlante</h2><p>En Chrome o Edge, abre el menú del navegador y elige «Instalar Atlante» o «Instalar esta página como aplicación».</p><p>En iPhone o iPad, abre el enlace en Safari: Compartir → Añadir a pantalla de inicio → Añadir.</p><p>En Android, abre el menú de Chrome y selecciona «Instalar aplicación» o «Añadir a pantalla de inicio».</p><p>Si estás en un navegador integrado, abre primero el enlace en tu navegador habitual. Atlante necesita conexión a internet.</p><form method="dialog"><button class="btn primary">Entendido</button></form>';d.style.cssText='max-width:520px;border:1px solid rgb(210,220,210);border-radius:18px;padding:28px;background:rgb(246,247,242);color:rgb(39,77,66);font:16px/1.6 Arial';document.body.append(d);d.showModal();d.addEventListener('close',()=>d.remove());
});
