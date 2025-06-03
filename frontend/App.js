import React, { useState } from "react";
import "./App.css";

function App() {
    const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco: "",
    });

    const [mensagem, setMensagem] = useState("");
    const [isErro, setIsErro] = useState(false);

    const apiUrl = "http://localhost/minha_api_php/api_produtos.php";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduto((prevState) => ({
        ...prevState,
        [name]: value,
    }));
};

const handleSubmit = async (e) => {
    e.preventDefault();

    setMensagem("Enviando dados...");
    setIsErro(false);

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                nome: produto.nome,
                descricao: produto.descricao,
                preco: parseFloat(produto.preco),
            }),
        });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            errorData.message || "Erro desconhecido ao enviar dados."
        );
    }

    const data = await response.json();

    if (data.success) {
        setMensagem(data.message + (data.id ? ` ID: ${data.id}` : ""));
        setIsErro(false);
        setProduto({
            nome: "",
            descricao: "",
            preco: "",
        });
    } else {
        setMensagem(data.message || "Erro ao processar a requisição.");
        setIsErro(true);
    }
    } catch (error) {
        console.error("Erro na requisição:", error);
        setMensagem("Erro: " + error.message);
        setIsErro(true);
    }
};

return (
<div
className="App"
style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
>
<h1>Cadastro de Produtos</h1>
<form
    onSubmit={handleSubmit}
    style={{
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    margin: "0 auto",
    gap: "10px",
    }}
>
    <input
    type="text"
    name="nome"
    placeholder="Nome do Produto"
    value={produto.nome}
    onChange={handleChange}
    required
    style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
    }}
    />
    <textarea
    name="descricao"
    placeholder="Descrição do Produto (opcional)"
    value={produto.descricao}
    onChange={handleChange}
    rows="4"
    style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
    }}
    />
    <input
    type="number"
    name="preco"
    placeholder="Preço"
    value={produto.preco}
    onChange={handleChange}
    step="0.01"
    required
    style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
    }}
    />
    <button
    type="submit"
    style={{
        padding: "10px 15px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    }}
    >
    Cadastrar Produto
    </button>
</form>

{mensagem && (
    <p
    style={{
        marginTop: "20px",
        padding: "15px 20px", // Mais padding
        borderRadius: "8px", // Bordas mais arredondadas
        textAlign: "center",
        // Cores baseadas em um esquema de cores mais moderno (Bootstrap-like)
        backgroundColor: isErro ? "#f8d7da" : "#d4edda", // Luz vermelho ou luz verde
        color: isErro ? "#721c24" : "#155724", // Texto vermelho escuro ou verde escuro
        border: isErro ? "1px solid #f5c6cb" : "1px solid #c3e6cb", // Borda vermelha ou verde
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Uma sombrinha leve
        maxWidth: "500px", // Largura máxima para não esticar demais
        margin: "20px auto", // Centraliza e dá margem superior/inferior
        fontSize: "1.1em", // Texto um pouco maior
        fontWeight: "bold", // Texto em negrito
        display: "flex", // Para alinhar o ícone e o texto
        alignItems: "center", // Alinha verticalmente
        justifyContent: "center", // Centraliza horizontalmente
        gap: "10px", // Espaçamento entre o ícone e o texto
    }}
    >
    {/* Ícone condicional */}
    {isErro ? (
        <span role="img" aria-label="erro">
        ❌
        </span> // Ícone de X para erro
    ) : (
        <span role="img" aria-label="sucesso">
        ✅
        </span> // Ícone de check para sucesso
    )}
    {mensagem}
    </p>
)}
</div>
);
}

export default App;
