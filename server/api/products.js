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

// create an edit route
router.put("/:productId", async (req, res, next) => {
  try {
    const updatedProduct = await Products.findByPk(req.params.productId);
    await updatedProduct.update(req.body);
    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
