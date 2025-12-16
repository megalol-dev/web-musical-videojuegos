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

---

## ➕ Cómo añadir nuevos juegos y canciones

- El proyecto es totalmente escalable gracias al archivo music.json.

1️⃣ Añadir las canciones
- Copia los nuevos archivos .mp3 dentro de la carpeta music/.

2️⃣ Editar music.json
- Añade un nuevo juego siguiendo esta estructura:
  
```text
  {
  "id": "zelda",
  "nombre": "Zelda",
  "canciones": [
    {
      "title": "Tema Principal",
      "file": "music/Zelda_theme.mp3"
    },
    {
      "title": "Bosque Kokiri",
      "file": "music/Zelda_kokiri.mp3"
    }
  ]
}
```

3️⃣ Añadir el botón del juego en el HTML
- En index.html, crea una nueva sección con el id del juego:

```
<section class="game-section" id="zelda">
  <h2>Zelda</h2>
</section>
```
👉 No es necesario tocar el backend:
getMusic.php detecta automáticamente los nuevos juegos definidos en el JSON.

4️⃣ Añadir el evento en app.js
```
document.getElementById("zelda").addEventListener("click", () => {
  loadSongs("zelda");
});
```

---

📌 Notas importantes

La duración de las canciones se obtiene automáticamente desde los metadatos del audio.

El pequeño retardo al mostrar la duración es normal en archivos MP3.

El sistema de descarga usa PHP para forzar la descarga del archivo.

---

📄 Licencia

Proyecto de uso educativo y personal.
Los archivos de audio pertenecen a sus respectivos autores y se usan únicamente con fines de práctica.
