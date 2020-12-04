const mongoose = require("../database");
const PessoaSchema = new mongoose.Schema({
    nome: {
        type: String
    },
    email: {
        type: String
    }
});
const Pessoa = mongoose.model("Pessoa", PessoaSchema);
module.exports = Pessoa;