# Programación Web — Misión 1: Expendekai

Misión: El Despertar del DOM»
Alumno: Izan Cuervo

## Descripción

Mi proyecto Expendekai es un simulador de la máquina de invocaciones del videojuego Yo-kai Watch. Su funcionalidad
se basa en ir consiguiendo monedas para poder hacer invocaciones sueltas o de ocho en ocho. 
Cada yokai invocado aparece con su propia animación y rango, y los que son nuevos se guardan en el Medalium, ordenados por rango.

- Todo el proyecto está hecho con HTML5, CSS3 y JavaScript
- Los videos han sido grabados por mí. Posteriormente les quité el fondo para que solo se visualizara el yokai.
 
## Cómo ejecutarlo

Basta con abrir `Tema-1/Mision1/expendekai.html` en el navegador.

- Se recomienda Chrome o Edge ya que las animaciones de los yokai son vídeos `.webm` con fondo transparente y pueden tener incompatibilidades con algunos navegadores.

## Cómo jugar

1. **Consigue Monedas** (arriba a la derecha): suma 640 monedas.
2. Selecciona **Invocación x1** (160 monedas) o **Invocación x8** (1280 monedas), a los lados de la Expendekai.
3. Se reproduce la animación de la tirada. Al terminar, se abre una caja con la animación de cada
   yokai obtenido y su rango. Se cierra con el botón **Aceptar**.
4. **Medalium** (abajo a la derecha): muestra los yokai conseguidos, separados por rango.
   Se cierra con el botón **Aceptar**.

En caso de no disponer de monedas suficientes, aparece un aviso de error y no se hace la invocación.

## Funcionalidades

- Se disponen de **30 yokai**, 5 por cada rango (E, D, C, B, A y S), cada uno con su animación.
- **Probabilidades por rango:** E 35 % · D 25 % · C 20 % · B 12 % · A 7 % · S 1 %.
- **Garantía de rango A:** la tirada 8 de una invocación x8 siempre es, como mínimo, de rango A.
- **Garantía de rango S:** si llevas 80 tiradas seguidas sin sacar un S, la siguiente es S seguro.
  El contador de pity se reinicia cada vez que sale un S, sea por suerte o por la garantía.
- Si te sale un yokai que ya tienes **Repetido**, te devuelven las 160 monedas de la tirada.
- Cada yokai nuevo se añadirá al *Medalium*, más concretamentw a la sección de su rango.
- Marcador de monedas y de tiradas totales, siempre actualizado.

Conceptos de la misión que se usan en el código:

| Concepto | Dónde |
|---|---|
| Selección de nodos (`querySelector`) | todos los elementos del HTML se guardan en constantes al principio del JS |
| Modificación de nodos (`textContent`, `classList`) | Su propósito ha sido modificar clases/contenido de los nodos y mostrar u ocultar vídeo, caja y Medalium |
| Creación de nodos (`createElement`, `append`) | cada resultado (`<li>` con `<video>` y texto) y cada medalla del Medalium |
| Eventos (`addEventListener`) | `click` para los botones y `ended` para la finalización del vídeo de la tirada |
| `let` / `const` | `const` solo ha sido usado para constantes y referencias al DOM; `let` solo ha sido usado para variables que son mutables (monedas, tiradas, pity) |
| Funciones | `realizaInvocacion`, `generaYokai`, `darRecompensa`, `actualizaMedalium`, `muestraDatos` |

## Estructura De Archivos

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

He usado **Claude**, más concretamente el modelo OPUS 5.5 como asistente durante el proyecto.

Lo he usado principalmente para:

- Revisar mi código frente a la rúbrica de la misión y detectar los errores más importantes.
- Que me explicara conceptos que no conocía como el evento `ended`, `classList.toggle`, la especificidad
  en CSS (id frente a clase), `object-fit`, *template literals* dentro de un selector, etc.
- Código concreto que me escribió o me dio hecho:
  - la ternaria del rango junto con el contador de la garantía de rango S;
  - la creación de los `<li>` del resultado, la llamada inicial a `muestraDatos()` y el listener de
    Aceptar;
  - Escribir parte del CSS siguiendo mis indicaciones: el color de los botones, la fuente con `@font-face, el marcador y los botones, la clase `.caja` para centrar las ventanas y los tamaños de
    la caja del resultado.
- Tratar los vídeos: comprimirlo y limpiar restos de fondo en dos de ellos (Alga y Papa Rayo).
- Ayudarme con el desarrollo de este README

**Lo que he hecho yo:** la idea del juego, la lógica de las invocaciones (`realizaInvocacion`,
`generaYokai`, `darRecompensa`), las garantías, el Medalium, la reestructuración y correcciones del código, la estructura del HTML, y grabar y
quitar el fondo a todas las animaciones.
