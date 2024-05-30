const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(400).json({ message: "Unauthorized" });
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) return res.status(400).json({ message: "Unauthorized" });

    const accessToken = jwt.sign(
      {
        id: foundUser._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { id: foundUser._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,

      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ accessToken, user: foundUser.firstName, id: foundUser._id });
  } catch (error) {
    throw new Error(error);
  }
});

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const foundadmin = await User.findOne({ email });
  if (!foundadmin || foundadmin.role !== "admin") {
    return res.status(400).json({ message: "Unathorised" });
  }

  const match = await bcrypt.compare(password, foundadmin.password);

  if (!match) return res.status(400).json({ message: "Unauthorized" });

  if (match) {
    const refreshToken = jwt.sign(
      { id: foundadmin._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "3d",
      }
    );
    await User.findByIdAndUpdate(
      foundadmin._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );

    const accessToken = jwt.sign(
      { id: foundadmin._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3d",
      }
    );
    res.status(200).json({
      _id: foundadmin?._id,
      firstname: foundadmin?.firstName,
      lastname: foundadmin?.lastName,
      email: foundadmin?.email,
      token: accessToken,
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

module.exports = { userLogin, adminLogin };
