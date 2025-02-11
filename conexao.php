<?php
// Configurações do banco de dados
$host = 'localhost'; // Host do MySQL (geralmente localhost)
$usuario = 'root'; // Usuário padrão do MySQL no XAMPP/WAMP
$senha = ''; // Senha padrão do MySQL no XAMPP/WAMP (vazia)
$banco = 'escola'; // Nome do banco de dados

// Conexão com o banco de dados
$conexao = new mysqli($host, $usuario, $senha, $banco);

// Verifica se houve erro na conexão
if ($conexao->connect_error) {
    die("Erro na conexão: " . $conexao->connect_error);
}

echo "Conexão bem-sucedida!";
?>