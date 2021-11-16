const router = require("express").Router();
const {
  models: { User, Products, Cart, CartProducts },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    let user = await User.findByToken(req.headers.authorization);
    if (user) {
      let cart = await Cart.findOne({
        where: { userId: user.id },
        include: [{ model: Products }],
      });
      res.send(cart);
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let user = await User.findByToken(req.headers.authorization);
    if (user) {
      let cart = await CartProducts.findByPk(req.params.id);
      await cart.destroy();
      res.json({ message: "Product removed from cart" });
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    next(e);
  }
});

router.post("/:productId", async (req, res, next) => {
  try {
    let user = await User.findByToken(req.headers.authorization);
    if (user) {
      let product = await Products.findByPk(req.params.productId);
      let cart = await Cart.findOne({
        where: { userId: user.id },
        include: [{ model: Products }],
      });
      if (cart) {
        let cartProduct = await CartProducts.findOne({
          where: {
            CartId: cart.id,
            productId: product.id,
          },
        });
        if (cartProduct) {
          cartProduct.quantity += 1;
          await cartProduct.save();
        } else {
          await CartProducts.create({
            CartId: cart.id,
            productId: product.id,
            quantity: 1,
          });
        }
      } else {
        cart = await Cart.create({
          userId: user.id,
        });
        await CartProducts.create({
          CartId: cart.id,
          productId: product.id,
          quantity: 1,
        });
      }
      res.json({});
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
