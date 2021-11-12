const router = require("express").Router();
const {
  models: { User, Products, Cart, CartProducts },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    let user = await User.findByToken(req.headers.authorization)
    if(user){
      let cart = await Cart.findOne({
        where: { userId: user.id },
        include: [{ model: Products }]
      });
      res.send(cart);
    } else {
      res.sendStatus(401)
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
