const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const  {v4: uuidv4} = require("uuid")
const fs = require('fs')




app.use(bodyParser.json())

const db = require('./db.json')
app.get('/produtos', (req,res) => {
    const produtos = db.produtos
    res.status(200).json(produtos)
})

app.get('/produtos/nome/:nome', (req,res) => {
    const produtos = db.produtos
    const nomeProduto = req.params.nome
    const produto = produtos.filter((prod)=>prod.nome.toLowerCase()==nomeProduto)
    res.status(200).json(produto)
})

app.get('/produtos/:id', (req, res) => {
    const produtos = db.produtos;
    const _id = req.params.id;

    const produto = produtos.find((prod) => prod.id == _id);
    if (produto) {
        res.status(200).json(produto);
    } else {
        res.status(404).json({ error: "Produto not found" });
    }
});










app.get('/produto/nome/:id',(req, res)=>{

    const produtos  = db.produtos;
    const _id = req.params.id;

    const produto = produtos[_id - 1]
    
    console.log(produto)
    if(produto){
        res.status(200).json({Produto:produto});
    }else{
        res.status(404).json({Erro:"Produto não encontrado"})
    }
})


app.post('/produto/add',(req, res) =>{
    const dados = req.body
    const produto = db.produtos

    if(!dados.nome || !dados.preco){
        res.status(406).send({erro:'Nome e preço deve ser informado'})
    }else{
        res.status(200).json({Estatus:'Adicionado com sucesso'})
    }
    const _id = uuidv4()

    dados.id = _id

    const a = 100; 
    console.log(a)

    db.produtos.push(dados)
    fs.writeFile('./db.json', JSON.stringify(db),(err) => {
        if(err){
            res.status(500).send({"error":"erro no servidor"})
        }
    })
    
    res.json(dados)
})



app.listen(8000,()=> {
     console.log("Rodando na porta 8000");
})

