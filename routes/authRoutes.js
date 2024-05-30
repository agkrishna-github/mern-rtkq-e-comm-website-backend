const express = require("express");
const router = express.Router();

const { userLogin, adminLogin } = require("../controllers/authController");

router.post("/loginUser", userLogin);
router.post("/loginAdmin", adminLogin);

module.exports = router;
