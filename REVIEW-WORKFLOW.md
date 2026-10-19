# Revisión diaria de Atlante

Cada cuenta autenticada tiene un espacio propio. El acceso a la página puede ser público, pero las rutas de datos requieren una identidad de ChatGPT. Las fichas y oportunidades marcadas demo son ficticias. Nunca enviar correos ni presentar solicitudes.

1. Leer GET /api/state de este Site mediante acceso de servicio. Si no hay clientes activos, omitir la investigación y registrar el motivo. Las preferencias están en settings: horario deseado de disponibilidad, ventana de urgencias y ámbito.
2. Consultar BDNS, Plataforma de Contratación del Sector Público, BOC, BOP Santa Cruz de Tenerife y BOP Las Palmas. Usar POST /api/scan con cuerpo {} para registrar la consulta técnica inicial. Sus conectores son acotados: no confundir ese resultado con lectura completa de bases o con cobertura total.
3. Investigar las publicaciones desde la última revisión, además de cambios en convocatorias activas. Leer bases, convocatoria, correcciones, anexos y pliegos. Si no es posible leer un documento o calcular un plazo, dejarlo pendiente y registrar la limitación en summary y sources.section.
4. Unificar publicaciones del mismo procedimiento por identificador BDNS, expediente de contratación y referencias cruzadas. Una nueva convocatoria tiene identidad propia; una corrección conserva id y aumenta versión solo si el contenido cambia. Buscar en opportunities antes de crear. No deduplicar solo por título.
5. Guardar cada oportunidad mediante POST /api/opportunities: resumen claro, plazo absoluto confirmado (o null), importe con contexto (o null), requisitos documentales reales, criterios verificables y fuentes con URL HTTPS y apartado. Cada regla usa una clave del diccionario disponible en GET /client-schema.json. Se aplica AND entre reglas; in admite alternativas para una misma variable. Excepciones o condiciones complejas se explican en summary, pendientes de revisión.
6. verified=true solo tras leer y contrastar las bases completas. No equivale a confirmar elegibilidad de un cliente. Los vacíos de ficha son desconocidos. No inferir situación tributaria, solvencia, discapacidad u otras condiciones.
7. No volver a crear expedientes ni comunicaciones. El estado Comunicado, Descartado o No cumple bloquea el botón de Gmail; los cambios se muestran para revisión humana.
8. Verificar GET /api/state después de guardar. Informar únicamente de fallos, cambios relevantes o acciones necesarias; no enviar mensajes rutinarios si nada cambia.

## Alcance comprobado de la primera entrega

Datos persistentes D1; documentos privados R2; 107 variables; importación CSV validada; expedientes únicos por cliente y convocatoria; comunicaciones editables; composición en Gmail sin envío; documentos con fecha y autor; reutilización previa revisión; copia opcional a carpeta local elegida en navegador compatible.

La consulta HTTP de BDNS y feed PLACSP es parcial. BOC/BOP requieren análisis documental por el agente o por la persona. No hay OCR automático ni modelo de IA embebido en la web. La revisión de fondo para múltiples asesorías no está activada: cada revisión debe disponer de identidad y autorización del espacio correspondiente. /mcp requiere su propia autorización OAuth. Si el acceso del Site no está disponible, debe señalarse y no simular resultados.

## Operación

Cambiar la hora en la web guarda una preferencia; para modificar la programación cloud hay que aplicar ese horario desde el chat con las herramientas de tareas conservando el vínculo al Site. Drive no está conectado. La conexión futura requiere una integración autorizada y verificar que permite las acciones de escritura necesarias. Se puede seleccionar una carpeta de Drive para escritorio sincronizada como carpeta local.

Los documentos se sirven como descargas, nunca se ejecutan como HTML. Se limita cada archivo a 20 MB. Las escrituras del navegador requieren mismo origen. La publicación puede ser pública para permitir el alta, pero los datos requieren autenticación.

## Acceso de servicio y contrato de actualización

Obtén el Site vinculado con la herramienta nativa get_site y conserva su audiencia configurada. No uses siwc_bypass_bearer_token como sustituto de una sesión autenticada: no identifica la asesoría ni autoriza las rutas de datos. Una revisión de fondo requiere un mecanismo adicional de autorización por asesoría antes de poder ejecutarse para varias cuentas. No escribas credenciales en archivos, mensajes, registros o prompts. No las envíes a las fuentes oficiales. Esta vía no concede consentimiento para Gmail ni acceso OAuth a /mcp.

Puedes recuperar estas instrucciones en GET /review-workflow.txt y el diccionario de las 107 variables en GET /client-schema.json. La API de datos requiere identidad de usuario y devuelve JSON; comprueba estado HTTP y error antes de continuar. GET /api/state contiene clients, opportunities, cases, settings y sources de la cuenta autenticada. Conserva los registros demo: no mezcles datos ficticios y publicaciones reales.

POST /api/opportunities recibe un objeto con id existente al actualizar, externalId canónico (BDNS:código o PLACSP:expediente), title, type (Ayuda, Subvención, Licitación), organism, summary, deadline (AAAA-MM-DD o null), amount (número o null), sector, tag, verified (booleano), rules (field, op, value, label), requirements (lista de nombres de documentos) y sources (name, url HTTPS, section). Al crear una publicación real omite demo o usa false. Las reglas admiten eq, in, contains, lte y gte. No inventes valores ni conviertas datos desconocidos en condiciones cumplidas. Para duplicados, busca primero externalId y referencias documentales; no unifiques distintas convocatorias solo por título. Las actualizaciones idénticas no deben generar nuevas versiones.

Las respuestas de escritura deben leerse de nuevo en /api/state. Si se desconoce el resultado de una escritura, inspecciona el estado antes de reintentar. Reintenta como máximo una vez los fallos transitorios de lectura; respeta Retry-After. No republiques el Site durante revisiones rutinarias.
