const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('Cart', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
