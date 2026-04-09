<?php
require_once 'config.php';

// Endpoint para validar login desde React de forma estática pura
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['email'], $data['password'])) {
        $stmt = $pdo->prepare("SELECT id, email, password_hash, role FROM users WHERE email = ? LIMIT 1");
        $stmt->execute([$data['email']]);
        $user = $stmt->fetch();
        
        // Comparamos usando password_verify para soportar el algoritmo seguro Bcrypt
        if ($user && password_verify($data['password'], $user['password_hash'])) {
            echo json_encode([
                "status" => "success", 
                "user" => [
                    "id" => $user['id'], 
                    "email" => $user['email'], 
                    "role" => $user['role']
                ]
            ]);
        } else {
            http_response_code(401); // Unauthorized
            echo json_encode(["error" => "Credenciales incorrectas"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Email y contraseña requeridos"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
}
?>
