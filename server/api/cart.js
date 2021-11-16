const router = require("express").Router();
const {
  models: { User, Products, Cart, CartProducts },
} = require("../db");

const requireToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const user = await User.findByToken(authorization);
  if(user) {
    req.user = user;
    next();
  } else {
    return res.status(401).send({ error: "Please Sign Up" });
  }
};

router.get("/", requireToken, async (req, res, next) => {
  try {
    let cart = await Cart.findOne({
      where: { userId: req.user.id },
      include: [{ model: Products }],
    });
    res.send(cart);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      let cart = await CartProducts.findByPk(req.params.id);
      await cart.destroy();
      res.json(cart);
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    next(e);
  }
});

router.post("/:productId", requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      let product = await Products.findByPk(req.params.productId);
      let cart = await Cart.findOne({
        where: { userId: req.user.id },
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
          userId: req.user.id,
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

router.put("/:productId", requireToken, async (req, res, next) => {
  try {
    let product = await Products.findByPk(req.params.productId);
    let cart = await Cart.findOne({
      where: { userId: req.user.id },
      include: [{ model: Products }],
    })
    let cartProduct = await CartProducts.findOne({
      where: { CartId: cart.id, productId: product.id },
    })
    cartProduct.quantity = req.body.quantity;
    await cartProduct.save();

    //get the updated cart
    cart = await Cart.findOne({
      where: { userId: req.user.id },
      include: [{ model: Products }],
    })

    res.send(cart);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
