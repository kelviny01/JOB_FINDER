const Sequelize = require("sequelize");
// Importando o db.
const db = require("../db/connection");

const Job = db.define("job", {
  // Criando um objeto com base como criamos lá no nosso banco de dados.
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  salary: {
    type: Sequelize.STRING,
  },
  company: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  new_job: {
    type: Sequelize.INTEGER,
  },
});

// Exportando:
module.exports = Job;
