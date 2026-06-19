import express from "express"
import cameras from "../../data/cameras.json" with { type: 'json' };

const router = express.Router();

router.get("/", (req, res) => {
    res.json(cameras.products);
});


router.get("/:id", (req, res) => {
  const product = cameras.products.find(
    (item) => item.id === req.params.id
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }
  res.json(product);
});

export default router;