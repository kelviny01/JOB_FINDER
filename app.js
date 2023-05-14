// Importando o express: line 9
// Importando o handlebars: line 10
// Instanciando o express: line 11
// Importando o pacote path: line 12
// Importando o arquivo db: line 13
// Importando o bodyParser: line 14
// Importando o Job: line 15
// Importando o Sequelize: line 16
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const path = require("path");
const db = require("./db/connection");
const bodyParser = require("body-parser");
const Job = require("./models/Job");
const Sequelize = require("sequelize");
const Op = Sequelize.Op; // Pacote utilizado para fazer consultas.

const PORT = 3000;

app.listen(PORT, function () {
  console.log(`O Express está rodando na porta ${PORT}`);
});

// Utilizando o body parser:
app.use(bodyParser.urlencoded({ extended: false }));

// Utilizando o handle bars:
app.set("views", path.join(__dirname, "views")); // As views do nosso projeto estarão no diretório views, as views serão os layouts com o nosso HTML no formato de handlebars para poder renderizar os dados que vem e vão do back-end.
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" })); // Definindo o layout principal da aplicação. Onde ficará a parte que mais se repete, por exemplo o head, footer...
app.set("view engine", "handlebars"); // Dizendo para o express qual será nossa view engine, ou seja, qual será o frame/lib que iremos utilizar para renderizar as views, que no nosso caso será o: handlebars.

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// db connection:
db.authenticate() // Nos retorna uma promise.
  .then(() => {
    // Tratando o sucesso da promise. Ou seja, vamos ter o sucesso com a conexão com o banco.
    console.log("Conectou ao banco com sucesso");
  })
  .catch((err) => {
    // Utilizando o catch para saber os eventuais erros que ocorrerem com a conexão com o banco.
    console.log(err);
  });

// Criando as rotas:
app.get("/", (req, res) => {
  // Criando a parte de busca do input.
  let search = req.query.job;
  let query = "%" + search + "%"; // PH --> PHP, Word --> WordPress, press --> WordPress

  // If para quando não tiver busca.
  if (!search) {
    // O findAll vai encontrar todas as jobs que tenho salva no meu banco de dados.
    Job.findAll({
      order: [
        ["createdAt", "DESC"], // O DESC vai ser ordernados do mais novo para o mais velho.
      ],
    })
      .then((jobs) => {
        res.render("index", {
          jobs,
        });
      })
      .catch((err) => console.log(err));
    // Quando tiver busca.
  } else {
    // O findAll vai encontrar todas as jobs que tenho salva no meu banco de dados.
    Job.findAll({
      // Utilizando o where para fazer querys (consultas).
      where: { title: { [Op.like]: query } },
      order: [
        ["createdAt", "DESC"], // O DESC vai ser ordernados do mais novo para o mais velho.
      ],
    })
      .then((jobs) => {
        res.render("index", {
          jobs,
          search,
        });
      })
      .catch((err) => console.log(err));
  }
});

// Utilizando as rotas do jobs:
app.use("/jobs", require("./routes/jobs"));
