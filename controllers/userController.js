const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(
  "sk_test_51P7sZfSHcnaFG3YWLAhh8mWzuFfJKWU6gNpTTus7knqsPgVdXwvuETlXkDzetN4qrgmapIph3ITLjnXgPKQLv0QN002DnyPQJM"
);

const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const duplicate = await User.findOne({ email });

  if (duplicate) {
    return res.status(400).json({ message: "Duplicate Email" });
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const userObject = { firstName, lastName, email, password: hashedPwd };

  try {
    const newUser = await User.create(userObject);

    if (newUser) {
      res
        .status(201)
        .json({ message: `New user ${newUser.firstName} created` });
    } else {
      res.status(400).json({ message: "Invalid user data received" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const addToWishlist = asyncHandler(async (req, res) => {
  const { id: prodId } = req.params;
  const { id } = req.user;

  try {
    const user = await User.findById(id);
    const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyAdded) {
      let user = await User.findByIdAndUpdate(
        id,
        {
          $pull: { wishlist: prodId },
        },
        { new: true }
      );

      res.status(201).json({ wishList: user.wishlist });
    } else {
      let user = await User.findByIdAndUpdate(
        id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );

      res.status(201).json({ wishList: user.wishlist });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const addToCart = asyncHandler(async (req, res) => {
  const { id: prodId, qty, pcolor } = req.body;

  const { id } = req.user;

  try {
    const cartItem = await Cart.create({
      userId: id,
      productId: prodId,
      qty,
      pcolor,
    });
    console.log(cartItem);
    res.status(201).json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});

const getWishList = asyncHandler(async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id).populate("wishlist");

    if (!user.wishlist) {
      return res.status(401).json({ message: "error in Get Wish List list" });
    }

    res.status(200).json(user.wishlist);
  } catch (error) {
    throw new Error(error);
  }
});

const getCartItems = asyncHandler(async (req, res) => {
  const { id } = req.user;
  try {
    const cartItems = await Cart.find({ userId: id }).populate("productId");

    if (!cartItems) {
      return res.status(401).json({ message: "error in Get Cart Items List" });
    }

    res.status(200).json(cartItems);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCartItem = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { cartId } = req.params;
  console.log(cartId);
  try {
    const delCartItem = await Cart.findByIdAndDelete(cartId);

    if (!delCartItem) {
      return res
        .status(401)
        .json({ message: "error in Delete Cart Item List" });
    }

    res.status(200).json({ delCartItem, message: "Success" });
  } catch (error) {
    throw new Error(error);
  }
});
const updateCartItem = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { id: cartId, qty } = req.body;
  console.log("reqbody", req.body);
  try {
    const cartItem = await Cart.findOne({ userId: id, _id: cartId });
    cartItem.qty = qty;
    cartItem.save();
    res.status(201).json(cartItem);

    if (!cartItem) {
      return res
        .status(401)
        .json({ message: "error in update Cart Item List" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const createOrder = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { shippingInfo, orderItems, totalAmount, paymentInfo, token } =
    req.body;

  const { id } = req.user;
  try {
    const customer = stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    console.log("custommer", customer);

    const payment = stripe.checkout.sessions.create({
      customer: customer.id,
      currency: "INR",
      receipt_email: token.email,
    });
    console.log("payment", payment);
    // if (payment) {

    const order = await Order.create({
      user: id,
      shippingInfo,
      paymentInfo,
      orderItems,
      totalAmount,
    });
    console.log(order);

    order?.orderItems?.map(async (item) => {
      const updatedCart = await Cart.findByIdAndDelete(item?.cartItemId);
    });
    res.status(201).json({
      order,
      messate: "success",
    });

    // }
  } catch (error) {
    res.status(400).json({ error });
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const { id } = req.user;
  console.log(req.user);
  try {
    const orders = await Order.find({ user: id });
    console.log(orders);
    res.status(201).json(orders);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  addToWishlist,
  getWishList,
  addToCart,
  getCartItems,
  deleteCartItem,
  updateCartItem,
  createOrder,
  getOrders,
};
