const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('cart_products', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    },
  }
})
