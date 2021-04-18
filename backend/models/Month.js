const mongoose = require("../database");

const MonthSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  spents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Spent',
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Month = mongoose.model("Month", MonthSchema);
module.exports = Month;