const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./controllers/authController")(app);
require("./controllers/spentController")(app);
require("./controllers/monthController")(app);

app.listen(3002, () => {
  console.log("Servidor rodando!");
})