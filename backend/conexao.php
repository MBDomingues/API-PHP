<?php
// ARQUIVO: conexao.php

//Adicionar dados do DB
$host = 'localhost';
$dbname = 'minha_api_db';
$user = 'postgres';
$password = 'Sua senha'; 
$port = '5432';

$pdo = null;

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$password");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {

    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erro de conexão com o banco de dados: " . $e->getMessage()]);
    exit();
}
