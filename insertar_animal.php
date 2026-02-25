<?php

require 'db.php';

try {
    $sql = "INSERT INTO animales (nombre, edad, id_especie, estado, id_voluntario) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $_POST['nombre'],
        $_POST['edad'],
        $_POST['id_especie'],
        $_POST['estado'],
        $_POST['id_voluntario']
    ]);
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>