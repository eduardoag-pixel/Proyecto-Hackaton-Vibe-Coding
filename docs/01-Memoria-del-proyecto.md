# Atlante: gestión de oportunidades públicas para asesorías

## 1. Problema

Una asesoría que tramita ayudas, subvenciones y licitaciones para varias empresas consulta a diario portales oficiales, interpreta convocatorias extensas, decide qué clientes pueden estar interesados, solicita documentos dispersos y prepara comunicaciones individuales. Esa información suele quedar repartida entre correo, hojas de cálculo, carpetas y la memoria de una persona. El coste es tiempo, riesgo de duplicados, poca trazabilidad y plazos difíciles de seguir.

## 2. Solución y destinatario

Atlante es un espacio de trabajo **para la asesoría**, no un portal de autoservicio para sus clientes. Cada persona que entra con su cuenta de ChatGPT puede crear su propia asesoría e importar su cartera. Los datos de una cuenta se separan de los de las demás.

El flujo propuesto es: importar clientes → consultar fuentes → filtrar anuncios preliminarmente → revisar las bases de los anuncios prometedores → abrir un expediente por cliente y convocatoria → reunir y revisar documentos → seguir el plazo → preparar un correo para revisión humana. El criterio de interés inicial nunca equivale a elegibilidad confirmada.

## 3. Funciones implementadas

- Fichas de cliente con 107 variables agrupadas en ubicación, sector, tamaño, situación administrativa, proyectos y capacidad para licitar. Importación de CSV y exportación de datos.
- Consulta acotada de BDNS y del canal Atom de la Plataforma de Contratación del Sector Público. BOC y boletines provinciales figuran como fuentes, con cobertura parcial indicada en pantalla.
- Oportunidades y anuncios pendientes de clasificar. El primer filtro usa reglas verificables disponibles y señales de actividad o interés; conserva lo incierto para revisión. En licitaciones, el filtro territorial lee el lugar de ejecución del anuncio para evitar falsos positivos causados por menciones incidentales a Canarias.
- Ficha de oportunidad con fuente y estado de análisis. La lectura completa automática de pliegos y bases no está conectada en esta versión: no se presenta como un resumen comprobado lo que todavía no se ha leído.
- Expedientes por cliente y convocatoria, con requisitos documentales definidos para las oportunidades analizadas, subida de archivos, fecha y autor. Los documentos del archivo general se reutilizan tras revisión y si siguen vigentes.
- Urgencias, calendario, seguimiento de acciones y borrador editable que abre Gmail con destinatario, asunto y texto. La persona de administración revisa y envía; Atlante no envía correos ni presenta solicitudes.
- Copia opcional de documentos a una carpeta local elegida en un navegador compatible; alojamiento de documentos en almacenamiento privado del sitio. PWA instalable con conexión a Internet para trabajar con los datos.

## 4. Fuentes y criterio de calidad

Fuentes configuradas: BDNS, Plataforma de Contratación del Sector Público, Boletín Oficial de Canarias, BOP de Santa Cruz de Tenerife y BOP de Las Palmas. La aplicación muestra el resultado de cada consulta y declara cuando la cobertura es parcial o falla. No atribuye requisitos, cuantías o plazos a una convocatoria sin verificarlos en sus bases.

Una publicación detectada puede referirse a una convocatoria ya conocida o a una modificación. Los identificadores de fuente y las versiones evitan que el mismo anuncio se duplique en cada revisión. Los anuncios descartados por el usuario se archivan; una versión nueva puede volver a revisión.

En el caso de licitaciones, “ejecución fuera de Canarias” es un criterio de **relevancia de la cartera de prueba**, no una afirmación jurídica de que una empresa canaria tenga prohibido presentar oferta. Un contrato remoto o una empresa con capacidad de prestación peninsular exigiría ampliar ese criterio.

## 5. Arquitectura y protección de datos

Atlante es una web/PWA alojada en Sites. El servidor procesa la autenticación de ChatGPT; la base de datos D1 conserva fichas y expedientes y R2 guarda los archivos. Cada cuenta autenticada obtiene un espacio separado mediante un identificador estable; las rutas de datos rechazan accesos anónimos. La página pública solo permite llegar a la entrada: consultar o cambiar datos requiere iniciar sesión.

Los 50 clientes entregados para la prueba son **ficticios**. Nombres, correos, identificadores, importes y acreditaciones no deben usarse para trámites reales. El archivo CSV sirve para demostrar el proceso de alta y filtrado de una asesoría nueva sin exponer la cartera de otra persona.

## 6. Estado, límites y siguientes pasos

La versión entregada valida el flujo administrativo, la importación de 50 clientes y la separación entre cuentas. La cobertura de fuentes todavía es parcial; no hay extracción universal de todos los PDF, OCR, análisis completo automático de bases ni cálculo jurídico definitivo de elegibilidad. Cambiar la hora en Configuración guarda una preferencia; no garantiza por sí solo una revisión autónoma diaria. Tampoco hay aún colaboración de varias cuentas dentro de una misma asesoría.

El siguiente desarrollo sería ampliar conectores y paginación, leer documentos oficiales con trazabilidad por apartado, extraer requisitos solo tras esa lectura, ofrecer revisión humana de cada conclusión y permitir varios miembros con permisos y registro individual. Antes de usar datos reales habría que validar privacidad, retención, permisos y procedimientos con la asesoría.

## 7. Valor y evaluación

La propuesta concentra la investigación, el encaje preliminar, los expedientes y la comunicación en un solo flujo. Puede evaluarse con tres pruebas: (1) una cuenta nueva importa los 50 clientes sin ver los datos de otra; (2) un anuncio de Valencia cuya única mención a Canarias es un aviso horario no ocupa la cola de pendientes; (3) una oportunidad analizada permite abrir un expediente, adjuntar un documento y comprobar su registro antes de abrir un borrador en Gmail. La calidad del sistema se mide también por lo que identifica como pendiente de verificar, no solo por el número de resultados mostrados.
