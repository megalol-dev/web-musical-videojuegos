<?php
$file = $_GET["file"] ?? "";
$file = str_replace(["..", "\\", "\0"], "", $file); // mini-sanitización

$path = __DIR__ . "/" . $file;

if (!is_file($path)) {
  http_response_code(404);
  exit("Archivo no encontrado");
}

header("Content-Type: application/octet-stream");
header('Content-Disposition: attachment; filename="' . basename($path) . '"');
header("Content-Length: " . filesize($path));
readfile($path);
