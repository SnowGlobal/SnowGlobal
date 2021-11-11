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

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedProduct = await Products.findByPk(req.params.id);
    await deletedProduct.destroy();
    res.send(deletedProduct);
  } catch (e) {
    next(e);
  }
});

router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Products.findByPk(req.params.productId);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
