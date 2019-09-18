const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
Clubes = require('./models/clubes');


app = express();

//Conexao MongoDB

mongoose.connect('mongodb+srv://root:root@cluster0-84qfi.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use(bodyParser());

var port = process.env.PORT || 3000;

// Rotas 

var route = express.Router();
route.get('/', (req, res) => {
    res.json({ messae: 'API CodeZera' });
});

route.Router('/times')
    .post((req, res) => {
        var clubes = new Clubes();
        clubes.nome = req.body.nome;
        clubes.save((err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'Time cadastrado com sucesso!' })
            }
        })
    });

app.use('/api', route);

app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port);
});

