const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

require("./controller/PessoaController")(app);


app.listen(3000, () => {
    console.log("Escutando na porta 3000");
});