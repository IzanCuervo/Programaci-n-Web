# Programación Web — Misión 1: Expendekai

**Misión:** U1 · M1 «El Despertar del DOM»
**Autor:** IzanCuervo

## Descripción

Expendekai es un simulador de la máquina de invocaciones de *Yo-kai Watch*. Con las monedas que vas
consiguiendo puedes hacer invocaciones sueltas o de ocho en ocho. Cada yokai que sale aparece con su
propia animación, y los que son nuevos se guardan en el Medalium, ordenados por rango.

Está hecho solo con HTML, CSS y JavaScript, sin frameworks ni librerías: todo el contenido dinámico
se crea y se modifica manipulando el DOM a mano.

## Cómo ejecutarlo

No hace falta instalar nada. Basta con abrir `Tema-1/Mision1/expendekai.html` en el navegador.

> Se recomienda **Chrome** o **Edge**. Las animaciones de los yokai son vídeos `.webm` con fondo
> transparente, y Safari no muestra la transparencia de ese formato.

## Cómo jugar

1. **Consigue Monedas** (arriba a la derecha): suma 640 monedas.
2. **Invocación x1** (160 monedas) o **Invocación x8** (1280 monedas), a los lados de la Expendekai.
3. Se reproduce la animación de la tirada. Al terminar, se abre una caja con la animación de cada
   yokai obtenido y su rango. Con **Aceptar** se cierra.
4. **Medalium** (abajo a la derecha): muestra los yokai conseguidos, separados por rango.
   Con **Aceptar** se cierra.

Si no tienes monedas suficientes, aparece un aviso y no se hace la invocación.

## Funcionalidades

- **30 yokai**, 5 por cada rango (E, D, C, B, A y S), cada uno con su animación.
- **Probabilidades por rango:** E 35 % · D 25 % · C 20 % · B 12 % · A 7 % · S 1 %.
- **Garantía de rango A:** la 8.ª tirada de una invocación x8 siempre es, como mínimo, de rango A.
- **Garantía de rango S:** si llevas 80 tiradas seguidas sin sacar un S, la siguiente es S seguro.
  El contador se reinicia cada vez que sale un S, sea por suerte o por la garantía.
- **Repetidos:** si te sale un yokai que ya tienes, te devuelven las 160 monedas de la tirada.
- **Medalium:** cada yokai nuevo se añade a la sección de su rango.
- Marcador de monedas y de tiradas totales, siempre actualizado.

## Tecnologías

- **HTML5**, **CSS3** y **JavaScript** puro (vanilla), en archivos separados.
- Fuente **Baloo 2**, incluida en el propio proyecto (`fuentes/`), así que funciona sin internet.

Conceptos de la misión que se usan en el código:

| Concepto | Dónde |
|---|---|
| Selección de nodos (`querySelector`) | todos los elementos de la página se guardan en constantes al principio del JS |
| Modificación de nodos (`textContent`, `classList`) | marcador, avisos de error y mostrar u ocultar vídeo, caja y Medalium |
| Creación de nodos (`createElement`, `append`) | cada resultado (`<li>` con `<video>` y texto) y cada medalla del Medalium |
| Eventos (`addEventListener`) | `click` en los botones y `ended` en el vídeo de la tirada; ningún *handler* en el HTML |
| `let` / `const` | `const` para constantes y referencias al DOM; `let` solo para lo que cambia (monedas, tiradas, pity) |
| Funciones | `realizaInvocacion`, `generaYokai`, `darRecompensa`, `actualizaMedalium`, `muestraDatos` |
| *Template literals* | textos del resultado y el selector de la sección del Medalium (`` `#medalium-${yokai.rango}` ``) |

## Estructura

```
Tema-1/Mision1/
├── expendekai.html      estructura de la página
├── expendekai.css       estilos
├── expendekai.js        lógica del juego y manipulación del DOM
├── fuentes/             fuente Baloo 2 (.woff2) y su licencia (OFL.txt)
└── videos/              animaciones de los yokai (.webm), vídeo de la tirada (.mp4) e imagen de fondo
```

## Créditos

- *Yo-kai Watch*, sus personajes y sus imágenes pertenecen a **Level-5**. Se usan solo con fines
  educativos.
- Las animaciones de los yokai y el vídeo de la tirada los he **grabado yo** del juego. A las
  animaciones les he quitado el fondo a mano.
- Fuente **Baloo 2** (© The Baloo 2 Project Authors), con licencia SIL Open Font License 1.1
  (ver `fuentes/OFL.txt`).

## Declaración de uso de IA

He usado **Claude** (Claude Code, de Anthropic) como asistente durante el proyecto.

**Para qué lo he usado:**
- Revisar el código frente a la rúbrica de la misión y detectar errores.
- Que me explicara conceptos que no conocía: el evento `ended`, `classList.toggle`, la especificidad
  en CSS (id frente a clase), `object-fit`, *template literals* dentro de un selector, etc.
- Código concreto que me escribió o me dio hecho:
  - la ternaria del rango junto con el contador de la garantía de rango S;
  - la creación de los `<li>` del resultado, la llamada inicial a `muestraDatos()` y el listener de
    Aceptar;
  - las constantes `TIRADAS_MULTI` y `MONEDAS_POR_CLIC`;
  - en el CSS: el fondo, el estilo de los botones, la fuente con `@font-face`, la colocación del
    título, el marcador y los botones, la clase `.caja` para centrar las ventanas y los tamaños de
    la caja del resultado.
- Tratar los vídeos: asignar a cada yokai la ruta de su vídeo, comprimirlos, recortar líneas de los
  bordes y limpiar restos de fondo en dos de ellos (Alga y Papa Rayo).
- Generar el borrador de este README, que después he revisado.

**Lo que he hecho yo:** la idea del juego, la lógica de las invocaciones (`realizaInvocacion`,
`generaYokai`, `darRecompensa`), las garantías, el Medalium, la estructura del HTML, y grabar y
quitar el fondo a todas las animaciones.
