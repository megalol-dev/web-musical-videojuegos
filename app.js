const songList = document.getElementById("song-list");
const panelTitle = document.querySelector("#music-panel h2");

let currentAudio = new Audio();
let currentUI = null; // guardamos referencias a los controles de la canción activa

function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
}

function resetUI(ui) {
    if (!ui) return;
    ui.progress.value = 0;
    ui.time.textContent = "0:00 / 0:00";
}

function bindAudioEvents(ui) {
    // metadata -> duración
    currentAudio.onloadedmetadata = () => {
        ui.time.textContent = `${formatTime(0)} / ${formatTime(currentAudio.duration)}`;
    };

    // progreso
    currentAudio.ontimeupdate = () => {
        if (!currentUI) return;
        const dur = currentAudio.duration || 0;
        const pct = dur ? (currentAudio.currentTime / dur) * 100 : 0;
        ui.progress.value = pct;
        ui.time.textContent = `${formatTime(currentAudio.currentTime)} / ${formatTime(dur)}`;
    };

    // fin
    currentAudio.onended = () => {
        resetUI(ui);
    };
}

function loadSongs(game) {
    panelTitle.textContent = "Cargando canciones...";
    songList.innerHTML = "";

    fetch(`getMusic.php?game=${encodeURIComponent(game)}`)
        .then(r => r.json())
        .then(data => {
            if (!data?.canciones?.length) {
                panelTitle.textContent = "No hay canciones disponibles";
                return;
            }

            panelTitle.textContent = data.nombre;

            data.canciones.forEach(song => {
                const row = document.createElement("div");
                row.className = "song";

                const title = document.createElement("span");
                title.textContent = song.title;

                const playBtn = document.createElement("button");
                playBtn.textContent = "▶ Play";

                const pauseBtn = document.createElement("button");
                pauseBtn.textContent = "⏸ Pause";

                // Descarga (misma ruta del mp3)
                const downloadLink = document.createElement("a");
                downloadLink.className = "download-btn";
                downloadLink.textContent = "⬇ Descargar";
                downloadLink.href = `download.php?file=${encodeURIComponent(song.file)}`;

                // Zona de progreso + tiempo
                const meta = document.createElement("div");
                meta.className = "meta";

                const progress = document.createElement("input");
                progress.type = "range";
                progress.className = "progress";
                progress.min = "0";
                progress.max = "100";
                progress.value = "0";

                const time = document.createElement("span");
                time.className = "time";
                time.textContent = "0:00 / 0:00";

                meta.appendChild(progress);
                meta.appendChild(time);

                // Eventos
                playBtn.addEventListener("click", async () => {
                    // Si hay otra canción activa, la paramos (no solapar)
                    currentAudio.pause();
                    resetUI(currentUI);

                    // Activamos UI de esta canción
                    currentUI = { progress, time };

                    // Cargamos el audio
                    currentAudio.src = song.file;
                    currentAudio.currentTime = 0;

                    bindAudioEvents(currentUI);

                    try {
                        await currentAudio.play();
                    } catch (e) {
                        console.error(e);
                        panelTitle.textContent = "No se pudo reproducir el audio (revisa la ruta del mp3)";
                    }
                });

                pauseBtn.addEventListener("click", () => {
                    currentAudio.pause();
                });

                // Seek al mover la barra
                progress.addEventListener("input", () => {
                    const dur = currentAudio.duration || 0;
                    if (!dur) return;
                    const pct = Number(progress.value) / 100;
                    currentAudio.currentTime = pct * dur;
                });

                row.appendChild(title);
                row.appendChild(playBtn);
                row.appendChild(pauseBtn);
                row.appendChild(downloadLink);
                row.appendChild(meta);

                songList.appendChild(row);
            });
        })
        .catch(err => {
            console.error(err);
            panelTitle.textContent = "Error al cargar las canciones";
        });
}

// Clicks juegos
document.getElementById("mario").addEventListener("click", () => loadSongs("mario"));
document.getElementById("pokemon").addEventListener("click", () => loadSongs("pokemon"));
