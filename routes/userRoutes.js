const express = require("express");
const router = express.Router();

const {
  createUser,
  addToWishlist,
  getWishList,
  addToCart,
  getCartItems,
  deleteCartItem,
  updateCartItem,
  createOrder,
  getOrders,
} = require("../controllers/userController");
const jwtVerify = require("../middlewares/jwtVerify");

router.post("/register", createUser);
router.put("/addtowishlist/:id", jwtVerify, addToWishlist);
router.get("/getwishlist", jwtVerify, getWishList);
router.post("/addtocart", jwtVerify, addToCart);
router.get("/getcartitems", jwtVerify, getCartItems);
router.delete("/deletecartitem/:cartId", jwtVerify, deleteCartItem);
router.post("/updatecartitem", jwtVerify, updateCartItem);
router.post("/createorder", jwtVerify, createOrder);
router.get("/getorders", jwtVerify, getOrders);

module.exports = router;
