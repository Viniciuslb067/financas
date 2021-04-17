const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

require("./controllers/authController")(app);

app.listen(3002, () => {
  console.log("Servidor rodando!");
})