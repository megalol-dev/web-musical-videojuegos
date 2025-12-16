<?php
header("Content-Type: application/json");

// Leer el JSON
$json = file_get_contents("music.json");
$data = json_decode($json, true);

// Obtener el juego solicitado
$gameId = $_GET["game"] ?? null;

$result = [];

// Buscar el juego
if ($gameId) {
    foreach ($data["juegos"] as $juego) {
        if ($juego["id"] === $gameId) {
            $result = $juego;
            break;
        }
    }
}

// Devolver resultado
echo json_encode($result);
