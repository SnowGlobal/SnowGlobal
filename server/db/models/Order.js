const sequelize = require('sequelize');
const db = require('../db')

module.exports = db.define('order', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },

})
