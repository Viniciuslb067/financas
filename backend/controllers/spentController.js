const express = require("express");

const Spent = require("../models/Spent");
const Month = require("../models/Month");

const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const spents = await Month.find().populate(['user', 'spents']);

    return res.json(spents);

  } catch (err) {
    return res.status(400).send({ error: "Erro ao listar os gastos" });
  }
});

router.get('/:spentId', async (req, res) => {
  try {
    const spent = await Month.findById(req.params.spentId).populate('user', 'spents');

    return res.json({ spent });

  } catch (err) {
    return res.status(400).send({ error: "Erro ao listar o gasto" });
  }
});

router.post('/', async (req, res) => {
  try {
    const { month, spents } = req.body;

    const monthCreate = await Month.create({ month, user: req.userId });

    await Promise.all(spents.map(async spent => {
      const monthSpent = new Spent({ ...spent, month: monthCreate._id });

      await monthSpent.save();

      monthCreate.spents.push(monthSpent);
    }));

    await monthCreate.save();

    return res.send({ monthCreate });

  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err });
  }
});

router.put("/:spentdId", async (req, res) => {
  try {
    const { month, spents, name, value } = req.body;

    const monthCreate = await Month.findByIdAndUpdate(req.params.spentId, { 

    }, {new: true});

    await Promise.all(spents.map(async spent => {
      const monthSpent = new Spent({ ...spent, month: monthCreate._id });

      await monthSpent.save();

      monthCreate.spents.push(monthSpent);
    }));

    await monthCreate.save();

    return res.send({ monthCreate });

  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err });
  }
});

router.delete('/:spentId', async (req, res) => {
  try {
    await Month.findByIdAndRemove(req.params.spentId)

    return res.send();

  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

module.exports = app => app.use('/spents', router);