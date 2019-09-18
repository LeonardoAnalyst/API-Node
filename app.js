const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
Clubes = require('./models/clubes');


app = express();

//Conexao MongoDB

mongoose.connect('mongodb://"+srv+"://root:root@cluster0-84qfi.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
},(err)=>{
console.log(`Erro ao conectar ${err}`);

});

app.use(bodyParser());

var port = process.env.PORT || 3000;

// Rotas 

var router = express.Router();
router.get('/', (req, res) => {
    res.json({ messae: 'API CodeZera' });
});

router.route('/times')
    .get((req, res) => {
        Clubes.find((err, dados) => {
            if (err) {
                res.send(err);
            } else {
                res.json(dados)
            }
        })
    })
    .post((req, res) => {
        var clubes = new Clubes();
        clubes.nome = req.body.nome;
        clubes.save((err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'Time cadastrado com sucesso!' });
            }
        });
    });

router.route('/times/:id')
    .get((req, res) => {
        Clubes.findById(req.params.id, (err, dados) => {
            if (err) {
                res.send(err);
            } else {
                res.json(dados);
            }
        });
    })
    .put((req, res) => {
        Clubes.findById(req.params.id, (err, dados) => {
            if (err) {
                res.send(err);
            } else {
                dados.nome = req.body.nome;
                dados.save((err) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({ message: 'Time atualizado com sucesso!' })
                    }
                });
            }
        });
    })
    .delete((req, res) => {
        Clubes.remove({ _id: req.params.id }, (err, dados) => {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'Time excluido com sucesso!' });
            }
        });
    });

app.use('/api', router);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

