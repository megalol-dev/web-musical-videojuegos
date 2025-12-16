# 🎮 Web Musical – Video Game Music Player

Aplicación web que permite escuchar y descargar música de videojuegos de forma dinámica, sin recargar la página.  
La información de los juegos y canciones está centralizada en un archivo JSON y se sirve mediante PHP, lo que hace el proyecto **escalable y fácil de ampliar**.

---

## 🚀 Funcionalidades

- Selección de juegos (actualmente Mario y Pokémon)
- Carga dinámica de canciones sin recargar la página (AJAX / Fetch)
- Reproducción de audio con:
  - ▶ Play
  - ⏸ Pause
  - Barra de progreso
  - Tiempo actual / duración total
- Descarga de canciones
- Indicador de carga mientras se leen los metadatos del audio
- Estructura preparada para añadir más juegos y canciones fácilmente

---

## 🛠️ Tecnologías utilizadas

- **HTML5** (estructura)
- **CSS3** (diseño y layout)
- **JavaScript (ES6)**  
  - DOM dinámico  
  - Fetch / AJAX  
  - Audio API
- **PHP** (servidor ligero para servir datos)
- **JSON** (almacenamiento de datos)

---

## 📁 Estructura del proyecto

```text
MusicMoodApp/
├── index.html
├── styles.css
├── app.js
├── getMusic.php
├── download.php
├── music.json
└── music/
    ├── Mario_original.mp3
    ├── Mario_tuberias.mp3
    ├── Mario_yoshi.mp3
    ├── Pokemon_batalla.mp3
    ├── Pokemon_intro.mp3
    └── Pokemon_intro2.mp3
```
