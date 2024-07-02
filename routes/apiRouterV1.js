var express = require("express");
var apiRouterV1 = express.Router();

var produtos = [
  {
    id: 1,
    descricao: "Camiseta básica masculina",
    marca: "Marca A",
    preco: 29.99,
  },
  { id: 2, descricao: "Calça jeans feminina", marca: "Marca B", preco: 59.99 },
  { id: 3, descricao: "Blusa de frio unissex", marca: "Marca C", preco: 49.99 },
  { id: 4, descricao: "Vestido estampado", marca: "Marca D", preco: 79.99 },
  {
    id: 5,
    descricao: "Camisa social masculina",
    marca: "Marca A",
    preco: 69.99,
  },
  { id: 6, descricao: "Saia jeans feminina", marca: "Marca B", preco: 39.99 },
  { id: 7, descricao: "Blazer elegante", marca: "Marca C", preco: 89.99 },
  { id: 8, descricao: "Shorts esportivo", marca: "Marca D", preco: 34.99 },
  { id: 9, descricao: "Jaqueta corta-vento", marca: "Marca A", preco: 59.99 },
  {
    id: 10,
    descricao: "Vestido de festa longo",
    marca: "Marca B",
    preco: 129.99,
  },
];

apiRouterV1.get("/produtos", function (req, res, next) {
  res.json(produtos);
});

apiRouterV1.get("/produtos/:id", function (req, res, next) {
  let id = req.params.id;

  if (!id) res.status(400).send("ID não informado");

  let idx = produtos.findIndex((p) => p.id == +id);

  if (idx < 0) res.status(404).send("Produto não encontrado");

  res.json(produtos[idx]);
});

apiRouterV1.put("/produtos/:id", function (req, res, next) {
  let id = req.params.id;

  if (!id) res.status(400).send("ID não informado");

  let idx = produtos.findIndex((p) => p.id == +id);

  if (idx < 0) res.status(404).send("Produto não encontrado");

  req.body.id = +id;
  produtos[idx] = req.body;

  res.json(produtos[idx]);
});

apiRouterV1.post("/produtos", function (req, res, next) {
  if (req.body.id) delete req.body.id;

  let produto = req.body;

  produto.id = Math.max(...produtos.map((p) => p.id)) + 1;
  produtos.push(produto);

  res
    .status(201)
    .json({
      message: `Produto inserido com sucesso`,
      data: { id: produto.id },
    });
});

module.exports = apiRouterV1;
