<?php
require 'db.php';
header('Content-Type: application/json');

try {
    // 1. Recoger todos los datos que envía el JS
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $edad = $_POST['edad'];
    $estado = $_POST['estado'];
    $id_especie = $_POST['especieAnimal']; // Coincide con el append de JS
    $id_voluntario = $_POST['cuidadoresAnimal']; // Coincide con el append de JS

    // 2. Consulta preparada incluyendo especie y voluntario
    $sql = "UPDATE animales 
            SET nombre = ?, 
                edad = ?,  
                estado = ?,
                id_especie = ?,
                id_voluntario = ?
            WHERE id_animal = ?";

    $stmt = $pdo->prepare($sql); 

    // 3. El orden de este array debe ser IDÉNTICO al de los "?" de arriba
    $stmt->execute([
        $nombre,
        $edad,
        $estado,
        $id_especie,
        $id_voluntario ?: null, // Si viene vacío, guarda NULL en la DB
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