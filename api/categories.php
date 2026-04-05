<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch all categories
    $stmt = $pdo->query("SELECT * FROM categories ORDER BY id ASC");
    echo json_encode($stmt->fetchAll());
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Create new category
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['name'])) {
        $stmt = $pdo->prepare("INSERT INTO categories (name, description) VALUES (?, ?)");
        $stmt->execute([
            $data['name'], 
            $data['description'] ?? ''
        ]);
        echo json_encode([
            "id" => $pdo->lastInsertId(), 
            "status" => "success"
        ]);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Category name is required"]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Update category
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(["error" => "Category ID is required"]);
        exit;
    }
    if (isset($data['name'])) {
        $stmt = $pdo->prepare("UPDATE categories SET name = ?, description = ? WHERE id = ?");
        $stmt->execute([
            $data['name'], 
            $data['description'] ?? '',
            $_GET['id']
        ]);
        echo json_encode(["status" => "success"]);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Category name is required"]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Delete category
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(["error" => "Category ID is required"]);
        exit;
    }
    
    // Check if it has products before delete
    $check = $pdo->prepare("SELECT COUNT(*) AS count FROM products WHERE category_id = ?");
    $check->execute([$_GET['id']]);
    $result = $check->fetch();
    
    if ($result['count'] > 0) {
        http_response_code(409);
        echo json_encode(["error" => "No se puede eliminar. Hay {$result['count']} producto(s) en esta categoría."]);
    } else {
        $stmt = $pdo->prepare("DELETE FROM categories WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        echo json_encode(["status" => "success"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>

