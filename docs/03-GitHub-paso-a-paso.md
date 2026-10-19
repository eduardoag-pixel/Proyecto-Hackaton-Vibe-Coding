# Cómo subir Atlante a GitHub desde Windows

Puedes hacerlo sin usar comandos. GitHub servirá para mostrar y conservar el código; **subirlo a GitHub no publica ni actualiza automáticamente el sitio de Sites**.

1. Crea una cuenta en https://github.com/ e inicia sesión. Instala **GitHub Desktop** desde https://desktop.github.com/ e inicia sesión allí con la misma cuenta.
2. Localiza la carpeta del proyecto en el Explorador de Windows: `Proyecto Dashboard de Subvenciones, Licitaciones y Ayudas\sites\atlante`. Es la copia del código que se entrega, no la carpeta de `Clientes ficticios`.
3. En GitHub Desktop, elige **File → Add local repository** y selecciona esa carpeta. Si te indica que aún no es un repositorio, pulsa **Create a repository here**. Nombre sugerido: `atlante-ayudas-canarias`. Comprueba que la ruta mostrada sigue siendo esa misma carpeta; evita crear otra carpeta anidada.
4. En la pestaña **Changes**, revisa la lista. Deben quedar fuera `node_modules`, `.env`, `.sites-runtime`, `.wrangler`, `dist` y cualquier contraseña o clave. El proyecto incluye un `.gitignore` para excluir esos elementos. No subas datos de clientes reales.
5. Escribe un resumen como `Primera entrega de Atlante` y pulsa **Commit to main**.
6. Pulsa **Publish repository**. Para una primera revisión, puedes dejarlo privado y compartir acceso con el jurado según las normas. Si el hackathon exige repositorio público, marca la opción pública solo después de revisar de nuevo los archivos. Copia el enlace del repositorio desde GitHub Desktop.
7. La copia de `Entrega hackathon` ya está preparada en `sites\atlante\docs`; el CSV ficticio también está en `sites\atlante\public`. Revisa en la web de GitHub que figuren ambos antes de compartir el repositorio. Los datos del CSV son ficticios.
8. Cada cambio posterior se sube con la misma secuencia: revisar **Changes → Commit to main → Push origin**. En la web de GitHub comprueba que aparecen los archivos esperados.

Si GitHub te pide configurar nombre y correo, hazlo en **File → Options → Git**. Son los datos que se mostrarán como autor de tus cambios. Para no publicar tu correo personal, GitHub ofrece una dirección `noreply` en sus ajustes de correo; puedes elegirla antes del primer commit.

Para la entrega final comparte **dos enlaces distintos**: el repositorio de GitHub (código) y la URL de Atlante (aplicación). El archivo CSV puede adjuntarse por separado o descargarse desde Atlante.
