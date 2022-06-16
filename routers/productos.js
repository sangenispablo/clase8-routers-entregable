const { Router } = require("express");

let productos = require("../data/productos");

const router = Router();

router.get("/productos", (req, res) => {
  res.send(productos);
});

router.get("/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find((producto) => producto.id == id);
  if (producto) {
    res.send(producto);
  } else {
    res.send({ ok: false, message: `El producto con id: ${id} no existe` });
  }
});

router.delete("/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = productos.findIndex((producto) => producto.id == id);
  if (indice != -1) {
    productos = productos.filter((producto) => producto.id != id);
    res.send({ ok: true, message: `El producto con id: ${id} fue borrado` });
  } else {
    res.send({ ok: false, message: `El producto con id: ${id} no existe` });
  }
});

router.put("/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const producto = req.body;
  const indice = productos.findIndex((producto) => producto.id == id);
  if (indice != -1) {
    producto.id = id;
    productos[indice] = producto;
    res.send({ ok: true, message: `El producto con id: ${id} fue modificado` });
  } else {
    res.send({ ok: false, message: `El producto con id: ${id} no existe` });
  }
});

router.post("/productos", (req, res) => {
  const producto = req.body;
  let nextId = 1;
  if (productos.length > 0) {
    nextId = productos[productos.length - 1].id + 1;
  }
  producto.id = nextId;
  productos.push(producto);
  res.status(201).send(producto);
});

module.exports = router;
