const express = require('express')
const rotaProduto = require('./rotas/produto_rotas')

const app = express();
const PORTA = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/produtos', rotaProduto);

app.listen(PORTA, () => {
    console.log(`Servidor iniciado na porta ${PORTA}`);
})