<?php

require 'db.php';

try {
    $sql = "INSERT INTO voluntarios (nombre, telefono) VALUES (?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $_POST['nombre'],
        $_POST['telefono']
    ]);
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>