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
    try {
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
                $data['brand'] ?? 'Coco Vanilla',
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
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => "DB Error: " . $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Update product
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(["error" => "Product ID is required"]);
        exit;
    }
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['name'], $data['price'])) {
        $stmt = $pdo->prepare("UPDATE products SET name = ?, category_id = ?, description = ?, price = ?, stock = ?, image_url = ?, brand = ?, sizes = ?, color = ?, status = ? WHERE id = ?");
        
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
            $data['status'] ?? 'Disponible',
            $_GET['id']
        ]);
        
        echo json_encode(["status" => "success"]);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Product name and price are required"]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Delete product
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(["error" => "Product ID is required"]);
        exit;
    }
    $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
    $stmt->execute([$_GET['id']]);
    echo json_encode(["status" => "success"]);
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
