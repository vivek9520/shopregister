const { Router } = require("express");
const multer = require("multer");

const productController = require("../controllers/productController");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    console.log("hello" + req.body.shopID);
    // console.log(req)
    cb(
      null,
      req.body.shopID + " " + new Date().toISOString() + "_" + file.originalname
    );
  },
});

const upload = multer({ storage: storage });

const router = Router();
router.get("/api/v1/products", productController.product_get);
router.get("/api/v1/products/:id", productController.product_get_byID);
router.post(
  "/api/v1/products",
  upload.single("productImage"),
  productController.product_post
);

module.exports = router;
