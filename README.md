# Pisadas de Guitarra / Pisadas de Jarana Jarocha

**Selecciona una pisada en el instrumento y ve qué acorde es.**

Desarrollado en JavaScript Puro con HTML y CSS como una PWA instalable (funciona offline) en Windows/Android a través de Chrome y en iOS a través de Safari.

----

[![Licencia GNU](https://img.shields.io/badge/Licencia-GNU-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![GitHub issues](https://img.shields.io/github/issues/sanxofon/pisadas.svg)](https://github.com/sanxofon/pisadas/issues)

Pisadas es una PWA (Progressive Web App) que interpreta las pisadas de guitarra y otros instrumentos de cuerda.  Muestra el cifrado americano del acorde detectado, considerando diferentes posibles tónicas y bajos.  Permite al usuario seleccionar las notas de cada cuerda en un diapasón virtual para analizar la armonía resultante.

## Características

* **Diapasón Interactivo:**  Selecciona las notas en un diapasón virtual para crear acordes.
* **Detección de Acordes:** Calcula e identifica posibles acordes basados en las notas seleccionadas.
* **Múltiples Interpretaciones:** Ofrece diferentes interpretaciones armónicas del acorde, mostrando posibles tónicas y bajos.
* **Soporte para Diferentes Afinaciones:** Incluye afinaciones predefinidas para guitarra y jarana, con la posibilidad de añadir más en el futuro.
* **Tónica Flexible:** Permite al usuario definir la tónica según la nota más grave, la más frecuente o la de la primera cuerda.
* **Visualización Clara:**  Muestra las notas del acorde, la tónica, el bajo y las posibles interpretaciones de forma clara y concisa.
* **PWA (Progressive Web App):** Instalable en dispositivos móviles para un acceso rápido y sin conexión.

## Cómo Usar

### [VISITA LA DEMO AQUÍ](https://sanxofon.github.io/pisadas/)

Para montar tu propia versión

1. Clona el repositorio y crea una Github Page con él o bien descarga los archivos y monta un servidor local.
2. Abre [`index.html`](https://sanxofon.github.io/pisadas/) en tu navegador.
3. Selecciona un instrumento del menú desplegable.
4. Haz clic en los trastes del diapasón virtual para seleccionar las notas del acorde. La aplicación actualizará la información del acorde en tiempo real.
5. Utiliza la tabla de interpretaciones para ver las diferentes posibilidades armónicas, incluyendo la tónica, el bajo y el nombre del acorde. Puedes seleccionar una tónica específica en la tabla.

## Instalación como PWA

En navegadores compatibles, se te pedirá que instales la aplicación como PWA.  Esto te permitirá acceder a ella desde tu pantalla de inicio como una aplicación nativa.

Puedes ir al menú del navegador y seleccionar `Agregar a Pantalla Principal` y luego `Instalar`.

Esto te permitirá iniciar la aplicación desde su propio ícono, usar la pantalla completa y ejecutarse sin necesidad de conexión a internet.

## Tecnologías Utilizadas

* HTML
* CSS
* JavaScript
* Service Workers (para funcionalidad offline)

## Estructura del Código

* **`index.html`:** Contiene la estructura HTML de la aplicación, incluyendo el diapasón, la información del acorde y los controles.
* **`style.css`:**  Define los estilos visuales de la aplicación.
* **`app.js`:** Contiene la lógica principal de la aplicación, incluyendo la creación del diapasón, la detección de acordes y la actualización de la información.
* **`chords.js`:**  Versión modificada de [ChordJS](https://github.com/acspike/ChordJS).
* **`chordGenerator.js`:**  Helper para simplificar el uso de [ChordJS](https://github.com/acspike/ChordJS).
* **`sw.js`:**  El service worker para la funcionalidad offline.
* **`manifest.webmanifest`:**  El manifiesto de la aplicación web.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un *issue* para reportar errores o sugerir mejoras.

## Licencia

Este proyecto está licenciado bajo la [Licencia Pública General de GNU versión 3](https://www.gnu.org/licenses/gpl-3.0).
