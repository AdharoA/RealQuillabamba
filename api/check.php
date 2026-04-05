<?php
require_once 'config.php';
try {
    $stmt = $pdo->query('SHOW TABLES');
    echo json_encode($stmt->fetchAll(PDO::FETCH_COLUMN));
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
