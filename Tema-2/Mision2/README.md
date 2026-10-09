# Programación Web — Misión 2: Dragon Ball

Misión: «Async Odyssey»
Alumno: Izan Cuervo

## Descripción

Mi proyecto es un recopilatorio de personajes de Dragon Ball que consume una API pública real, la
[Dragon Ball API](https://web.dragonball-api.com/).
Una vez se abre la página se cargan los 58 personajes y se muestran en tarjetas con su imagen, su raza y su ki. 
Por medio de un desplegable se pueden filtrar por raza, y cada opción muestra cuántos personajes hay de esa raza. 
Al pulsar cualquier tarjeta se abre una ficha con el personaje en grande, su planeta de origen (y si está destruido o no) y todas sus transformaciones con
su ki.

- Está hecho con HTML, CSS y JavaScript, usando **Vite** para arrancar el proyecto.
- Los datos son pedidos a la API con `fetch` y `async/await`, y son transformados con `map`, `filter` y `reduce` antes de pintarlos.
- El estilo de la web está basado en mi página de *Sparking Zero* de mi proyecto Game Awards de primero de grado:
  He reutilizado fondos, separadores, fuente y colores.

## Cómo ejecutarlo

Hace falta tener instalado **Node.js**. Desde la carpeta `Tema-2/Mision2`:

```bash
npm install
npm run dev
```

Después se abre `http://localhost:5173` en el navegador.

- No funcionará abriendo `index.html` ya que los módulos (`import`/`export`) necesitan un servidor. Por eso se usa Vite.
- La conexión a internet es necesaria, ya que los datos llegan de la API.

## Cómo usarlo

1. Al abrir la página aparece **Cargando...** mientras llegan los personajes. Si falla la conexión, aparece un mensaje de error.
2. En el **desplegable** se elige una raza (por ejemplo *Saiyan (10)*) y solo se muestran sus personajes.
3. Al **pulsar una tarjeta** se abre la ficha del personaje con su planeta de origen y sus transformaciones. Mientras se cargan aparece su propio **Cargando...**.
4. La ficha se cierra con la **X** de arriba a la derecha.

## Funcionalidades

- Se recogen **58 personajes** de la API, cada uno en su tarjeta con imagen, nombre, raza y ki.
- **Filtro por raza** con el número de personajes de cada una, sacado de los propios datos.
- **Ficha de detalles** con una segunda petición a la API que nos devolverá el planeta de origen y las transformaciones.
- **Estados de carga y error** visibles tanto en la lista como en la ficha.
- **Datos raros controlados:** los ki `unknown` se muestran como *Desconocido*, la raza `Unknown` como *Raza Desconocida*, y los personajes sin transformaciones muestran *Sin transformaciones*.
- Los personajes se piden **una sola vez** al cargar la página y se guardan, así que el filtro no vuelve a llamar a la API.

Conceptos de la misión que se usan en el código:

| Concepto | Dónde |
|---|---|
| `fetch` con `async/await` | `obtenerPersonajes` y `obtenerDetalles` en `api.js` |
| Manejo de errores (`response.ok`, `try/catch`) | `api.js` lanza un error si la respuesta no es correcta y `cargarPersonajes` / `cargarDetalles` en `main.js` lo recogen y muestran el mensaje |
| `map` | `limpiarPersonajes` y `limpiarDetalles` para quedarme solo con los datos que uso, y en `render.js` para crear una tarjeta, una opción o una transformación por cada elemento |
| `filter` | `filtraRaza` para quedarme con los personajes de la raza elegida |
| `reduce` | `contarPorRaza` para contar cuántos personajes hay de cada raza |
| Módulos ES | `api.js` (peticiones), `datos.js` (transformar datos), `render.js` (crear el HTML), `main.js` (unirlo todo y los eventos) |
| Eventos | `change` en el desplegable, `click` en el contenedor de las tarjetas (con `closest` y `dataset` para saber qué tarjeta se ha pulsado) y `click` en la X de cerrar |

## Estructura De Archivos

```
Tema-2/Mision2/
├── index.html           estructura de la página
├── package.json         dependencias y scripts de Vite
├── public/              favicon
└── src/
    ├── main.js          coordina todo: cargas, mensajes y eventos
    ├── api.js           peticiones a la Dragon Ball API
    ├── datos.js         limpieza, filtro y recuento de los datos
    ├── render.js        creación de tarjetas, opciones y ficha en el DOM
    ├── style.css        estilos
    └── assets/          fondos, separador, botón de cerrar y fuente
```

## Créditos

- *Dragon Ball*, sus personajes y sus imágenes pertenecen a **Akira Toriyama, Bird Studio, Shueisha y Toei Animation**. Se usan solo con fines educativos.
- Los datos y las imágenes de los personajes, planetas y transformaciones vienen de la **[Dragon Ball API](https://web.dragonball-api.com/)**.
- Los fondos, el separador y el botón de cerrar los he reutilizado de mi página de *DRAGON BALL: Sparking! ZERO* (juego de **Bandai Namco**) del proyecto Game Awards.
- Fuente **Varent Grotesk**, la misma que usé en el proyecto Game Awards.

## Uso de IA

He usado **Claude**, más concretamente el modelo OPUS 5.5 como asistente durante el proyecto.

Lo he usado principalmente para:

- Revisar mi código frente a la rúbrica de la misión y detectar los errores más importantes.
- Que me explicara conceptos que no conocía como `async/await`, la diferencia entre `map`, `filter` y `reduce`, `Object.keys`, el operador `...`, el parámetro `evento` de los listeners, la delegación de eventos con `closest` y `dataset`.
- Para el `fetch` me enseñó un ejemplo con otra API (PokeAPI) que después adapté a la Dragon Ball API.
- Código concreto que me escribió o me dio hecho:
  - la reestructuración del proyecto de React a JavaScript sin framework (`package.json`, `index.html` y la primera versión de `render.js` y `main.js`);
  - la función `contarPorRaza` con el `reduce` ya que no supe como hacerlo, no lo entendía, así que le fui haciendo preguntas hasta comprenderlo;
  - los esqueletos de `limpiarPersonajes`, `limpiarDetalles`, `pintarOpcionesRaza` y del `try/catch` de `cargarPersonajes`, que después completé yo;
  - el `if/else` del listener del desplegable;
  - el listener del contenedor de las tarjetas (`closest` y `dataset`), las dos líneas de `crearTarjeta` que ponen la clase y el `id` a cada tarjeta, el HTML de la ficha y las líneas para mostrarla y ocultarla;
  - las funciones `crearPlaneta`, `crearTransformacion` y `crearTransformaciones` y la versión final de `crearDetalles`, siguiendo la división en funciones que le propuse;
  - todo el `style.css`, a partir del estilo de mi página de Sparking Zero.
  - Ayudarme con el desarrollo de este README.

**Lo que he hecho yo:** la elección de la API y la idea de la app (filtro por raza y ficha con planeta y transformaciones), todo `api.js` (`obtenerPersonajes` y `obtenerDetalles`), completar `limpiarPersonajes` y `limpiarDetalles`, `filtraRaza`, los estados de carga y error de `cargarPersonajes` y `cargarDetalles`, el HTML de la página, el tratamiento de los datos raros (`unknown`), los comentarios del código y las correcciones tras cada revisión.

## Autopsia

### Qué salió bien
Lo que mejor ha salido es la separación en módulos: cada archivo hace una sola cosa y, cuando algo
fallaba, sabía en cuál mirar. También estoy contento con la idea de pedir los personajes una sola vez y
guardarlos, de forma que el filtro por raza trabaja con la lista guardada sin volver a llamar a la API,
y con la ficha de detalles, que hace su propia petición con su propio mensaje de carga.

### Qué me costó
Al principio empecé el proyecto con React porque pensaba que era lo que se pedía, y a mitad tuve que
pasarlo a JavaScript. Eso me desorientó bastante. También me costó diferenciar cuándo
tenía una lista y cuándo un solo elemento (`personajes` frente a `personaje`), y entender el `reduce`,
que es lo que más guerra me ha dado de toda la misión.

Otra cosa que me costó fue la propia API: el ki viene como texto en formatos muy distintos
(`"60.000.000"`, `"90 Septillion"`, `"unknown"`) y la raza desconocida viene como `"Unknown"` con
mayúscula, así que una comparación con minúscula no funcionaba.

### Qué he aprendido
He aprendido a pedir datos a una API con `fetch` y `async/await`, y a controlar los errores con
`response.ok` y `try/catch` para que la página no se quede en blanco. He entendido para qué sirve cada
método de array: `map` transforma cada elemento, `filter` se queda con algunos y `reduce` lo resume
todo en un solo valor. También he aprendido a separar el código en módulos con `import` y `export`, y
a escuchar los clics de muchas tarjetas con un solo listener en el contenedor usando `closest` y
`dataset`.

### Qué mejoraría
Me hubiera gustado hacer el bonus de la caché en `localStorage` para no repetir peticiones, y convertir
el ki de texto a número para poder ordenar a los personajes por poder y añadir un modo combate entre
dos personajes.
