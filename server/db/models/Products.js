const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('products', {
  // JOE_CR: Consider renaming this column eventually to something more descriptive, and that will
  // not conflict with an automatic association column.
  productId: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  // JOE_CR: Consider adding more validations like "notEmpty" in the future.
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  // JOE_CR: Cents? Dollars?
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

  // JOE_CR: Consider making categories its own model/table and associating.
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
