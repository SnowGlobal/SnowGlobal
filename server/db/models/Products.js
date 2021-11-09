const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('products', {
  productId: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },

  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'https://via.placeholder.com/150',
  },

  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    },
  },

  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      max: 5,
      min: 0
    },
  },
});
