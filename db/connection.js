// Importando o sequelize:
const Sequelize = require("sequelize");

// Criando uma instancia do sequelize para fazer a conexão com o banco.
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/app.db",
});

// Exportando o arquivo de config do banco para utilizar em outros lugares.
module.exports = sequelize;
