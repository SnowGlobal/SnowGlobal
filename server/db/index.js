//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Products = require('./models/Products')
const Cart = require('./models/Cart')

//associations could go here!
User.belongsToMany(Products, { through: Cart })
Products.belongsToMany(User, { through: Cart })


module.exports = {
  db,
  models: {
    User,
    Products,
    Cart
  },
}
