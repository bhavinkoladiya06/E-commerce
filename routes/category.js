var express = require("express");
var router = express.Router();
const category=require('../controller/categoryController')
const multer=require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix +file.originalname);
  },
});

const upload = multer({ storage: storage });


router.post("/add",upload.single("image"),category.createCategory);
router.get('/',category.getAllCategory)
router.delete('/delete/:id',category.deleteCatogery)
router.put("/update/:id", upload.single("image"), category.updateCatogery);

module.exports = router;
