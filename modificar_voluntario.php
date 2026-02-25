<?php
require 'db.php';
header('Content-Type: application/json');

try {
    // 1. Recoger todos los datos que envía el JS
    $id= $_POST['id'];
    $nombre = $_POST['nombre'];
    $telefono = $_POST['telefono'];
    
    // 2. Consulta preparada incluyendo especie y voluntario
    $sql = "UPDATE voluntarios 
            SET nombre = ?,
                telefono = ?
            WHERE id_voluntario = ?";

    $stmt = $pdo->prepare($sql); 

    // 3. El orden de este array debe ser IDÉNTICO al de los "?" de arriba
    $stmt->execute([
        $nombre,
        $telefono,
        $id
    ]);

    echo json_encode(['success' => true]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>