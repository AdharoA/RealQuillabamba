<?php
// api/config.php

// Permitir peticiones desde nuestro Frontend en React (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuración para XAMPP local (Cambiar esto cuando subamos a InfinityFree)
$db_host = "localhost";
$db_user = "root";
$db_pass = ""; // En XAMPP suele estar vacío
$db_name = "realquillabamba";

// Descomentar para ver errores durante el desarrollo local
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    // Usamos PDO por seguridad (Previene SQL Injection)
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    
    // Configurar PDO para que lance excepciones en caso de error
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
} catch (PDOException $e) {
    // Si la conexión falla, devolvemos un JSON limpio con el error
    http_response_code(500);
    echo json_encode([
        "error" => "Error de conexión a la Base de Datos", 
        "message" => $e->getMessage()
    ]);
    exit();
}
?>
