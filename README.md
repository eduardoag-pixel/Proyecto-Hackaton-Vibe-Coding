# Atlante · Ayudas y oportunidades para asesorías

Atlante ayuda a una asesoría a detectar oportunidades públicas para su cartera, organizar expedientes y documentos, vigilar plazos y preparar comunicaciones para revisión humana.

**Aplicación:** https://atlante-ayudas-canarias.sturdypearl6.chatgpt.site/  
**Memoria y guion de prueba:** [docs/00-LEEME.md](docs/00-LEEME.md)  
**Datos ficticios para importar:** [public/50-clientes-ficticios.csv](public/50-clientes-ficticios.csv)

## Entrega del hackathon

- [Carpeta de Google Drive](https://drive.google.com/drive/folders/1VAkXOuo_T0P2_LrwCDl4nFm7fwK2MFUn)
- [Documentación técnica](https://docs.google.com/document/d/1CfwmgYbhBsql8v9iSAZ7eG_AAtOYmKxuuUrQghm0fUg/edit)
- [Historial de prompts](https://docs.google.com/document/d/1fpk5bH0Gf9fg7dsd1DAWq70C3N3Jo-zdIp6Akme9GqQ/edit)

El vídeo de demostración lo prepara el autor y se añadirá a la carpeta de entrega.

## Qué se puede probar

1. Entrar con una cuenta de ChatGPT y crear una asesoría propia.
2. Importar el CSV de 50 clientes ficticios desde Clientes.
3. Consultar fuentes y explorar Oportunidades y Pendientes de clasificar.
4. Abrir un expediente, subir un documento ficticio, seguir el plazo y preparar un borrador de correo.

Cada cuenta dispone de datos separados. El sitio puede abrirse con el enlace, pero los expedientes y archivos solo están disponibles después de iniciar sesión.

## Estado de la versión

El lector de BDNS y del canal Atom de contratación es parcial. BOC y boletines provinciales están registrados, aunque esta versión no importa todos sus anuncios ni lee automáticamente todos los PDF. Las bases de una convocatoria deben revisarse antes de afirmar requisitos o elegibilidad. Atlante no envía correos ni presenta solicitudes. La revisión diaria en segundo plano para múltiples asesorías todavía no está activada.

El filtro territorial de licitaciones utiliza el lugar de ejecución del anuncio: una mención a Canarias en una nota de horario no convierte un contrato ejecutado en Valencia en una oportunidad local. Es un criterio de relevancia para esta cartera, no una exclusión jurídica de licitadores canarios.

## Tecnología

Web/PWA construida con Vinext sobre Sites, base de datos D1 para registros y R2 para archivos. El servidor exige identidad de ChatGPT y separa los datos por cuenta. Los documentos de prueba y las cuentas del CSV son ficticios.

## Código y comprobaciones

- Interfaz y lógica de encaje: `public/`
- API, importación de fuentes y aislamiento: `lib/` y `app/api/`
- Esquema y migraciones: `drizzle/`
- Pruebas: `tests/`

Con Node.js 22.13 o posterior e instalación de dependencias, las comprobaciones básicas son `node --test tests` y `node node_modules/typescript/bin/tsc --project tsconfig.app.json --noEmit`. La publicación de Sites usa su propio flujo de construcción y despliegue; subir cambios a GitHub no actualiza automáticamente la web.

