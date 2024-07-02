var express = require("express");
var apiRouterV2 = express.Router();

const knex = require("knex")(require("../knexfile").development);

apiRouterV2.get("/produtos", function (req, res, next) {
  knex
    .select("*")
    .from("produtos")
    .then((rows) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro ao buscar os produtos.",
      });
    });
});

apiRouterV2.get("/produtos/:id", function (req, res, next) {
  let id = req.params.id;

  if (!id) res.status(400).send("ID não informado");

  knex
    .select("*")
    .from("produtos")
    .where("id", id)
    .then((rows) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro ao buscar os produtos.",
      });
    });
});

apiRouterV2.post("/produtos", function (req, res, next) {
  if (req.body.id) delete req.body.id;

  let produto = req.body;

  knex("produtos")
    .insert(produto, ["id"])
    .then((produtos) => {
      if (produtos.length == 0) {
        res.status(400).send({
          message: err.message || "Ocorreu um erro ao inserir o produtos.",
        });
        return;
      }

      let id = produtos[0].id;

      res.status(201).json({
        message: `Produto inserido com sucesso`,
        data: { id },
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro ao inserir o produto.",
      });
    });
});

apiRouterV2.delete("/produtos/:id", function (req, res, next) {
  let id = req.params.id;

  if (!id) res.status(400).send("ID não informado");

  knex("produtos")
    .where("id", id)
    .del()
    .then((result) => {
      if (result == 0) {
        res.status(404).send({
          message: "Produto não encontrado",
        });
        return;
      }

      res.status(200).json({
        message: `Produto excluído com sucesso`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Ocorreu um erro ao excluir o produtos.",
      });
    });
});

apiRouterV2.put("/produtos/:id", function (req, res, next) {
  let id = req.params.id;

  if (!id) res.status(400).send("ID não informado");

  knex("produtos")
    .where("id", id)
    .update(req.body)
    .then((result) => {
      if (result == 0) {
        res.status(404).send({
          message: "Produto não encontrado",
        });
        return;
      }

      res.status(200).json({
        message: `Produto atualizado com sucesso`,
        data: { id },
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro ao atualizar o produto.",
      });
    });
});

module.exports = apiRouterV2;
