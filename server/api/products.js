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

router.delete(":/id", async (req, res, next) => {
  try {
    const removeProduct = await Products.findOne({
      where: { id: req.params.id },
    });
    if (!removeProduct) {
      Error.status = 404;
    } else {
      await removeProduct.destroy();
      res.sendStatus(204);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
