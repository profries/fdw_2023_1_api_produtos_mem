const express = require('express')

const app = express();
const PORTA = 3000;

let listaProdutos = [
    { id: 1, nome: "Arroz", preco: 7}, 
    { id: 2, nome: "Feijao", preco: 9},
    { id: 3, nome: "Acucar", preco: 4},
]

let idAutoIncrement = 4;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/api/produtos", (req, res) => { 
    res.json(listaProdutos);
})

app.get("/api/produtos/:id", (req, res) => { 
    const id = req.params.id;

    const produtoEncontrado = listaProdutos.find((produto) => {
        return (produto.id == id);
    })

    if(produtoEncontrado){ 
        return res.json(produtoEncontrado);
    }
    else {
        return res.status(404).json({ Erro: "Produto nao encontrado"});
    }
})

app.post("/api/produtos", (req, res) => { 
    //receber o produto
    const novoProduto = req.body;
    //validar os dados

    if(novoProduto && novoProduto.nome && novoProduto.preco){
        //se OK, cadastro os produtos e retorno 201
        novoProduto.id = idAutoIncrement++;
        listaProdutos.push(novoProduto);
        return res.status(201).json(novoProduto);
    }
    else{
        //senao retorna 400
        return res.status(400).json({
            Erro: "Nome e/ou preco sao obrigatorios"
        });
    }
})

app.put("/api/produtos/:id", (req, res) => { 
    const id = req.params.id;
    const produtoAlterar = req.body;

    if(!produtoAlterar || !produtoAlterar.nome || !produtoAlterar.preco){
        return res.status(400).json({
            Erro: "Nome e/ou preco sao obrigatorios"
        });
    }

    const produtoEncontrado = listaProdutos.find((produto) => {
        return (produto.id == id);
    })

    if(produtoEncontrado){ 
        produtoEncontrado.nome = produtoAlterar.nome;
        produtoEncontrado.preco = produtoAlterar.preco;
        return res.json(produtoEncontrado);
    }
    else {
        return res.status(404).json({ Erro: "Produto nao encontrado"});
    }

})

app.delete("/api/produtos/:id", (req, res) => { 
    const id = req.params.id;

    const indiceProduto = listaProdutos.findIndex(
        (produto) => {
            return (produto.id == id);
        }
    )

    if(indiceProduto >= 0){ 
        const produtoDeletado = listaProdutos.splice(indiceProduto, 1)[0];
        return res.json(produtoDeletado);
    }
    else {
        return res.status(404).json({ Erro: "Produto nao encontrado"});
    }

})

app.listen(PORTA, () => {
    console.log(`Servidor iniciado na porta ${PORTA}`);
})