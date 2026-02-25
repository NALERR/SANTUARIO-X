<?php
$host = 'localhost'; 
$db = 'santuarioanimales'; 
$user = 'root'; 
$pass = 'Examen07!'; 
$charset = 'utf8mb4'; 

     $dsn = "mysql:host=$host;dbname=$db;charset=$charset"; 
     try { 
          $pdo = new PDO($dsn, $user, $pass); 
          } catch (\PDOException $e) {
               die("Error en la conexión: " . $e->getMessage()); 
          } 
?>