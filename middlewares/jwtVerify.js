const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const verifyjwt = expressAsyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  const token = authHeader.split(" ")[1];
  console.log({ token });
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.json({ message: "Forbidden" });

    req.user = decoded;

    next();
  });
});

module.exports = verifyjwt;
