const Sequelize = require("sequelize");

const sequelize = new Sequelize("l2TgX4oF3C", "l2TgX4oF3C", "5S6evOQ8yp", {
  dialect: "mysql",
  host: "remotemysql.com",
});
// const sequelize = new Sequelize("todo-list", "root", "root", {
//   dialect: "mysql",
//   host: "localhost",
// });

module.exports = sequelize;
