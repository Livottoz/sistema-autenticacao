const express = require('express');
const db = require('./db');

const app = express();


//configuraçoes do express
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


app.get('/dashboard', (req, res) => {
    res.render('dashboard', {nome: 'Nicole Militão Livotto'})
});

app.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

app.post('/cadastrar', (req, res) => {
    //enviar os dados para o banco de dados
    const {nome, email, senha} = req.body;
    const sql = `insert into usuarios (nome, email, senha)  VALUES (?, ?, ?)`; 
    try{
    db.query(sql, [nome, email, senha], (error, resultados) => {
        if(error) {
            console.log('erro ao inserir no banco de dados', error);
            return res.status(500).send('Erro interno do servidor');
        }
        console.log('usuario incluido com sucesso!');
        res.redirect('/login');
    });
    } catch(error){
        console.log('Ocorreu um erro', error);
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
const {email, senha} = req.body;
try {
const sql = `SELECT * FROM usuarios WHERE email = ? AND senha = ? ;`;
db.query(sql, [email, senha], (error, resultados) => {
if(error) {
console.log('Erro ao consultar o BDD.');
console.log(error);
return res.status(500).send('Erro interno do servidor.');
}
if(resultados.length > 0) {
console.log('Login efetuado com sucesso!');
return res.redirect('/dashboard');
} else {
console.log('Email ou senha incorretos.');
return res.status(401).send('Email ou senha incorretos.');
}
})
} catch(error) {
console.log('Ocorreu um erro.', error);
}
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});