const router = require("express").Router();
const {
  models: { User, Products, Cart, CartProducts },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    // JOE_CR: Consider using a middleware that will do this functionality for you,
    // and then places the result on req.user or similar. This alleviates repetition and
    // improves maintainability.
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
    // JOE_CR: Getting the user here doesn't end up doing anything.
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
