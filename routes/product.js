var express = require("express");
var router = express.Router();
const product = require("../controller/productController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/add", upload.single("images"), product.addProduct);
router.get("/",product.getAllProduct);
router.get("/search/:key",product.searchProduct);
router.delete("/delete/:id",product.deleteProduct);
router.put("/update/:id", upload.single("images"), product.updateProduct);

module.exports = router;
