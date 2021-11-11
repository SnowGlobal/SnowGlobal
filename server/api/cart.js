const router = require("express").Router();
const {
  models: { User, Products, Cart },
} = require("../db");
const Sequelize = require("sequelize");

router.get("/:userId", async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: { userId: req.params.userId },
    });

    const productsFound = await Products.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: cart.map((item) => item.productId),
        },
      },
    });

    let superObject = {
      cartQty: cart,
      cartProducts: productsFound,
    }

    res.send(superObject);
  } catch (e) {
    next(e);
  }
});

// router.post("/:userId/:productId", async (req, res, next) => {
//   try {
//     const userId = req.params.userId;
//     const productId = req.params.productId;
//     const quantity = req.body.quantity;

//     const cart = await Cart.findOrCreate({
//       where: { userId: userId, productId: productId },
//       defaults: { quantity: quantity },
//     });
//     res.send(cart);

//   } catch (e) {
//     next(e);
//   }
// })

module.exports = router;
