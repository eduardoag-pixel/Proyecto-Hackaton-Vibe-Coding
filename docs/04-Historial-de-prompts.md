# Historial de prompts de Atlante

Documento independiente de la documentación técnica. Transcripción cronológica de las instrucciones y preguntas enviadas por el usuario durante el desarrollo en **Codex con el complemento Sites**. Se han eliminado bloques automáticos de contexto del navegador y se ha sustituido un correo personal por una indicación de omisión. No se atribuyen prompts a plataformas de IA que no constan en esta conversación.

## 01 · 15/10/26, 22:10 · Codex / Sites

[@Sites](plugin://sites@openai-curated-remote) Estoy trabajando como consultor para una asesoría en la adopción de la IA en su empresa y trabajando con el departamento de administración he detectado que la chica de administración pasa muchísimo tiempo entrando a diferentes portales de subvenciones, licitaciones y ayudas, además de estar de alta en correo en diferentes correos de información que le envían cuando hay una nueva notificación de una ayuda, subvención, etcétera. Entonces esto dice que le consume mucho tiempo porque no es solo entrar en esas páginas, sino que te tienes que leer todas las bases que tiene cada una de esas ayudas y luego que ella va uno a uno pensando, aunque ya lo tiene en su cabeza segmentado, a qué empresas y a qué autónomos dentro de los que lleva la asesoría les podría interesar esa ayuda. Entonces paralelamente ella tiene un documento con correos tipo que luego adapta según la ayuda que sea y se lo manda a todos esos clientes que pudieran estar interesados. Entonces, ¿qué es lo que yo quiero hacer? Lo que quiero es que crees una especie de dashboard que lea diariamente todos estos portales, que haga un resumen de las diferentes ayudas que hay, aunque no quiero que repita una que ya ha comentado en el pasado, a no ser que sea una nueva convocatoria de esta o haya una nueva notificación o un cambio en las bases. Quiero que lea todas las bases y los requisitos que tienen estas ayudas, subvenciones o licitaciones y que las resuma. Después quiero que en esa aplicación o ese dashboard también haya un apartado de clientes en el que estén todos los clientes, como si fuera un Excel o algo similar, y que estén todos los clientes de la asesoría segmentados por muchas categorías, como exactamente en qué municipio están y en qué ciudad o en qué zona, cuál es el sector al que se dedican, tamaño de empleados, o sea tamaño del equipo, es decir, muchísimas variables de las que luego nosotros podamos filtrar para saber si pudiera o podría acceder a una subvención, licitación, ayuda o no. Entonces con todo esto yo lo que quiero es que diariamente tú accedas a estos portales, saques un resumen y luego hagas un listado de las empresas que podrían interesarse en solicitar esas ayudas, subvenciones o licitaciones. y posteriormente que automatizaras después de esto generar un borrador en Gmail con un correo tipo de informando al cliente de: oye, que sea especificado para el cliente, el nombre del cliente que sea, que reúna resumidamente y en palabras que el cliente pueda entender los requerimientos, las bases y los plazos que tiene esta ayuda y que no se lo mande directamente, sino que la propia persona encargada del departamento de administración, departamento de administración ficticio, se lo tuviera que mirar primero o tuviera que revisarlo antes de mandarlo.

Además, quiero que la aplicación o el dashboard funcione como un gestor de archivos. Es decir, un problema que tienen en la... bueno, en la... no. En el departamento de administración de la empresa es que todos estos documentos que se necesitan para una ayuda le van llegando en diferentes formatos y en diferentes vías. A lo mejor le mandan un WhatsApp con una imagen que tiene unos datos, luego le mandan por correo otra cosa que tiene otro dato, luego van a la propia asesoría en persona y le dan un documento en persona, en físico. Entonces, a mí lo que me gustaría es que dentro de esta aplicación también hubiera un apartado en el que cada cliente tuviera a su vez un apartado y cada cliente tuviera un apartado por todas las ayudas que se quieran abrir. Pero básicamente lo ideal sería que tú entraras en ese cliente y para abrir una nueva carpeta dentro de ese cliente te pusiera como abrir nueva carpeta y esa carpeta se llamaría algo así como el nombre de la ayuda, el cliente que es, o al revés, el cliente que es, el nombre de la ayuda y la fecha en la que se está solicitando o el mes en el que se está solicitando. Y después que cada vez que el cliente mandara eso, pues la chica de administración pudiera abrir esa carpeta dentro del dashboard y subir ese documento que lo subiría ya asociado a la base o a los requerimientos que está pidiendo la ayuda. No sé si me estoy explicando muy bien, pero bueno. Tú imagínate que se abre una ayuda ahora en octubre y esa ayuda necesita que, para que te la estudien desde el gobierno o desde el Estado, necesita que tú subas cuatro archivos. Pues uno es el objeto social de la empresa, otro es una declaración, lo estoy inventando, declaración de si has recibido ayudas en el pasado, lo otro son las cuentas anuales, etcétera. Pues al saber esos cuatro requisitos, yo quisiera que al tú entrar a la carpeta de esa ayuda o alguna vez crearla, ya esa carpeta tuviera cuatro apartados en los que estuviera, pues, el objeto social, que sea un listado, pero que dentro de cada línea de ese listado tú tengas la opción de subir ese documento. Es decir, a la persona, imagínate, a la administración le llega por correo, pues simplemente se la descarga, entra en el dashboard y ahí lo sube. O sea, imagínate que le llegó en el correo el objeto social de la empresa, pues ella se mete en la carpeta de la ayuda dentro del dashboard y va a la línea de objeto social y ahí hay un apartado para subir un documento. Pues simplemente lo coge, lo desplaza, lo sube ahí y eso ya hace que se le guarde en una carpeta en local que sea ayudas, licitaciones y subvenciones. Luego tres carpetas que sean una de ayudas, otra licitaciones y otra subvenciones y dentro de cada una están los diferentes clientes que han solicitado cada una de ellas. Entonces tú luego te irías al nombre del cliente, que a lo mejor ponle tú que la empresa se llama Pepito Juan, pues te irías a, si fuera una ayuda, pues te irías a ayudas Pepito Juan, que sería una carpeta y ahí te saldría el nombre de la ayuda: ayuda X o Pepito Juan ayuda X D octubre del 2026 y dentro de ahí ya estarían organizados los cuatro documentos. ¿Esto qué hace? Que sea muchísimo más fácil de organizar y no tenga que estar descargándole, cambiándole el nombre, guardándolo en una carpeta, sino que toda la gestión sea desde el dashboard y luego automáticamente eso se mueva a una carpeta para que esté organizado en local si ella luego lo quiere mirar.

Además, querría que en la página principal de este dashboard o de este site hubiera tanto un apartado en el que tú puedas entrar uno a uno en los clientes y ver las ayudas que han solicitado y en qué punto está la solicitud de cada uno. Además, me gustaría que cuando se suba un documento salga como una etiqueta al lado en el que ponga, pues subido el 15 del 10 a las 7:22, por ejemplo. Y claro, así ya tú ves que el objeto social se ha subido este día. Así una persona, imagínate que la chica de administración se va de vacaciones, pues puede acceder otra compañera y entender perfectamente cuál ha sido el seguimiento a lo largo del tiempo, pese a no tener ni idea. Vale. Pues entonces, aparte de esta pestaña en la que estén por orden alfabético, por ejemplo, todos los clientes y se pueden ver las ayudas que se han pedido, ahí estaría bien que dentro de todos esos clientes que estuvieran por orden alfabético hubiera una opción de filtrado, como si fuera cuando vas a comprar en una tienda de ropa como Zalando, que tú puedes filtrar precio, talla, color, marca, todo eso. Pues lo que aquí podrías es solo poner ayudas, solo subvenciones o solo licitaciones, solo de un sector, que sea el pesquero, por ejemplo, no sé, me lo estoy inventando, pero diferentes sectores, que sea ayuda de más de X cantidad, ayuda de... ¿sabes? O sea, varias o diferentes variables que puedan luego facilitar el encontrar una ayuda. Y luego, en la otra pestaña lo que quiero es que, claro, como las ayudas, licitaciones y subvenciones tienen unos plazos para subir la documentación, yo lo que quiero es que cuando algo esté cercano a que se pase el momento de presentarlo y aún no lo ha mandado o aún no se ha subido al apartado de esa base o ese requerimiento que tiene la ayuda, pues que tú en esa pestaña hagas un listado de lo que urge, de menos tiempo para actuar a más. Pero claro, siempre con un límite. No vas a avisar, no vas a tener ahí todos los avisos, incluso el de una empresa que tienes que entregar un papel dentro de seis meses. Evidentemente no. A lo mejor que sea, pues lo que tienes que entregar en los próximos 15 días, ¿sabes? Pues a lo mejor tienes que entregar el objeto social en dos días de esta empresa para la ayuda tal. Vale, pues eso va primero. y después necesitas entregar una declaración de lo que se invertiría el dinero de no sé qué o de cuál es el proyecto que se tiene para una empresa del sector de la industria que es de aquí a 12 días. Pues eso, pues que a lo mejor en esos 15 días lo que tengas más cercano lo vayas poniendo para que la administración vaya gestionando directamente las notificaciones que tienen más urgencia.

Vale, en cuanto a especificaciones de documentación, quiero que te bases en las siguientes fuentes que tendrás que entrar una vez al día, por ejemplo, a las 8 de la mañana para que la chica de administración cuando llegue a su trabajo a su jornada laboral ya esta tarea de investigación esté hecha y simplemente se pueda poner a gestionar y a pedirle a los clientes la información. Entonces quiero que te bases en la BDNS, que es de subvenciones y ayudas; después quiero que te bases en la plataforma de contratación, que es de licitaciones; y el BOC. Además de, como estamos en Canarias, el boletín provincial o el boletín oficial de las dos provincias que hay en Canarias, que uno es el boletín de Santa Cruz de Tenerife y el otro es el boletín de Las Palmas.

Debes tener cuidado con no repetir ayudas, subvenciones, solicitudes. Es decir, a lo mejor una ayuda se anuncia tanto en una de las fuentes que te he dado como en otra. Entonces no seas redundante, no lo mandes dos veces. También debes fijarte en que si ya se ha... claro no. Entonces debe haber también en cada una de las ayudas un apartadito que sea como un check en el que la chica de administración ponga si se le ha mandado el correo o no. Entonces, o sea, en el correo de esa ayuda. Entonces tú tienes que ver que si se ha mandado ese correo no se lo vuelvas a enviar otra vez. O no hagas ese borrador de nuevo para no estar repitiendo varias veces la comunicación al cliente. También debería haber una casilla de rechazada o otra casilla que sea no cumple con los términos. Al final estos requerimientos a veces son más complicados y no es simplemente un documento sino que es una línea general y después hay más información detrás y cuando se pone a investigar la chica de administración con el cliente al final no puede optar a esa ayuda o a esa subvención. Entonces que una vez esto se sepa que la propia chica de administración vaya a ese cliente a esa ayuda y pueda poner al final, al final, como que pueda ticar la casilla de finalmente no puede acceder o no puede optar a esta ayuda y así que también sepas que no tienes que generar más correos tipo borrador. Aunque ahora pensándolo estaría bastante bien que ese correo borrador fuera un borrador debajo de la página esa que ha entrado de la ayuda y que fuera como cuando estás haciendo un borrador en Gmail y que simplemente tú al pulsar un botón ahí ya te lo lleve a Gmail.

En cuanto al diseño que quiero que tenga la página web o el dashboard, debo decirte que quiero que la estética sea premium, que se sienta oficial y un sitio de renombre o de alto prestigio. Y luego, a la hora de medir los criterios de calidad, yo a lo mejor soy demasiado exigente, pero mi objetivo sería que hicieras un buen resumen de la base, que no te inventaras nada. Y a lo mejor, si no tienes algo claro, no sé si esto, investiga tú si crees que es necesario o no, el hecho de hacer un chatbot de IA que esté conectado a estas fuentes que te he mencionado antes y que si la chica de administración tiene alguna duda acerca de qué significa un requerimiento, o sea, qué significa, perdón, una de las bases que incluye la ayuda, o si esa base está muy resumida y realmente necesita una explicación mucho más en profundidad, que tú se la des, o si eso no hace falta y ya directamente con las bases una chica de administración que está acostumbrada a trabajar con esto no tendría problema para ello y sería más fácil luego que tú simplemente le dijeras de dónde ha sacado la información, ¿sabes? tras cada ayuda que salga tú le pongas por fuente esta página web, apartado tal, apartado tal, para filtro tal, pues algo así y que eso dejaría de complicarnos el programa. Pero eso, básicamente quiero tanto que lleguen diariamente, que no haya demasiado desfase al subir la ayuda. ¿Qué más quiero? Quiero además que los correos borradores, pues sean de un tono profesional, correcto y que estén resumidos o que tengan un lenguaje que pueda ser entendible para los clientes, que no tienen por qué ser expertos en lenguaje de asesoría ni de subvenciones, ayudas o licitaciones. Otro criterio que yo valoraría como que estaría el programa bien o que tendría una calidad es que funcionara bien este borrador o el botón que yo imagino que pasaría del programa Al correo. Es decir, que fuera relativamente rápido y automático el hecho de que yo al pulsar el correo borrador, es decir, como que esa persona valora que ese cliente le puede interesar, pues entonces que automáticamente se abra Gmail con la cuenta de esta chica y que se haga el borrador rápido dirigido al correo de ese cliente. Entonces sí que estaría bien que dentro de cada cliente hubiera una especie de ficha en la que hubiera, pues datos básicos de este. Es más, si esto se pudiera incluir en el archivo, estaría bien que una vez el cliente, por ejemplo, lo que te decía antes del objeto social, que no sé si es algo que piden para la ayuda, pero inventándome lo que puede aplicar a muchas otras cosas. Si tú interpretas que es el objeto social y guardas dentro de la carpeta, pues documentos del cliente y lo llamas objeto social, estaría bien que cuando se cree una nueva, o sea, cuando la chica de administración abra una nueva carpeta de una nueva ayuda para ese cliente, si una de las bases es subir el objeto social, que tú ya lo tuvieras, ¿sabes? y que ya saliera el apartado que te dije antes, en el que subir cada documentación, pues ya estuviera puesto el objeto social, ya que tú lo tienes ya de tu archivo en local, que es la carpeta de ese cliente. Así no le tienes que estar preguntando cada vez que salga una ayuda por un documento que él lo vas a tener repetido y que ya lo tienes, que puede que no lo sepas que lo tienes, pero lo tienes. Entonces que esto fuera automático. Y, claro, además de eso, ahora pensándolo, lo que debería haber también al principio es una pestaña principal en la que estén las diferentes ayudas que le pueden interesar a todos tus clientes y que haya una pequeña explicación de cada una. Y después de esa explicación y de la base requisitos y plazos, haya como un listado abajo de todas las posibles empresas a las que le interesaría.

En cuanto al formato, quiero que la plataforma sea de un aspecto profesional y fiable y que tenga poco texto, solo el necesario. Quiero que nunca utilices los siguientes colores: un blanco puro, un negro puro, rojo, naranja o colores raros, como pueden ser fluorescentes, etcétera. Y más bien quiero que te bases en colores que transmitan confianza y seguridad. Si antes te decía que no incluyeras el blanco puro y el negro puro, pues que si los incluyes, que sea más bien un blanco roto o un gris oscuro. Y para los detalles, estos colores que transmiten confianza y seguridad pueden ser azules o verdes. Quiero que hagas la web en RGB, es decir, que sean colores digitales para que se pueda ver bien en esta fuente. Y el tipo de tipografía quiero que sea similar a la Swiss Fustat ABC Normal o la Helvética Neue. Si vas a incorporar imágenes, quiero que sean naturales, con personas, para humanizar esta página web y que no sean imágenes de stock artificiales. Y quiero que sean de trabajos variados, es decir, en entornos profesionales, de personas haciendo trabajos variados, y la representación debe ser de adultos y debe haber un número similar de hombres y mujeres y debe ser tanto de empresas como de autónomos. Y en general, pues la página debe ser usable, funcional y agradable.

Por último, dándole una vuelta, no sé si sería mejor que, en vez de nosotros, o si esta idea fuera a venderse, en vez de que nosotros solo hiciéramos una cuenta como pensada para una asesoría que lleva muchísimos otros clientes, que a lo mejor estaría mejor pensado que fuera para el consumidor final, es decir, ese dueño de una empresa o el encargado de llevar estas ayudas, subvenciones de una empresa o autónomo. Que también se podía extender a ayudas para personas normales, etcétera, como bien puede ser un Erasmus, el papeleo que necesita alguien para un Erasmus, para una beca para estudiar una carrera, para una ayuda a la vivienda, etcétera. Es decir, a lo mejor estaría mejor y se haría más dinero que de forma que tú pudieras editar, te tengas que crear una cuenta al entrar y luego ahí dentro, pues hacer un pequeño formulario de lo que eres y que luego ahí te vayan saliendo las diferentes ayudas que te podrían interesar a ti y que tengas un apartado que sea base de datos en el que vayas subiendo, pues eso, si es tu empresa, pues siempre pongo el mismo ejemplo, pero el ejemplo del objeto social de esa empresa, diferentes declaraciones, cuentas anuales, etcétera, que todo eso vaya recogido ahí, que además también te filtre o te haga una tabla por sector, cuántas personas tiene la empresa, facturación... no lo sé. Pues todas las posibles preguntas convertidas en variables, no en preguntas, sino pues eso, número de clientes, o sea, número de trabajadores, de forma que la IA con toda esa información pues pueda ir afinando cada vez más de qué ayudas, subvenciones, o licitaciones le puede interesar a esa persona o a ese autónomo o a ese joven que quiere estudiar y no gastarse una pasta, pues, o a esa empresa. Entonces que pagando una mensualidad se pudiera acceder a todo esto y que a lo mejor, pues, dependiendo de X factor, pues fuera mayor la cuota o que hubiera un porcentaje que tuvieran que pagar por cada ayuda conseguida. No lo sé, estoy dándole una vuelta. También coméntame qué es lo que piensas que sería mejor. ¿Tienes alguna duda antes de desplegar esta web o este dashboard?

---

## 02 · 15/10/26, 22:17 · Codex / Sites

Vale, en cuanto a la primera pregunta, pues a ver, yo creo que lo mejor sería que ya se pudiera utilizar. Es decir, de alguna forma que en el apartado de la base de datos de la aplicación, pues la persona suba todo el listado de clientes que tenga con las diferentes variables que tú creas pertinentes y sea todo lo detallado que lo requiera, no sé si me explico, y que luego así pues esa persona vaya rellenando los datos de cada cliente que tú le exiges y que en base a eso ya haga el filtrado de las ayudas que le puedan encajar o no. Es decir, claro, la primera vez no se va a poder hacer desde las 8 de la mañana, ya que todavía no tendría la base de datos, a no ser que se haga antes con todos los clientes, pero una vez que se tenga, a partir de las 8 o no sé, a lo mejor lo que podemos hacer es que dentro del panel se pueda poner en un apartado cuándo quieres que se haga la revisión o cuándo quieres que esté listo para que luego a partir de que una vez ya rellene la base de datos empiece a hacer ese filtrado y recopilar las nuevas ayudas, subvenciones y licitaciones de ese día y que le lleguen al día siguiente filtrados por lo que encaja con los clientes que hay. Porque evidentemente si no hay cliente, no hay una base de clientes, ninguna ayuda, ninguna licitación, ninguna subvención es útil, porque no va a ayudar a ningún cliente final, que es el objetivo de la asesoría. Vale. En cuanto a la pregunta dos, confirmamos en un poco inicial para asesoría, vale, me parece correcta, es una idea inicial y a lo mejor es menos lioso y puede tener una aplicación directa al caso real de la asesoría. En cuanto a que sea de varios empleados, no sé cuál sería la utilidad de esto. Es decir, a lo mejor estaría bien para ver quién subió cada cosa, es decir en el panel de X subvención para X cliente sí que podemos ver que, me lo invento, Juan María subió el documento de cuentas anuales del registro mercantil tal día. Entonces así sí se puede hacer un seguimiento de quién subió cada cosa. Pero más allá de eso no entiendo por qué. Porque al final lo que interesa es que le llegue al cliente, que se lo mande una persona u otra del departamento o de otro departamento es algo no tan relevante. ¿Dónde deben guardarse los archivos? Pues sí, entre compañeras lo mejor es el almacenamiento compartido, pero como esto necesita unos permisos y primero quiero hacer una demo, no, no una demo, sino cómo lo podría yo aplicar dentro de mi ordenador o una persona que acceda a este programa desde su ordenador y quiera aplicarlo para las empresas que hay de sus amigos y familias, por ejemplo, y él meta a mano esos datos. Es decir, que solo sea un administrador o una persona que está utilizando ese programa. Pues claro, esa sería mi aplicación primera y luego lo de mirar de tenerlo en un drive sería en segundo lugar. Lo único que yo no sé, a lo mejor en Google Drive sí se puede. Explóralo tú y me comentas. Vale, en cuanto a cómo empezamos con clientes Gmail, todo esto tienes que utilizar datos ficticios. Vale, entonces yo lo único que quiero ver es que luego cuando se pulse en ese borrador te lleva a Gmail y se escribe bien el correo en la ubicación, aunque luego no exista el correo y te lo devuelva el buzón y que el texto que estaba dentro de ese correo también sea correcto. Pero el resto no. E insisto, quiero que seas muy específico con todas las variables que haya o que pueda haber y que puedan servir para filtrar correctamente qué clientes pueden acceder o podrían estar interesados en una ayuda o no.

---

## 03 · 16/10/26, 13:19 · Codex / Sites

Autorizar la regeneración de la credencial

---

## 04 · 18/10/26, 18:36 · Codex / Sites

Sabes cuántos registros diarios suele haber dentro de las diferentes fuentes de nuevas ayudas?

---

## 05 · 18/10/26, 18:39 · Codex / Sites

¿Qué significa la fuente Oír e scon? Porque no la había mencionado yo ni me la habías mencionado tú previamente.

---

## 06 · 18/10/26, 18:57 · Codex / Sites

Vale, mi pregunta es que, ¿puede ser que una ayuda que se subió a las plataformas del organismo correspondiente a lo mejor hace cinco años siga estando activo para ciertas empresas? Entonces, ahora, o sea, actualmente, como lo está haciendo, ¿podría ver que hay una ayuda que encaja con la naturaleza de uno de los negocios que tenemos en nuestra base de datos? Una ayuda que se publicó hace cinco años o solo se están estudiando el encaje desde que se empezó a hacer el registro, es decir, hace dos días.

---

## 07 · 18/10/26, 18:59 · Codex / Sites

Si hoy subo a Atlante un nuevo cliente y relleno su ficha, ¿cogería y filtraría el histórico de ayudas que has estudiado para ver si alguna encaja con esta nueva empresa? ¿O sería a partir de mañana, cuando se suba ese nuevo o cuando se haga esa nueva revisión de todas las posibles ayudas?

---

## 08 · 18/10/26, 19:07 · Codex / Sites

Vale, tengo una duda y es que en el apartado de expedientes, por ejemplo, si entramos en Mar de Origen SL en la licitación servicios de asistencia técnica para la gestión, vemos que lo que pone es cero de cero documentos subidos. Entonces entiendo que esto significa o que no hay ningún requisito de subir expedientes o que no está bien configurado y no se está haciendo este listado de requisitos y el apartado de archivo que subir a cada uno de los requisitos. Que luego, por ejemplo, sí que está en Mar de Origen SL en eficiencia energética en la actividad económica, en el que esto es como yo quería que estuviera, que si son cuatro requisitos, pues aquí te salen los cuatro: memoria del proyecto, presupuesto de inversión, certificado AEAT y cuentas anuales, y que tú lo puedas subir aquí y que se guarde en una carpeta en local con el nombre o con el filtro del nombre, las reglas de nombrar que yo te dije previamente. Entonces dime cuál exactamente es el error para que en uno aparezca y en el otro no.

---

## 09 · 18/10/26, 19:15 · Codex / Sites

Vale, entonces, si entiendo bien yo, lo único que estás haciendo bien es sacar o extraer los nombres de las diferentes ayudas que se van publicando cada día y luego hacer ese primer filtro de que empresas podrían encajar. Pues yo lo que querría realmente es que tú te leyeras todos los requisitos o todo el pliego de lo que implica cada ayuda, hicieras un pequeño resumen y pusieras, como en el ejemplo de Mar de Origen SL de la eficiencia energética en la actividad económica, esos diferentes documentos que se deben aportar para luego poder subirlo a la administración y poder optar a esa ayuda. Yo sé que esto a lo mejor consumiría muchísimos tokens, ya que leerse todos los pliegos de tropecientos ayudas que van saliendo cada día, pues puede ser bastante inútil si luego nuestros clientes o no les encajan las ayudas o acaban por no pedirlas. Entonces estaría bien que tú hicieras el primer filtrado como lo tienes ahora mismo, es decir, en oportunidades, pero que luego tú vieras otro que fuera posible encaje o algo así, en el que las filtraras directamente. O mira, no, mejor, incluso que las oportunidades fueran únicamente aquellas que piensas que pueden encajar con los clientes y que dentro de todas estas luego haya una acción de, tras leerla, pulsar algo que fuera como ir un paso más allá y es decir construir esa nueva ficha de documentos que seguir para que haya un filtrado previo y no tener que estar leyendo los requerimientos y pliegos de cada una de las ayudas que salen. ¿Me entiendes o tienes alguna duda antes de proceder?

---

## 10 · 18/10/26, 19:29 · Codex / Sites

que costes de api supone crear una clave

---

## 11 · 18/10/26, 19:33 · Codex / Sites

¿Para qué exactamente nos va a servir tener la API? ¿Por qué es necesario conectarla?

---

## 12 · 18/10/26, 19:35 · Codex / Sites

Pero entonces, ¿para qué o qué estás utilizando actualmente para sacar el apartado de oportunidades? ¿Y por qué no has necesitado API para eso?

---

## 13 · 18/10/26, 19:37 · Codex / Sites

Vale, pero ¿no crees que a lo mejor si pudiéramos limitar de alguna forma, aunque sea un primer filtro, los tipos de empresas por a lo mejor el sector o el número de empleados, algo así, ya se podría limitar esa base de ayudas que llegan? Es que mi duda es que, o mi preocupación, es que de repente en el apartado oportunidades haya, pues, miles de anuncios, de los cuales casi ninguno cuadra con las empresas que tenemos.

---

## 14 · 18/10/26, 19:39 · Codex / Sites

Vale, entonces si te parece una buena idea, detállame en base a qué lo harías y a lo mejor podríamos crear una base de clientes bastante mayor y además que el perfil de ese cliente también fuera más o menos de un sector en específico o a lo mejor hacer una subdivisión. Imagínate que una asesoría tiene 20 clientes: 7 son del sector pesquero y 13 son de industria. Pues que en base a eso ya tú hagas ese filtrado de si a lo mejor te aparece una oferta de hostelería, pues ya sabes que no aplica porque los clientes no son de este sector. Al menos ese sector.

---

## 15 · 18/10/26, 19:42 · Codex / Sites

Vale, entonces, estas ayudas de hostelería, de este caso ficticio del cliente, no llegarían ni siquiera al apartado en Atlante de oportunidades, ¿no? Simplemente saldrían aquellos anuncios que a priori encajan tanto con empresas en general como con las de estos sectores. ¿Es así?

---

## 16 · 18/10/26, 19:46 · Codex / Sites

Vale, perfecto. me parece bien este nuevo apartado de pendientes de clasificar cuando no se tenga claro y que no se descarten inmediatamente o directamente.

 Vale, después quiero cambiar un poco los diferentes apartados que tiene la aplicación. El de urgencias me parece que está bien. A lo mejor se podría poner en formato de calendario para ver en un calendario de un mes para ver cuántos días quedan para presentar X documento y después que mediante un zoom se pudiera hacer más cerca para verlo a nivel semana o dos semanas, etcétera. Después tanto expedientes como documentos los quitaría. Entonces solo serían ese resumen, que tampoco me acaba de convencer mucho, el de oportunidades, que son todo ese primer filtro, que ahora habría que estudiar cómo se haría para luego pasar al segundo filtro y también incluir el apartado de carpeta o una carpeta de ayudas no clasificadas o pendientes de clasificar. Y lo que querría yo es que todas las posibles ayudas que encajen estarían tanto como esas como las solicitadas estarían dentro de la carpeta cliente. Es decir, mi idea o cómo yo lo visualizo en mi mente es: tú entras a la carpeta cliente y en esa carpeta ves un listado de todos los clientes que tienes, no hay nada más. A lo mejor un pequeño filtro arriba a la derecha, pero no hay nada más. Y después, una vez tú clicas dentro de ese cliente debe haber dos pestañas: una de encaje y otra de solicitadas. A lo mejor es mejor que la de solicitadas entre por defecto y luego la de encaje sea un poco para explorar. Es decir, las solicitadas son aquellas que ya se ha actualizado el estado, es decir, como que el cliente está interesado en ellas o ya se ha subido algún documento, es decir, el cliente va a solicitarlas. Y después las de encaje son todas aquellas que pueden encajar con el cliente y que después esas se puedan borrar cuando al cliente no le apetezca acceder a ella o si al final pues no acaba de encajar porque un requisito no lo cumple. ¿Tienes alguna duda antes de proceder?

---

## 17 · 18/10/26, 19:56 · Codex / Sites

ya está todo? se cortó el trabajo mientras lo hacías porque me quedé sin tokens

---

## 18 · 18/10/26, 20:03 · Codex / Sites

ahora quiero que me digas exactamente cómo estás filtrando las oportunidades. y lo que a mí me gustaría es que, aparte de que tú puedas ver como usuario cuál es el criterio utilizado, a lo mejor también te lo puedas modificar o que lo puedas limitar, al menos ese primer filtrado.

---

## 19 · 18/10/26, 20:05 · Codex / Sites

Bueno, a lo mejor no sé si se estaría bien poder cambiar estas reglas, pero al menos verlas. O sea, si hubiera un mini botón en algún sitio de las oportunidades que pusiera revisar filtro y que ahí vea cuál es o por qué está filtrando. Es decir, yo lo que no quiero es que si nuestra empresa que tiene 20 clientes ficticios, esta que te dije antes, en los que siete eran pesqueros o del sector pesquero y tres eran de industria, que de repente mañana entre un cliente de hostelería a la asesoría y de repente pues en Atlante no le salga ninguna ayuda, subvención o licitación nunca porque no cumple con estos requisitos.

---

## 20 · 18/10/26, 21:07 · Codex / Sites

explícame cómo funciona actualmente lo de por verificar y lo de la etiqueta del cliente quiere solicitarla.

---

## 21 · 18/10/26, 21:09 · Codex / Sites

Ya, ya. Ya lo sé que esto no presenta la solicitud ante la administración, pero sí que me gustaría que para conectar la API, que realizara esa investigación más profunda acerca de las bases que requieres ayuda, pues se tuviera que primero pulsar un botón. Y después, por otra parte,

---

## 22 · 18/10/26, 21:11 · Codex / Sites

Vale, lo que me faltó es que si pudieras buscar alguna forma de conseguir sacar la información tanto del BOP de Santa Cruz de Tenerife como del BOP de Las Palmas. Ya que, claro, siendo empresas de aquí, pues sí que nos interesaría tener esta información. No sé si hay alguna otra forma de hacerlo que no sea por API, a lo mejor web scraping y que cada X tiempo, a lo mejor, no sé si consume tokens o se hace de alguna otra forma. A lo mejor que no lo haga con tanta frecuencia, sino a lo mejor tres veces a la semana, lunes, miércoles y viernes. O es que realmente no sé cómo funciona. Entonces explícamelo, a ver si hay alguna forma de que las consultas estas sean totales y no fallidas. Luego, en cuanto a las otras tres fuentes, quiero que me expliques por qué la cobertura es parcial y no es total. ¿Es por la cantidad de información que esto incluye y por eso estamos incorporando el paso de la API para estudiar un poco más a fondo cada nueva convocatoria de ayuda o de subvención o licitación? ¿O es por otra cuestión?

---

## 23 · 18/10/26, 21:13 · Codex / Sites

Vale, pues me parece bien. Si se puede hacer entonces, dale para adelante con ello.

---

## 24 · 18/10/26, 21:13 · Codex / Sites

Esto que me has pedido último de descargar muestras públicas de las cinco fuentes, ¿a qué se refiere? Porque yo entiendo que a lo mejor algunas de estas publicaciones de diferentes ayudas se dan como si fuera un acta o algo así, ¿no?, en formato PDF. Esto, si lo tienes que hacer, me parece bien. Lo único que me gustaría que, en tal caso, crearas dentro de la carpeta a la que te he dado acceso en el formato local, pues una carpeta que sea algo así como publicaciones de ofertas o algo similar, lo que tú pienses que sea un título correcto y así que se vaya guardando cada vez que descargas una cosa nueva.

---

## 25 · 18/10/26, 21:21 · Codex / Sites

Ok. Varias anotaciones o cambios que quiero que tengas en cuenta. El apartado de mi asesoría, al igual que arriba a la derecha, que pone AD, esos no tienen ningún tipo de interacción con el usuario cuando se tocan. Entonces me gustaría saber qué es lo que es y pues eso.

---

## 26 · 18/10/26, 21:22 · Codex / Sites

A ver, sinceramente, viendo lo que hay en configuración, más o menos sería lo mismo. Entonces te propongo fusionarlas en una sola y realmente ya está. Si quieres poner un nuevo apartado que sea de información propia o información personal o algo así, estúdialo y dime qué te parece y en caso de que vengas con una idea que me convenza, lo implementamos.

---

## 27 · 18/10/26, 21:23 · Codex / Sites

Me parece perfecto. va para adentro.

---

## 28 · 19/10/26, 8:45 · Codex / Sites

Vale, lo único que esto va un poco en contra de la idea que te había dicho de que a lo mejor en una misma asesoría a mí me interesa que haya diferentes usuarios. Es decir, imagínate que una asesoría, o en específico este departamento de administración de una asesoría, tiene dos personas trabajando. Pues, sobre todo para poder seguir el registro de quién hizo qué cosa, estaría bien que hubiera usuarios aquí, ¿sabes? Entonces que se cree el nombre de la asesoría y después cada una de esas personas cree su usuario. Entonces todo lo que se toque dentro de ahí va a ver que en el seguimiento se puede ver que esto lo hizo esta persona o esto lo hizo tal persona en esta hora. ¿Entiendes lo que te digo?

---

## 29 · 19/10/26, 10:07 · Codex / Sites

Ahora quiero que imagines o que aumentes el volumen de clientes que tenemos. Es decir, ahora mismo tenemos solo cinco clientes. Imagina que son 50 clientes y quiero que rellenes las fichas de cada uno de ellos para que tengan todos los datos rellenados, ¿vale? Y claro, o sea, te lo tienes que inventar todo, pero que hagas un poquito de variedad dentro de cada uno de los clientes que tenga, aunque sean similares, ¿vale? ¿Entiendes lo que te pido?

---

## 30 · 19/10/26, 10:15 · Codex / Sites

Vale, lo que no me gusta es que en algunos clientes pongas ficticio y en otros, los que ya estaban no. Es decir, por ejemplo, Tiga Ingeniería SL, Verde Isla Agricultura, ¿existían de verdad o no? ¿O te los inventaste de principio? Entonces lo que quiero es que quites todo lo de ficticio de cada uno. Y también me gustaría que fuera un poquito más variado, que no fuera, pues Huerta del Alicio 35, Huerta del Alicio 48, o diferentes estudio Horizonte, Código Insular, tanto, sino que cada uno variar, ¿sabes? Por ejemplo, yo qué sé, bar no sé cuánto que está en Tejeda. Después tenemos a Reparaciones Álex y Nadal que está en Las Palmas. Después tenemos a Taller Chano que está en el polígono de Los Majuelos. No sé, como que haya mucha más variedad y que sea más asimilable o que encaje más con los nombres que se tienen aquí en Canarias. No sé si me explico.

---

## 31 · 19/10/26, 13:25 · Codex / Sites

Vale, lo que no está muy claro aquí es ese paso siguiente de estudiar o que te haga un resumen de la convocatoria. ¿Cómo se haría? Porque eso ahora mismo no lo estamos teniendo. Es decir, te vas a una convocatoria y no están desglosadas las bases, no hay un resumen y demás.

---

## 32 · 19/10/26, 13:28 · Codex / Sites

Vale, pues quiero que lo hagas. quiero que incluyas esta clave API para investigar más en profundidad las bases de una convocatoria. Básicamente también me gustaría que en algún punto de esta app o de esta web se explicara por qué no se ven el resumen y la base de cada una de las nuevas ayudas o licitaciones que entran. Vale, entonces solo como un recordatorio de que el usuario seleccione aquellas de análisis completo, o perdón, o que seleccione aquellas ayudas para que luego las analice, analice sus bases y documentos, solo en aquellos casos en los que crea que realmente hay una posibilidad de implementación, ya que este paso consume bastantes tokens y demás. ¿Alguna forma de recordatorio? No sé dónde lo pondría. Dime ideas.

---

## 33 · 19/10/26, 18:47 · Codex / Sites

Vale, he hablado con mi tutor de empresa y me ha dicho que él cree que se puede hacer sin hacerlo vía API. Es decir, lo que sería automatizar es la web scraping de las diferentes fuentes y si dentro de cada fuente tienes que descargar a lo mejor un PDF, pues que lo descargue, lo guarde en un sitio y luego lo lea. Y que eso se transforme automáticamente, automatizándolo evidentemente en formato .md y que la IA sea la que analice ese archivo .md y luego haga el cruce con los clientes. Mira a ver si esto es posible o si esto tiene sentido o crees que necesariamente necesitamos ese paso intermedio con API para analizar las ayudas.

---

## 34 · 19/10/26, 18:49 · Codex / Sites

Pues adelante, quiero que lo hagas. No sé qué capacidades necesitamos revisar dentro de mi ordenador, pero dime lo que necesitas saber para ello y llévalo a cabo.

---

## 35 · 19/10/26, 19:03 · Codex / Sites

No hay ninguna otra forma en la que cuando yo entre a la oportunidad ya me haga un resumen y los requisitos que implican o que se necesitan para poder optar a esa beca o esa ayuda. Es que no quiero ni que se tenga que conectar una API ni tener que descargarme un modelo local para poder correrlo. O sea, ¿no hay una forma de que se conecte, pues, por internet directamente o en el momento en el que hace la conexión a la hora que hemos preestablecido, de las 8, o sea, de las 8 de la mañana, para ir a buscar los nuevos datos de ayuda y demás? Se conecte eso, lo descargue todo. No sé, no sé cómo hacerlo, la verdad.

---

## 36 · 19/10/26, 19:05 · Codex / Sites

Vale, si no está en la nube, de todas formas no me importaría mucho. Lo que sí es, si yo imagínate que esto no está en la nube, no está automatizado, pero yo cuando entro le doy a un botón de cargar nuevas ayudas, por así decirlo, y eso es lo que lo gestiona. Es decir, tengo que yo encender el portátil o el ordenador, entrar en ese programa y darle a ese botón para que haga toda esa tarea de buscar las nuevas ayudas y el encaje y hacer el resumen. ¿Eso cómo lo haría la IA o cómo lo haría esta web?

---

## 37 · 19/10/26, 19:07 · Codex / Sites

Es que a mí lo que me gustaría es que si yo le paso el enlace este de Sites a otra persona, esa persona pueda hacer lo mismo. Es decir, imagínate que publico hoy esto y dentro de tres días una persona a la que yo le doy acceso pues entra a este link y se descarga o accede a este site, se lo descarga o lo usa y de repente ahí se crea una cuenta, pone su base de datos y lo utiliza. ¿Le funcionaría a esa persona?

---

## 38 · 19/10/26, 19:17 · Codex / Sites

Vale. Pues, ¿cómo puedo incorporar ese modelo de guía? A lo mejor si crees que la mejor forma es una API, pues la puedo poner, si no queda otra. Después también varias cosas que me gustaría cambiar. Por ejemplo, en las fuentes oficiales me gustaría que existiera la opción de añadir una nueva fuente. Después quiero que me expliques por qué la cobertura es parcial en las tres primeras y fallidas el de Santa Cruz de Tenerife y el de Las Palmas. Y también me gustaría que en cada academia... en cada academia, perdón, en cada cliente hubiese un apartado sobre archivo, en sí que sean documentos que ha subido el cliente. Es decir, imagínate que un cliente quiere acceder a una ayuda. Entonces le piden la razón social de la empresa y también le piden las cuentas anuales de este último año. Pues yo quiero que con eso, aparte de guardarlo en el trámite de esa ayuda, tanto en Atlante como en local, en la carpeta que te dije que estuviera asociada, quiero que crees una carpeta aquí dentro de Atlante en la que se vea, no sé cómo llamarla, a lo mejor Documentos de la empresa o Documentos, así, y entonces ahí que haya un desglose de los documentos que ya ha subido importantes, ¿no? No que sean asociados solo a una ayuda. Por ejemplo, que no sea un plan económico para la concesión de la ayuda de no sé qué. No, que sea pues el mismo estilo que te dije antes, como documentos o archivos completos y específicos. Entonces lo que busco con ello es que luego sea el propio Atlante el que cuando salga una nueva ayuda y la persona de administración ponga como que al cliente le interesa y quiere solicitarla, pues que en el subapartado ese de subir la documentación que ya tiene en el archivo, pues ya automáticamente aparezca eso. No sé si me explico.

---

## 39 · 19/10/26, 19:47 · Codex / Sites

Vale. Una cosa que quiero que cambie: configuración y mi asesoría, ¿vale? que son lo mismo, pero hay dos espacios en la barra lateral de forma que puedes acceder a ella. Incluso abajo, donde pone administración, administrador, cuenta privada, también pone exactamente lo mismo. Quiero que solo sea una entrada en la barra lateral, ¿vale? Es decir, se quedarían, pues no sé cómo prefieres llamarla, o configuración, o Mi cuenta, o espacio personal. me da igual, pero eso solo sería una. Después tendrías el resumen, oportunidades, pendientes de clasificar, urgencia y cliente. O no. Es que ese orden no me acaba de gustar cómo está. Entonces, sí, a lo mejor, sí, resumen, urgencia, oportunidades, pendientes de clasificar y debajo cliente y fuentes oficiales. O no sé, estúdialo tú cuál crees que es la mejor forma de ordenarlos, porque no veo claro que oportunidades y pendientes de clasificar tengan en medio a cliente.

---

## 40 · 19/10/26, 19:54 · Codex / Sites

Vale, te quería preguntar porque le he mostrado esta preview de la web a dos personas y ambas me han dicho que, ah, que qué bien, que entienden que esto es para que clientes puedan ver o puedan subir información y que luego automáticamente les vaya proponiendo ayudas a las que poder optar. Sin embargo, no es exactamente lo que busco. Es decir, ¿te acuerdas que eso era como una segunda opción en la que se podía explorar en el futuro? Pero esto realmente está enfocado para asesoría y para que ellos gestionen, bueno, sobre todo, exacto, no sé si todas las asesorías lo harán, pero aquellas asesorías que gestionen las ayudas, subvenciones y licitaciones de sus clientes, pues que puedan hacer un seguimiento mucho más cómodo, un guardado y un archivo de los mismos también mucho más cómodo y rápido y que eso, que quede claro que es para asesoría. Y yo creo que es algo que no está quedando claro. Entonces yo no sé si a lo mejor en la entrada, si aplicamos lo de que se tenga que hacer cada persona un usuario, se pueda ver, pues una pequeña, un pequeño texto en el que sería, pues, la mejor forma de gestionar subvenciones para tus clientes dentro de una asesoría o algo así. No me acaba de sonar muy bien lo que acabo de decir, pero una frase del estilo. y a lo mejor con esa escena de personas que te dije en el prompt inicial. No lo sé. Lo que quiero es que quede más claro y también quiero que implementes lo de los usuarios, si es posible, porque sobre todo lo que quiero es, fíjate, cuando entramos a clientes y vemos las ayudas que han solicitado, ahí está la pestaña seguimiento y en el seguimiento podemos ver quién editó, quién subió algo, etcétera. Entonces, como puede ser que cada departamento tenga más de una persona, a ti pues te puede interesar quién subió qué cosa y qué día, por si hay algún error. Una persona sube un documento en una entrada que no era y entonces se guarda como, por ejemplo, cuentas anuales lo que realmente es, pues un vuelo, ¿sabes? Entonces tienes que ver quién subió eso y así puedes detectar a la persona y pedirle que lo cambie. No sé, un ejemplo que se me acaba de ocurrir. ¿Entiendes lo que te digo?

---

## 41 · 19/10/26, 19:54 · Codex / Sites

Quiero indicar correos y autorizar las invitaciones

---

## 42 · 19/10/26, 19:54 · Codex / Sites

Perdona. No quiero compartir con ninguna persona o autorizar a ninguna persona ya que no soy yo el dueño de la asesoría y no me interesa, sino es más bien como aportarle una solución a la persona de administración de una asesoría. Pero, claro, es algo que todavía lo tienen que revisar mis superiores, entonces no es algo como que se los pueda proponer así libremente y que ellos empiecen a aprobar. Y después, en cuanto a los clientes, documentos y expedientes del espacio compartido, que me parece muy bien, pero ¿cómo se está haciendo? Es decir, cuando se sube un archivo aquí, ¿se queda guardado en esta web? ¿De qué forma?

---

## 43 · 19/10/26, 20:00 · Codex / Sites

A nadie como te dije en el prompt, Mi objetivo final es que Una persona externa con el acceso a este link pueda crear su propia cuenta de asesoría, pueda subir su base de clientes y que en base a eso pueda ver qué posibles ayudas, licitaciones o subvenciones puede optar.

---

## 44 · 19/10/26, 20:03 · Codex / Sites

perfecto, hazlo

---

## 45 · 19/10/26, 20:03 · Codex / Sites

Quiero que sea una PWA para descargarlo tanto en el escritorio como en el móvil

---

## 46 · 19/10/26, 20:21 · Codex / Sites

Me pone al entrar SIWC Site is unavailable

---

## 47 · 19/10/26, 20:27 · Codex / Sites

Pero entonces, ¿cómo se lo puedo pasar a una persona y que esa persona acceda y lo pueda probar y testear la funcionalidad de esta herramienta?

---

## 48 · 19/10/26, 20:29 · Codex / Sites

[correo personal omitido]

---

## 49 · 19/10/26, 20:30 · Codex / Sites

Sí, autorizo que le envíe la invitación a ese correo.

---

## 50 · 19/10/26, 20:30 · Codex / Sites

Y no se lo puedo yo copiar ese enlace y que ella entre desde ahí? Es decir, se lo pego yo, por ejemplo, por el WhatsApp?

---

## 51 · 19/10/26, 20:34 · Codex / Sites

Ahora, cada vez que alguien quiera entrar, le tengo que aceptar como posible persona que se cree o posible cuenta que se cree, una cuenta en el site este de asesoría? O automáticamente si tiene el enlace y ha entrado ya se puede crear su asesoría dentro de Atlante.

---

## 52 · 19/10/26, 20:49 · Codex / Sites

En el apartado de pendientes de clasificar quiero que haya también un botón de no interesa para eliminar esa ayuda. También estaría bien que ese botón estuviera como seleccionar varios, arriba a la derecha, y que pudiera seleccionar cada uno de los diferentes y así eliminar muchos de una en vez de tener que estar entrando uno a uno en cada una de las fichas.

---

## 53 · 19/10/26, 21:00 · Codex / Sites

Lo que me sorprende es que, por ejemplo, muchos de los de pendiente de clasificar, al menos los primeros, todos hablan de que son en Valencia y todos nuestros clientes son de Canarias. ¿Cómo puede ser que no lo clasifique esto como que no aplica para nuestros clientes y que ni pase por pendientes de clasificar, sino que se elimine?

---

## 54 · 19/10/26, 21:02 · Codex / Sites

sigue trabajando, que he Restablecido el uso.

---

## 55 · 19/10/26, 21:02 · Codex / Sites

Vale, tengo que hacer la siguiente documentación para un hackathon acerca de este proyecto. Entonces, basate en ello y créamelo todo ordenado. Si tengo que hacer yo algo, pues me lo dices. Evidentemente el vídeo no tienes que hacerlo, lo hago yo, pero de resto házlo tú todo. Ten en cuenta que hay que editar de alguna forma el programa para que la URL pueda funcionar para una persona que no sea yo. Es decir, una persona que simplemente tenga el link, se pueda registrar y pueda acceder a una asesoría propia y que se la cree esa persona. También quiero que me crees esta o que me cojas esta base de datos que yo he creado de clientes y que la descargues como un CSV de forma que el nuevo usuario que accederá pues pueda subir esta misma base de datos simplemente para probarlo y para probar los filtros y cómo funciona todo esto. ¿Entiendes lo que te pido? También quiero que me expliques paso a paso cómo hacer lo de GitHub, ya que es algo que no he tocado antes.

---

## 56 · 19/10/26, 21:02 · Codex / Sites

Está toda la info que tengo ahí

---

## 57 · 19/10/26, 21:25 · Codex / Sites

Esto es lo que me piden desde la organización del Hackaton:

Entregables Requeridos 
Cada equipo debe crear una única carpeta compartida en Google Drive (obligatoria) que 
contenga los archivos del proyecto y, además, pegar en el formulario oficial el enlace individual 
de cada elemento solicitado. No se aceptan formatos ni documentos distintos a los indicados. 
Estructura de entrega 
La carpeta de Google Drive (obligatoria) debe contener: 
● La Documentación Técnica (Google Doc) 
● El Historial de Prompts (Google Doc aparte) 
● El Video Demostración 
En el formulario se debe pegar el enlace individual de cada uno de estos elementos: 
Entregable 1 — Documentación Técnica (UN SOLO Google Doc) 
Toda la documentación técnica va en un único documento de Google Docs. No se aceptan TXT, 
PDF, Word ni varios documentos separados. Debe contener: 
● Descripción del proyecto 
● Plataforma o plataformas utilizadas (de entre las permitidas) 
● Arquitectura 
● Casos de uso 
● Proceso iterativo (cómo se iteró con la IA) 
● Challenges y soluciones 
● Screenshots (insertados en el documento o en la carpeta) 
Nota: el historial de prompts NO va dentro de este documento; va en su propio documento aparte 
(Entregable 4). 
Entregable 2 — Aplicación Desplegada 
● URL funcional de la aplicación desplegada y utilizable 
● Credenciales de prueba (si aplica) — deben ser cuentas/datos de prueba, nunca reales 
Entregable 3 — Repositorio de Código (GitHub) 
● Enlace al repositorio en GitHub con el código generado 
● Puede ser público o privado 
● Si es privado, debe compartirse con [correo personal omitido] para que el 
jurado pueda revisarlo 
Entregable 4 — Historial de Prompts (Google Doc aparte) 
● Documento de Google Docs independiente de la documentación técnica 
● Debe recoger el historial de prompts utilizados durante el desarrollo 
● Si se han usado varias plataformas, debe indicarse qué prompts corresponden a cada 
una 
Entregable 5 — Video Demostración 
● Duración máxima: 5 minutos 
● Demostración de funcionalidades y explicación del proyecto 
● Alojado en la carpeta de Google Drive

---

