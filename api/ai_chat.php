<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['message'])) {
        $user_message = $data['message'];
        
        // Prepare Ollama Payload
        $ollama_payload = [
            'model' => 'qwen2.5-coder',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => "Eres 'Coco', el asistente virtual de Coco Vanilla, una exclusiva tienda de moda de lujo online. Mantén un tono elegante, sofisticado y sumamente cortés. Responde siempre de forma corta y amable desde el punto de vista de experto en moda."
                ],
                [
                    'role' => 'user',
                    'content' => $user_message
                ]
            ],
            'stream' => false
        ];
        
        $ch = curl_init('http://localhost:11434/api/chat');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($ollama_payload));
        
        // Execute request to Ollama
        $response = curl_exec($ch);
        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpcode == 200 && $response) {
            $parsed = json_decode($response, true);
            $ai_reply = $parsed['message']['content'];
            echo json_encode(["response" => $ai_reply]);
        } else {
            // Fallback mock en caso de que Ollama no esté corriendo localmente
            echo json_encode(["response" => "Disculpa querido cliente, mi sistema cortical de IA está descansando en este momento. Sin embargo, en Coco Vanilla estamos listos para atenderte personalmente."]);
        }
    } else {
         echo json_encode(["error" => "No message provided"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
