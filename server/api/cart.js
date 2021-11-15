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

router.put("/", async (req, res, next) => {
  try {
    let user = await User.findByToken(req.headers.authorization);
    if (user) {
      let cart = await Cart.findOne({
        //find cart
        where: { userId: user.id }, //where userId is equal to user.id
        include: [{ model: Products }], //include products
      });
      let product = await Products.findOne({
        //find product
        where: { id: req.body.productId }, // where id is equal to req.body.productId
      });
      if (cart) {
        let cartProduct = await CartProducts.findOne({
          where: { cartId: cart.id, productId: product.id },
        });
        if (cartProduct) {
          cartProduct.quantity += req.body.quantity;
          await cartProduct.save();
        } else {
          await CartProducts.create({
            cartId: cart.id,
            productId: product.id,
            quantity: req.body.quantity,
          });
        }
      } else {
        cart = await Cart.create({
          userId: user.id,
        });
        await CartProducts.create({
          cartId: cart.id,
          productId: product.id,
          quantity: req.body.quantity,
        });
      }
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let user = await User.findByToken(req.headers.authorization);
    if (user) {
      let cart = await Cart.findOne({
        where: { userId: user.id },
        include: [{ model: Products }],
      });
      let product = await Products.findOne({
        where: { id: req.body.productId },
      });
      if (cart) {
        let cartProduct = await CartProducts.findOne({
          where: { cartId: cart.id, productId: product.id },
        });
        if (cartProduct) {
          cartProduct.quantity += req.body.quantity;
          await cartProduct.save();
        } else {
          await CartProducts.create({
            cartId: cart.id,
            productId: product.id,
            quantity: req.body.quantity,
          });
        }
      } else {
        cart = await Cart.create({
          userId: user.id,
        });
        await CartProducts.create({
          cartId: cart.id,
          productId: product.id,
          quantity: req.body.quantity,
        });
      }
      res.sendStatus(200);
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
      res.sendStatus(204);
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
