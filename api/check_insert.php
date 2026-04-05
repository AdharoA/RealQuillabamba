<?php
require_once 'config.php';
try {
    $stmt = $pdo->prepare("INSERT INTO products (name, category_id, description, price, stock, image_url, brand, sizes, color, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        "test dummy 2",
        null,
        "",
        20.00,
        0,
        "",
        "CocoVanilla",
        "S, M, L",
        "",
        "Disponible"
    ]);
    echo json_encode(["status" => "success", "id" => $pdo->lastInsertId()]);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
