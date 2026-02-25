<?php

require 'db.php';

try {

    $id = $_POST['id'];
    $stmt = $pdo->prepare("DELETE FROM animales WHERE id_animal = ?");
    $stmt->execute([$id]);
    echo json_encode(['success' => true]);

} catch (PDOException $e) {

    echo json_encode(['success' => false, 'error' => $e->getMessage()]);

}
?>