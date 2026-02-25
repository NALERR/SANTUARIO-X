<?php
require 'db.php';

try {
    
    $sql = "SELECT a.id_animal, a.nombre, a.edad, a.estado, a.id_especie, e.nombre_especie, a.id_voluntario, v.nombre as nombre_voluntario 
            FROM animales a
            JOIN especies e ON a.id_especie = e.id_especie
            LEFT JOIN voluntarios v ON a.id_voluntario = v.id_voluntario";
            
    $stmt = $pdo->query($sql);
    $animales = $stmt->fetchAll();

    header('Content-Type: application/json');
    echo json_encode($animales);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>