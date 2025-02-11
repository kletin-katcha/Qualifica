<?php
session_start(); // Inicia a sessão

// Verifica se o usuário está logado
if (!isset($_SESSION['usuario'])) {
    header('Location: login.php'); // Redireciona para a página de login
    exit();
}

require 'conexao.php'; // Inclui o arquivo de conexão

// Consulta para buscar todos os alunos
$sql = "SELECT * FROM alunos";
$resultado = $conexao->query($sql);
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
</head>
<body>
    <h1>Lista de Alunos</h1>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Matrícula</th>
            <th>Curso</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Data de Nascimento</th>
        </tr>
        <?php
        if ($resultado->num_rows > 0) {
            while ($row = $resultado->fetch_assoc()) {
                echo "<tr>
                    <td>{$row['id']}</td>
                    <td>{$row['nome']}</td>
                    <td>{$row['cpf']}</td>
                    <td>{$row['id_matricula']}</td>
                    <td>{$row['curso']}</td>
                    <td>{$row['email']}</td>
                    <td>{$row['telefone']}</td>
                    <td>{$row['dataNascimento']}</td>
                </tr>";
            }
        } else {
            echo "<tr><td colspan='8'>Nenhum aluno cadastrado.</td></tr>";
        }
        ?>
    </table>
    <br>
    <a href="logout.php">Sair</a>
</body>
</html>