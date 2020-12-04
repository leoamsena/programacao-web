const express = require("express");
const router = express.Router();

const Pessoa = require("../model/Pessoa");

router.get("/", async(req, res) => {
    const pessoas = await Pessoa.find();
    res.send(pessoas);
});

router.post("/", async(req, res) => {
    const pessoa = await Pessoa.create(req.body);
    res.send(pessoa);
});

module.exports = (app) => app.use("/pessoas", router);