# Programación Web — Misión 3: Dragon Ball en React

Misión: «Reactor Core»
Alumno: Izan Cuervo

## Descripción

En este proyecto he reconstruido en **React 19** el recopilatorio de personajes de Dragon Ball que hice en la Misión 2 con JavaScript sin framework. La app sigue utilizando la [Dragon Ball API](https://web.dragonball-api.com/), pero ahora la interfaz se encuentra dividida en componentes y lo que se ve en pantalla depende de los diferentes estados, en vez de crear y borrar elementos del DOM a mano. Además se han agregado nuevas funcionalidades que la anterior no tenía.

Al abrir la página se cargan los 58 personajes en tarjetas con su imagen, su raza y su ki. Se pueden filtrar por raza con un desplegable o buscar por su nombre, al pulsar una tarjeta se abre una ficha con el personaje en grande junto a su planeta de origen y sus transformaciones.

- Está hecho con **React 19** y **Vite**, y revisado con **ESLint** (con el plugin de las reglas de los hooks).
- Para la lógica de datos me he apoyado un poco en la de la Misión 2. La parte de pintar se ha rehecho desde cero con componentes.
- En cuanto al estilo me decanté por colores que fuesen llamativos, en los que predominan morados y azules, cabe destacar además que las tarjetas disponen de un hover que hace que la imagen se escale con un tamaño un poco más grande junto con un tono amarillento que la recubre, en referencia al ki.

## Cómo ejecutarlo

Hace falta tener instalado **Node.js**. Desde la carpeta `Tema-3/Mision3`:

```bash
npm install
npm run dev
```

Después se abre `http://localhost:5173` en el navegador. Hace falta conexión a internet, ya que los datos llegan de la API.

Para revisar el código con ESLint:

```bash
npm run lint
```

## Cómo usarlo

1. Al abrir la página aparece **Cargando personajes...** mientras llegan los datos. Si falla la conexión, aparecerá un mensaje de error.
2. En el **desplegable** se elige una raza (por ejemplo *Saiyan (10)*) y solo se muestran esos 10 personajes.
3. En el **buscador** se escribe parte de un nombre (por ejemplo *go*) y se muestran los personajes que lo contienen, independientemente de que esté en mayúsculas o en minúsculas. Si no coincide ninguno, aparece *No hay personajes que coincidan*.
4. Los dos filtros funcionan en conjunto: si la raza es Saiyan, todo lo que se busque solo filtrará a los personajes que se encuentren en esa lista.
5. Al **pulsar una tarjeta** se abre la ficha del personaje, con su propio mensaje de carga mientras llegan los detalles.
6. La ficha se cierra con la **X** de arriba a la derecha.

## Funcionalidades

- **58 personajes** en tarjetas con imagen, nombre, raza y ki.
- **Filtro por raza** con el número de personajes de cada una, calculado a partir de los propios datos.
- **Buscador por nombre** con palabras que se encuentran contenidas en el nombre de un personaje (funcionalidad nueva).
- **Ficha de detalles** que hace su propia petición a la API para traer el planeta de origen (y si está destruido) y las transformaciones.
- **Estados de carga y error** tanto en la lista como en la ficha.
- **Custom hook `useFetch`** (bonus): la carga, el mensaje de cargando, el error y la limpieza están escritos una sola vez y los usan la lista y la ficha para evitar la duplicación de código.
- **Datos raros controlados:** los ki `unknown` salen como *Desconocido*, la raza `Unknown` como *Raza Desconocida*, y los personajes sin transformaciones muestran *Sin Transformaciones*.

### Árbol de componentes

```
App                    estado (raza elegida, texto buscado, personaje seleccionado) y cálculos
├── FiltroRazas        desplegable de razas
├── Buscador           cuadro de búsqueda por nombre
├── ListaPersonajes    rejilla de tarjetas (o "No hay personajes que coincidan")
│   └── Personaje      una tarjeta
└── Ficha              carga y muestra el detalle de un personaje
    ├── Planeta
    └── Transformaciones
        └── Transformacion
```

`App` es el único componente que guarda estado de la página y se encarga de coordinar. Los demás reciben los datos por props y solo pintan. Cuando un componente hijo tiene que avisar de algo (se ha elegido una raza, se ha escrito en el buscador, se ha pulsado una tarjeta), lo hace llamando a una función que le pasa `App` por props.

### Conceptos de la misión que se usan en el código

| Concepto | Dónde |
|---|---|
| Componentes y props | Un componente por archivo en `src/components`, cada uno recibe solo lo que necesita (por ejemplo `Planeta` solo recibe el planeta) |
| `useState` con estado mínimo | En `App` solo se guarda lo que decide el usuario: `razaElegida`, `nombreElegido` e `idSeleccionado` |
| Valores derivados | `personajes`, `recuento`, `personajesFiltrados` y `personajesBuscados` en `App`, y `detalles` en `Ficha`, se calculan en cada renderizado a partir del estado, sin guardarlos aparte |
| Levantar el estado | `FiltroRazas` y `Buscador` cambian el estado de `App` con `onCambiar` y `onBuscar`. `Personaje` avisa del clic con `onSeleccionar`, que pasa por `ListaPersonajes` |
| `useEffect` con dependencias | En `useFetch`, con `[url]`: la lista se pide una vez y la ficha vuelve a pedir cuando cambia el personaje |
| Limpieza del efecto | La variable `ignorar` en `useFetch`: si llega tarde la respuesta de una petición anterior, no pisa el estado |
| Custom hook | `src/hooks/useFetch.jsx`, usado en `App` y en `Ficha` |
| Listas con `key` estable | `key={personaje.id}`, `key={raza}` en las opciones y `key={transformacion.id}` |
| Renderizado condicional | `&&` para los mensajes, la lista y la ficha, ternaria para el filtro de raza e `if` antes del `return` en `ListaPersonajes` y `Transformaciones` |
| Eventos | `onChange` en el desplegable y el buscador (inputs controlados con `value`), `onClick` en las tarjetas y en el botón de cerrar |

## Estructura de archivos

```
Tema-3/Mision3/
├── index.html                  página base con el <div id="root">
├── package.json                dependencias y scripts
├── eslint.config.js            configuración de ESLint
├── public/                     favicon
└── src/
    ├── main.jsx                arranca React y monta App
    ├── App.jsx                 componente principal: estado, cálculos y manejadores
    ├── api.js                  direcciones de la API (BASE_URL)
    ├── datos.js                limpieza, filtro, búsqueda y recuento de los datos
    ├── hooks/
    │   └── useFetch.jsx        custom hook para pedir datos a la API
    ├── components/             un archivo por componente
    ├── index.css               estilos generales (fuente, colores y fondo)
    ├── App.css                 estilos de los componentes
    └── assets/                 fondos, separador, botón de cerrar y fuente
```

## Créditos

- *Dragon Ball*, sus personajes y sus imágenes pertenecen a **Akira Toriyama, Bird Studio, Shueisha y Toei Animation**. Se usan solo con fines educativos.
- Los datos y las imágenes de los personajes, planetas y transformaciones vienen de la **[Dragon Ball API](https://web.dragonball-api.com/)**.
- Fuente **Varent Grotesk**, la misma que usé en el proyecto Game Awards.
- Apuntes de la asignatura: *Unidad 3, React Core* (U-tad).

## Uso de IA

He usado **Claude** (modelos Opus 4.8 y Opus 5.5) como asistente durante la misión.

Lo he usado principalmente para:

- Que me explicara los conceptos de React que todavía no conocía: qué hace `useEffect` y su array de dependencias, la diferencia entre el cuerpo del componente, el efecto y el `return`, cómo se pasan las props y las funciones de padre a hijo, la limpieza del efecto con la variable `ignorar`, los valores derivados, `Object.entries`, `evento.target.value` y por qué `&&` no pinta nada con `null`.
- Revisar mi código en cada paso y señalar los errores antes de seguir.
- Código concreto que me escribió o me dio hecho:
  - los comandos para crear el proyecto con Vite;
  - los esqueletos con huecos que después completé yo: el de `App` con `useState` y `useEffect`, el de `Personaje` (con el `<h2>` ya puesto), el de `Ficha`, el de `useFetch` (con las líneas del `fetch`, la comprobación de `respuesta.ok` y el `json`);
  - la estructura del `map` con `key` dentro del JSX y el ejemplo del `if (!ignorar)`; además colocó en su sitio el `return` de la limpieza del primer `useEffect` y añadió el `if` del `finally`;
  - el componente `FiltroRazas`, con el `map` sobre `Object.entries`;
  - las tres direcciones de `api.js` (`BASE_URL`, `URL_PERSONAJES` y `urlDetalle`);
  - la conexión de `useFetch` en `App` y en `Ficha`, y quitar el código antiguo que dejó de usarse;
  - la línea con `toLowerCase` e `includes` del buscador, los `if` de "Sin Transformaciones" y "No hay personajes que coincidan", y la condición `!cargando && !error` para no mostrar la lista mientras carga;
  - la corrección de las erratas de los comentarios;
  - todo el CSS (`index.css` y `App.css`), adaptándolo a los componentes;
  - borrar los archivos de la plantilla de Vite que no se usaban;
  - un borrador de este README, que después he revisado.

**Lo que he hecho yo:** la decisión de reconstruir la app de la Misión 2 reutilizando la lógica de datos, rellenar todos los esqueletos, los componentes `Personaje`, `ListaPersonajes`, `Planeta`, `Transformacion`, `Buscador` y `Transformaciones`, la carga con sus estados de cargando y error y la limpieza del efecto, el paso de `onSeleccionar` desde `App` hasta cada tarjeta, la ficha con su propia carga, el hook `useFetch`, el filtro por raza con valores derivados, el buscador, la decisión de combinar los dos filtros (después de probarlos por separado), el título de la página, los comentarios del código y las correcciones tras cada revisión.

## Autopsia

### Qué salió bien
Lo que mejor ha salido es la separación de responsabilidades. `App` se encarga de los datos y del estado, y el resto de componentes solo reciben datos por props y los pintan, así que cuando algo fallaba sabía en qué archivo mirar. También he podido apoyarme en `datos.js` de la Misión 2 , ya que las funciones que limpian y filtran los datos no dependen de cómo se pinta la página. Además, el hook `useFetch` me ha permitido quitar el código que tenía repetido en `App` y en `Ficha`.

### Qué me costó
Lo que más me costó fue `useEffect`, ya que empecé a usarlo antes de que se explicara en clase. Al principio no distinguía qué iba en el cuerpo del componente, qué en el efecto y qué en el `return`, y metí el recuento de razas dentro del efecto, donde solo se calculaba una vez con la lista todavía vacía. También me costó entender la variable `ignorar` de la limpieza, porque pensaba que siempre valía `false` al reiniciarse, y pasar una función por props a través de varios componentes, como `onSeleccionar`, que tiene que pasar por `ListaPersonajes` para llegar a cada tarjeta.

Además tuve fallos pequeños que me hicieron perder tiempo, como olvidar las llaves al recibir las props, importar dos veces el mismo componente o escribir el nombre de un archivo con minúscula.

### Una decisión que cambié
Al añadir el buscador, primero hice que los dos filtros fueran independientes: al elegir una raza se vaciaba el buscador, y al escribir en el buscador el desplegable volvía a *Todas*. Para eso tenía en `App` dos funciones, `cambiarRaza` (que me dio la IA) y `buscar`, que cambiaban un filtro y reiniciaban el otro. Después me di cuenta de que así se perdía lo que había elegido el usuario y no había forma de buscar dentro de una raza. Además, el código ya estaba preparado para combinarlos, porque la búsqueda se hace sobre la lista que sale del filtro de raza (`personajesBuscados` se calcula a partir de `personajesFiltrados`). Por eso descarté los filtros independientes, quité las dos funciones y pasé directamente `setRazaElegida` y `setNombreElegido` a los componentes. Ahora los dos filtros se suman (por ejemplo, *Saiyan* y *go*) y el código es más corto.

### Qué he aprendido
He aprendido a pensar la interfaz a partir del estado: en vez de crear y borrar elementos del DOM como en la Misión 2, cambio el estado y React vuelve a pintar lo que corresponde. He entendido que los datos bajan de padres a hijos por props y que los avisos suben llamando a funciones, que no hay que guardar en el estado lo que se puede calcular (como la lista filtrada), y que un efecto necesita sus dependencias bien puestas y una limpieza para que las respuestas antiguas no pisen a las nuevas. También he aprendido a sacar lógica repetida a un custom hook.

### Qué mejoraría
Añadiría un botón de *Reintentar* cuando falla la carga, y convertiría el ki de texto a número para poder ordenar a los personajes por poder.