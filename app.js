const express = require('express')

const app = express();
const PORTA = 3000;

app.get("/hello", (req, res) => { 
    res.send("Hello World");
})

app.listen(PORTA, () => {
    console.log(`Servidor iniciado na porta ${PORTA}`);
})