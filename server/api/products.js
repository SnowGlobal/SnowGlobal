const router = require("express").Router();
const Products = require("../db/models/Products");

router.get("/", async (req, res, next) => {
  try {
    const allProducts = await Products.findAll();
    res.send(allProducts);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
