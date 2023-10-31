var express = require("express");
var router = express.Router();
var cart=require('../controller/cartController')
var userMiddleware = require("../middleware/user");


router.post("/add", userMiddleware.userSecure, cart.addToCart);
router.get("/", userMiddleware.userSecure, cart.getCart);
router.delete("/delete/:id",cart.deleteCart);
router.put("/update/:id", userMiddleware.userSecure, cart.updateCart);
router.get("/user/:id",userMiddleware.userSecure,cart.getCartOfUser);

module.exports = router;