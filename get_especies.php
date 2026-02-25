<?php
require 'db.php';

try {

    $stmt = $pdo->query("SELECT id_especie, nombre_especie FROM especies");
    $especies = $stmt->fetchAll();

    echo json_encode($especies);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>