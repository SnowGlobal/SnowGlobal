const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('Cart', {
  Quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
