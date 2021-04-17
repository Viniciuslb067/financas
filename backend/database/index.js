const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://lbAdmin:naDGHYSsSZ5nK5Uh@fdb.izcxq.mongodb.net/db?retryWrites=true&w=majority", {
  dbName: "db",
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
.then(() => {
  console.log("Conectado ao banco de dados!");
})

mongoose.Promise = global.Promise;

module.exports = mongoose;
