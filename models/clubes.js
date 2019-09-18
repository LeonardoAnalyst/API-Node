const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clubeSchema = new Schema({
    nome: {
        type: String, required: true, trim: true
    }
});

module.exports = mongoose.model('Clubes', clubeSchema);