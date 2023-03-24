let listaProdutos = [
    { id: 1, nome: "Arroz", preco: 7}, 
    { id: 2, nome: "Feijao", preco: 9},
    { id: 3, nome: "Acucar", preco: 4},
]

let idAutoIncrement = 4;

exports.listar = (req, res) => { 
    res.json(listaProdutos);
}

exports.buscarPorId = (req, res) => { 
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
}

exports.inserir = (req, res) => { 
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
}

exports.atualizar = (req, res) => { 
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

}

exports.deletar = (req, res) => { 
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

}
