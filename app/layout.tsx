import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title:'Atlante · Ayudas y oportunidades', description:'El espacio de trabajo de tu asesoría. Oportunidades, clientes y expedientes en un solo lugar.', manifest:'/manifest.webmanifest', appleWebApp:{capable:true,statusBarStyle:'default',title:'Atlante'}, icons:{icon:'/favicon.svg',apple:'/icon-192.png'} };
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="es"><body>{children}<script src="/pwa.js" defer></script></body></html>; }