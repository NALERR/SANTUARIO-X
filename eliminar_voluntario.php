<?php

require 'db.php';

try {
    $id = $_POST['id'];
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM animales WHERE id_voluntario = ?");
    $stmt->execute([$id]);
    $total = $stmt->fetchColumn();
    
    if ($total > 0) {
    echo json_encode([
        'success' => false,
        'error' => 'No se puede eliminar, tiene animales asignados'
    ]);
    } else {

    $stmt = $pdo->prepare("DELETE FROM voluntarios WHERE id_voluntario = ?");
    $stmt->execute([$id]);
    echo json_encode(['success' => true]);
    }

} catch (PDOException $e) {

    echo json_encode(['success' => false, 'error' => $e->getMessage()]);

}
?>