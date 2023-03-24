const express = require('express')

const app = express();
const PORTA = 3000;

app.get("/api/produtos", (req, res) => { 
    res.send("Lista de Produtos");
})

app.get("/api/produtos/:id", (req, res) => { 
    const id = req.params.id;
    res.send(`Buscar pelo id: ${id}`);
})

app.post("/api/produtos", (req, res) => { 
    res.send("Cadastro de Produtos");
})

app.put("/api/produtos/:id", (req, res) => { 
    const id = req.params.id;
    res.send(`Atualizando o produto ${id}`);
})

app.delete("/api/produtos/:id", (req, res) => { 
    const id = req.params.id;
    res.send(`Deletando o produto ${id}`);
})

app.listen(PORTA, () => {
    console.log(`Servidor iniciado na porta ${PORTA}`);
})