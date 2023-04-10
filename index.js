const app = require("./app");
const port = 4000;
const dbURL = `mongodb+srv://sebastian7389:7314Geforce@eit-61543.ed3thpm.mongodb.net/?retryWrites=true&w=majority`;

const mongoose = require("mongoose");

mongoose
  .connect(dbURL)
  .then(() => {
    console.log(`\x1b[35m Conexión a la DB satisfactoria \x1b[37m`);

    // Poner en marcha mi servidor express
    app.listen(port, () => {
      console.log(`\x1b[36m Servidor funcionando en puerto ${port} \x1b[37m`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
