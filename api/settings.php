<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Read all settings and format as key-value JSON
    $stmt = $pdo->query("SELECT setting_key, setting_value FROM settings");
    $settings = [];
    while ($row = $stmt->fetch()) {
        $settings[$row['setting_key']] = $row['setting_value'];
    }
    echo json_encode($settings);
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Update settings dynamically from JSON payload
    $data = json_decode(file_get_contents('php://input'), true);
    
    if ($data) {
        $stmt = $pdo->prepare("UPDATE settings SET setting_value = ? WHERE setting_key = ?");
        foreach ($data as $key => $value) {
            $stmt->execute([$value, $key]);
        }
        echo json_encode(["status" => "success"]);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Invalid JSON payload"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
