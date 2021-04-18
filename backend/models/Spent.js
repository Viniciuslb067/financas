const mongoose = require("../database");

const SpentSchema = new mongoose.Schema({
  month: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Month',
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Spent = mongoose.model("Spent", SpentSchema);
module.exports = Spent;