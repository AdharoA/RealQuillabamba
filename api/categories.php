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
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
