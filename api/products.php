<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch all products joined with their category name
    $stmt = $pdo->query("
        SELECT p.*, c.name as category_name 
        FROM products p 
        LEFT JOIN categories c ON p.category_id = c.id 
        ORDER BY p.id DESC
    ");
    echo json_encode($stmt->fetchAll());
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Create new product
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['name'], $data['price'])) {
        $stmt = $pdo->prepare("INSERT INTO products (name, category_id, description, price, stock, image_url, brand, sizes, color, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        $categoryId = !empty($data['category_id']) ? $data['category_id'] : null;
        
        $stmt->execute([
            $data['name'],
            $categoryId,
            $data['description'] ?? '',
            round((float)$data['price'], 2),
            (int)($data['stock'] ?? 0),
            $data['image_url'] ?? '',
            $data['brand'] ?? 'CocoVanilla',
            $data['sizes'] ?? 'S, M, L',
            $data['color'] ?? '',
            $data['status'] ?? 'Disponible'
        ]);
        
        echo json_encode([
            "id" => $pdo->lastInsertId(), 
            "status" => "success"
        ]);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Product name and price are required"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
