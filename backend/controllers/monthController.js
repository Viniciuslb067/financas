const express = require("express");

const Month = require("../models/Month");

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const months = await Month.find();

    return res.json(months);

  } catch (err) {
    return res.status(400).send({ error: "Erro ao listar os gastos" });
  }
});

router.post('/', async (req, res) => {
  try { 
    const month = await Month.create(req.body);

    return res.send(month);

  } catch (err) {
    return res.status(400).send({ error: "Erro ao cadastrar um mes" });
  }
});

module.exports = app => app.use('/month', router);