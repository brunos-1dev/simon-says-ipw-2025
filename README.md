# Simon Says – Trabajo Final IPW 2025

Este proyecto es un juego **Simon Says** desarrollado como trabajo final para la cátedra **Introducción a la Programación Web** de la carrera **Licenciatura en Gestión de Tecnología Informática** (año 2025).

El objetivo principal fue implementar un juego web, aplicando buenas prácticas de HTML5, CSS3 (con Flexbox) y JavaScript ES5, junto con validaciones de formularios y uso básico de `localStorage`.

## Descripción del juego

El juego simula el clásico Simon Says:

- El sistema genera una secuencia de colores (verde, rojo, amarillo y azul).
- En cada ronda, la secuencia se alarga en un color más.
- El jugador debe repetir la secuencia en el mismo orden.
- Si se equivoca, la partida termina y se muestra un mensaje de "Fin de la partida” indicando:
  - Puntaje final.
  - Nivel alcanzado.

Además, se incluye:

- Visualización del nombre del jugador, nivel actual y puntaje actual.
- Botón para reiniciar la partida.
- Modal de ranking de partidas, donde se listan las partidas finalizadas.

## Funcionalidades principales

### Juego (index.html)

- Ingreso de nombre del jugador con validación:
  - Debe tener al menos 3 caracteres.
  - Solo se permiten caracteres alfanuméricos y espacios.
- Implementación del juego Simon Says:
  - Generación de una secuencia de colores aleatoria.
  - Reproducción visual de la secuencia (los botones se iluminan).
  - Registro de los clics del jugador.
  - Detección de aciertos y errores.
- Indicadores en pantalla:
  - Jugador actual.
  - Nivel actual.
  - Puntaje (cantidad de aciertos acumulados).
- Modal de "Fin de la partida”:
  - Muestra mensaje con puntaje final y nivel.
  - Botón para jugar de nuevo.
- Botón "Reiniciar partida” en el panel de juego.
- Enlace al repositorio en GitHub, que se abre en una nueva pestaña.
- Diseño responsivo usando Flexbox:
  - En pantallas grandes, el panel de jugador y el panel de juego se muestran en columnas.
  - En pantallas chicas, se apilan verticalmente.

### Página de contacto (contacto.html)

- Formulario con los campos:
  - Nombre.
  - Correo electrónico.
  - Mensaje.
- Validaciones:
  - Nombre: caracteres alfanuméricos y espacios.
  - Email: formato válido.
  - Mensaje: más de 5 caracteres.
- Si las validaciones se cumplen, se construye un enlace `mailto:` para:
  - Abrir la herramienta de envío de correo del sistema (Outlook, Gmail en el navegador, etc.).
  - Completar automáticamente asunto y cuerpo con los datos ingresados.

## Ranking con LocalStorage

Se implementó un ranking de partidas utilizando `localStorage`:

- Cada vez que una partida termina (Game Over) se guarda un registro con:
  - Nombre del jugador.
  - Puntaje final.
  - Nivel alcanzado.
  - Fecha y hora.
- Desde el juego se puede abrir un modal de ranking:
  - Se listan todas las partidas guardadas en una tabla.
  - Es posible ordenar:
    - Por puntaje (descendente).
    - Por fecha (cronológica).
- Los datos se almacenan mediante:
  - `localStorage.setItem(...)` y `localStorage.getItem(...)`
  - Serialización/deserialización con `JSON.stringify(...)` y `JSON.parse(...)`.

## Tecnologías utilizadas

- **HTML5**
  - Estructura semántica básica.
  - Formularios con atributos estándar.

- **CSS3**
  - Reset de estilos en `css/reset.css`.
  - Estilos generales en `css/estilos.css`.
  - Uso extensivo de **Flexbox** para el layout.
  - Diseño responsivo mediante media queries.
  - Diseño de componentes:
    - Panel de jugador.
    - Panel de juego.
    - Tablero de colores.
    - Modales (Game Over y Ranking).
    - Formulario de contacto.

- **JavaScript (ES5)**
  - Uso de `'use strict';` en todos los archivos JS.
  - Solo se utilizan `var` y funciones clásicas.
  - Código separado en módulos lógicos:
    - `js/juego-simon.js`: lógica central del juego.
    - `js/ui-juego.js`: interacción con la interfaz.
    - `js/contacto.js`: validación del formulario de contacto y construcción de mailto.
  - Manejo de eventos con `addEventListener`.
  - Uso de `localStorage` para el almacenamiento del ranking.
 
## Cómo ejecutar el proyecto

1. Clonar o descargar el repositorio.
2. Abrir el archivo `index.html` en un navegador.
3. Navegar a la página de contacto desde el menú o abriendo `contacto.html`.

## Autor y datos académicos

- **Autor:** Bruno Soria.
- **Carrera:** Licenciatura en Gestión de Tecnología Informática.
- **Cátedra:** Introducción a la Programación Web.
- **Institución:** Universidad Abierta Interamericana.
- **Año:** 2025.

