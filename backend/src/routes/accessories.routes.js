import express from "express";
import  accessories from "../../data/accessories.json" with { type: 'json' };


const router = express.Router();

router.get("/", (req, res) => {
  res.json(accessories.products);
});
router.get("/:id", (req, res) => {
  const product = accessories.products.find(
    (item) => item.id === req.params.id,
  );
  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }
  res.json(product);
});

export default router;
