//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Products = require('./models/Products')
const Cart = require('./models/Cart')
const CartProducts = require('./models/CartProducts')
const CartUsers = require('./models/CartUsers')
const Order = require('./models/Order')

//associations could go here!

Cart.belongsTo(User);
User.hasOne(Cart);
Products.belongsToMany(Cart, {through: CartProducts});
Cart.belongsToMany(Products, {through: CartProducts});
Order.belongsTo(User, {through: CartUsers})
User.belongsToMany(Order, {through: CartUsers})

module.exports = {
  db,
  models: {
    User,
    Products,
    Cart,
    CartProducts,
    CartUsers,
    Order
  },
}
