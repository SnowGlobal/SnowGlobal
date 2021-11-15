//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
// JOE_CR: Random model pluralization. Products is unlike User, Cart.
// Singular/plural doesn't matter so much, as long as it all matches.
const Products = require('./models/Products')
const Cart = require('./models/Cart')
const CartProducts = require('./models/CartProducts')

//associations could go here!

Cart.belongsTo(User);
User.hasOne(Cart);
Products.belongsToMany(Cart, {through: CartProducts});
Cart.belongsToMany(Products, {through: CartProducts});

module.exports = {
  db,
  models: {
    User,
    Products,
    Cart,
    CartProducts
  },
}
