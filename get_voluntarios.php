<?php
require 'db.php';

try {

    $sql = "SELECT v.id_voluntario,
                v.nombre,
                v.telefono,
                GROUP_CONCAT(a.nombre SEPARATOR ', ') AS animales
            FROM voluntarios v
            LEFT JOIN animales a
                ON v.id_voluntario = a.id_voluntario
            GROUP BY v.id_voluntario, v.nombre, v.telefono";

    $stmt = $pdo->query($sql);
    $voluntarios = $stmt->fetchAll();

    echo json_encode($voluntarios);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>