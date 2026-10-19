# Atlante gestión de ayudas y licitaciones para asesorías

## Descripción del proyecto

Atlante es una aplicación web dirigida al personal de una asesoría que gestiona ayudas, subvenciones y licitaciones para varias empresas y profesionales. Reúne en un mismo flujo la cartera de clientes, los anuncios detectados en fuentes oficiales, un filtro preliminar de interés, expedientes con documentos, un calendario de plazos y borradores de comunicación. La decisión de solicitar una convocatoria y el envío del correo corresponden siempre a una persona.

El problema observado es operativo: una administrativa consulta varias fuentes, lee publicaciones extensas, recuerda qué cliente podría encajar, reúne documentos llegados por vías distintas y organiza carpetas manualmente. El prototipo busca reducir ese trabajo repetitivo y hacer visible qué se ha verificado, qué falta y quién hizo cada cambio.

La versión de prueba está desplegada en https://atlante-ayudas-canarias.sturdypearl6.chatgpt.site/. Una persona con cuenta de ChatGPT puede iniciar sesión, crear su propio espacio de asesoría e importar un CSV de 50 clientes inventados. No se requieren credenciales de prueba compartidas. El CSV público de prueba está en https://atlante-ayudas-canarias.sturdypearl6.chatgpt.site/50-clientes-ficticios.csv.

## Plataformas y herramientas utilizadas

El desarrollo y las iteraciones se realizaron mediante conversaciones con Codex. La interfaz y el servidor se construyeron con Next.js, TypeScript y JavaScript; la aplicación está publicada en Sites y funciona como PWA instalable. Usa D1 para los datos estructurados y R2 para archivos. Google Drive contiene la documentación de entrega y GitHub el código fuente. La lista completa de plataformas admitidas por la organización no figuraba en el enunciado recibido; el equipo debe cotejar estos nombres con esa lista antes de presentar el formulario.

## Arquitectura

1. La interfaz presenta Resumen, Urgencias, Oportunidades, Pendientes de clasificar, Clientes, Fuentes oficiales y Configuración.
2. El servidor valida la sesión de ChatGPT y asocia cada petición al espacio de la asesoría de esa cuenta. Las rutas privadas rechazan el acceso anónimo.
3. D1 almacena clientes, oportunidades, expedientes, seguimiento y referencias documentales. R2 almacena los archivos subidos.
4. Los conectores consultan publicaciones disponibles de la BDNS y de la Plataforma de Contratación del Sector Público. BOC y los BOP de Santa Cruz de Tenerife y Las Palmas se muestran con su estado real de cobertura, que aún es parcial o fallido según la fuente.
5. La clasificación preliminar utiliza datos del anuncio y de la cartera. Los casos con información insuficiente permanecen en Pendientes de clasificar. La persona revisa la fuente antes de abrir un expediente.
6. Un borrador editable abre Gmail con destinatario, asunto y texto. Atlante no envía el correo ni presenta solicitudes administrativas.

El esquema lógico es: fuentes oficiales → lectura de metadatos → normalización y control de duplicados → filtro preliminar → revisión humana de las bases → expediente cliente/convocatoria → documentos y calendario → borrador de correo. La revisión completa automática de PDF, anexos y pliegos mediante IA todavía no está conectada. Por ello el sistema muestra «por verificar» cuando no conoce un requisito o plazo.

## Casos de uso

**Alta de una asesoría.** Una persona entra en la URL, inicia sesión, crea su espacio e importa el CSV de 50 clientes ficticios. Cada ficha contiene ubicación, sector, tamaño y otras variables que ayudan a decidir el encaje preliminar.

**Revisión de oportunidades.** Administración consulta los anuncios candidatos y los pendientes de clasificar, abre la fuente original y decide si una convocatoria merece análisis detallado o no interesa. Un anuncio incierto no se descarta solo por carecer de datos.

**Tramitación.** Si un cliente quiere solicitar una convocatoria, administración abre un expediente, registra los requisitos conocidos, sube documentos a cada requisito, reutiliza documentos generales vigentes y consulta autor y fecha de cada acción. El calendario muestra cierres registrados y separa los que carecen de plazo verificado.

**Comunicación.** Administración adapta el texto propuesto y abre Gmail con un borrador dirigido al cliente. Debe revisarlo y enviarlo manualmente. No se generan comunicaciones repetidas para expedientes marcados como comunicados o descartados.

## Proceso iterativo con IA

El primer planteamiento combinaba un agregador diario, filtros de clientes, archivos y correos. Durante las conversaciones se acotó el producto a asesorías y se abandonó por ahora la versión de autoservicio para particulares. Se añadieron fichas de cliente con más variables, 50 registros inventados, importación CSV y separación de datos por cuenta.

La navegación se reorganizó tras observar que Expedientes y Documentos duplicaban el recorrido de Clientes. Se mantuvo la consulta preliminar en Oportunidades y Pendientes de clasificar, y se trasladó el trabajo de cada solicitud a la ficha del cliente. Las urgencias pasaron a un calendario con vistas de mes, dos semanas y semana.

El usuario detectó que varios anuncios de Valencia entraban en la cola canaria. Se examinó el feed Atom: la palabra Canarias aparecía en una nota horaria, aunque el lugar de ejecución estructurado era Valencia. Se corrigió el filtro para usar ese campo territorial. La nueva versión redujo los falsos positivos observados. El historial de prompts completo se entrega en un Google Doc separado.

## Dificultades y soluciones

**Publicaciones repetidas y cambios.** Se usan identificadores de fuente y versiones para evitar repetir un anuncio sin novedad y para permitir que una nueva versión vuelva a revisión.

**Cobertura desigual.** La consulta de fuentes no equivale a cobertura exhaustiva. La interfaz indica si una fuente tuvo resultado parcial o falló; no oculta esa incertidumbre ni inventa bases o plazos.

**Encaje preliminar frente a elegibilidad.** Un sector o una ubicación pueden sugerir interés, pero la elegibilidad depende de las bases completas. La aplicación conserva los casos dudosos para revisión y muestra «por verificar» cuando falta evidencia.

**Aislamiento entre asesorías.** Las rutas privadas se vinculan a la cuenta autenticada. Una nueva cuenta crea su propio espacio y no recibe la cartera del propietario del prototipo. Los 50 clientes de demostración se importan mediante CSV y sus datos son ficticios.

**Documentos dispersos.** El expediente vincula cada archivo con su requisito, fecha y autor; el archivo general del cliente permite reutilizar documentos vigentes tras revisión. En navegadores compatibles puede mantenerse además una copia local elegida por el usuario.

## Estado comprobado y límites

Se verificaron 22 pruebas automatizadas, el análisis de tipos y la compilación antes del despliegue de esta versión. Se comprobó acceso público a la página y al CSV, y rechazo del acceso anónimo a los datos privados. La prueba completa con una segunda cuenta externa aún debe realizarse antes de la entrega.

La aplicación no analiza automáticamente todos los pliegos y PDF, no garantiza una revisión autónoma diaria a las 8:00 aunque guarde esa preferencia, ni incorpora aún varios empleados bajo una misma asesoría. Tampoco confirma por sí sola el derecho a una ayuda. Los estados «por verificar» requieren revisar la publicación oficial. Antes de usar clientes reales se deben validar las condiciones de privacidad, conservación, permisos y acceso con la asesoría.

## Capturas de la aplicación

Las capturas muestran, por este orden, el resumen, oportunidades, pendientes de clasificar, urgencias y la cartera de clientes. Se tomaron de la versión desplegada para esta entrega.

