const mongoose = require("mongoose");
const express = require("express");
const Pessoa = require("../models/Pessoa");
const router = express.Router();

router.get("/", async(req, res) => {
    const pessoas = await Pessoa.find();
    res.send(pessoas);
});

router.post("/", async(req, res) => {
    const pessoa = Pessoa.create(req.body);
    res.send(pessoa);
});

module.exports = (app) => app.use("/pessoa", router);