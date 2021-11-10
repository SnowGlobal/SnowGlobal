const router = require("express").Router();
const Cart = require("../db/models/Products"); // change to Cart once db is created

router.get("/:userId", async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: { userId: req.params.userId },
    });
    res.send(cart);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
