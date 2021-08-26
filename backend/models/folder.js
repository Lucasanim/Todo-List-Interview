const Sequelize = require("sequelize");

const sequelize = require("../config/database");

const Folder = sequelize.define("folder", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Folder;
