var express = require("express");
var router = express.Router();
var wishlist = require("../controller/wishlistController");


router.post("/add", wishlist.addToWishlist);
router.get("/", wishlist.getwishlist);
router.delete("/delete/:id", wishlist.deleteWishlist);
router.put("/update/:id",wishlist.updateWishlist);
router.get("/user/:id",  wishlist.getWishlisttOfUser);

module.exports = router;
