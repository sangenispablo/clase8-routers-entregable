const express = require("express");

const routeProducto = require("./routers/productos");

const app = express();

// body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// estaticos
app.use(express.static("public"));

app.use("/api", routeProducto);

app.listen(8080, () => {
  console.log("Escuchando puerto 8080");
});
