<?php
require_once 'config.php';

// Inicializar la tabla si no existe
try {
    $pdo->exec("CREATE TABLE IF NOT EXISTS brands (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        description TEXT,
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
} catch (PDOException $e) {
    // Si falla la inicialización por permisos, la ignoraremos y asumiremos que existe
}

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM brands ORDER BY name ASC");
        echo json_encode($stmt->fetchAll());
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => "DB Error: " . $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['name'])) {
            $stmt = $pdo->prepare("INSERT INTO brands (name, description, image_url) VALUES (?, ?, ?)");
            $stmt->execute([
                $data['name'],
                $data['description'] ?? '',
                $data['image_url'] ?? ''
            ]);
            echo json_encode(["status" => "success", "id" => $pdo->lastInsertId()]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "El nombre de la marca es obligatorio"]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => "DB Error: " . $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($_GET['id'], $data['name'])) {
            $stmt = $pdo->prepare("UPDATE brands SET name = ?, description = ?, image_url = ? WHERE id = ?");
            $stmt->execute([
                $data['name'],
                $data['description'] ?? '',
                $data['image_url'] ?? '',
                $_GET['id']
            ]);
            echo json_encode(["status" => "success"]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "ID y nombre son obligatorios"]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => "DB Error: " . $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    try {
        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare("DELETE FROM brands WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            echo json_encode(["status" => "success"]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "El ID de la marca es obligatorio"]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => "DB Error: " . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
}
?>
