<?php
//CONFIGURAÇÃO DE SEGURANÇA E TIPO DE RESPOSTA (CORS e JSON Header)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

//INCLUIR O ARQUIVO DE CONEXÃO
require_once 'conexao.php';

if (!($pdo instanceof PDO)) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erro interno: conexão PDO não estabelecida."]);
    exit();
}

//PROCESSAMENTO DA REQUISIÇÃO JSON

// Verifica se a requisição é do tipo POST (esperamos JSON via POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_data_raw = file_get_contents("php://input");
    $data = json_decode($json_data_raw, true);

    if ($data === null) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "JSON inválido na requisição!"]);
        exit();
    }
    //VALIDAÇÃO DOS DADOS DO PRODUTO

    $nome = $data['nome'] ?? null;
    $descricao = $data['descricao'] ?? null;
    $preco = $data['preco'] ?? null;


    // Verifica se os campos obrigatórios estão preenchidos
    if (empty($nome) || $preco === null || $descricao === null) {
        http_response_code(400); // Bad Request
        echo json_encode(["success" => false, "message" => "Dados incompletos! Nome, preço e descrição são obrigatórios."]);
        exit();
    }

    // Validação de tipo de dados (básico, pode ser mais robusto)
    if (!is_numeric($preco) || $preco < 0) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Preço deve ser um valor numérico positivo."]);
        exit();
    }

    //INSERÇÃO DOS DADOS NO BANCO DE DADOS

    try {
        // Adapte a query SQL: REMOVA 'estoque' da lista de colunas e ':estoque' dos VALUES
        $stmt = $pdo->prepare("INSERT INTO produtos (nome, descricao, preco, data_cadastro) VALUES (:nome, :descricao, :preco, NOW())");

        // Associa os valores aos placeholders (bind)
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':descricao', $descricao);
        $stmt->bindParam(':preco', $preco);
        // REMOVA ESTA LINHA:
        // $stmt->bindParam(':estoque', $estoque);

        $stmt->execute();

        $last_id = $pdo->lastInsertId('produtos_id_seq');

        http_response_code(201);
        echo json_encode([
            "success" => true,
            "message" => "Produto inserido com sucesso!",
            "id" => $last_id,
            "received_data" => $data
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Erro ao inserir produto: " . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Método não permitido. Use POST."]);
}
