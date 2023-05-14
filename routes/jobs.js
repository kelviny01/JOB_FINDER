const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// rota de teste
router.get("/test", (req, res) => {
  res.send("Deu certo");
});

// Detalhe da vaga --> view/1, view/2
router.get("/view/:id", (req, res) =>
  Job.findOne({
    where: { id: req.params.id },
  })
    .then((job) => {
      res.render("view", {
        job
      });
    })
    .catch((err) => console.log(err))
);

// Criando uma rota get para fazer a busca do formulário.
router.get("/add", (req, res) => {
  res.render("add");
});

// Criando as rotas que adicionam os jobs no projeto.
// Vamos criar a rota com o verbo POST para fazer essa busca via sequelize no banco.

// Add job via POST.
router.post("/add", (req, res) => {
  let { title, salary, company, description, email, new_job } = req.body; // Todos os dados vão vir para essa propriedade. Onde iremos fazer a destructuring.

  // Inserindo dados no sistema utilizando o método create().
  Job.create({
    title,
    description,
    salary,
    company,
    email,
    new_job,
  })
    .then(() => res.redirect("/")) // Caso dê tudo certo, seremos redirecionados para a home.
    .catch((err) => console.log(err));
});

// Exportando as rotas.
module.exports = router;
