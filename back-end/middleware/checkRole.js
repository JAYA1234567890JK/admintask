const jwt = require("jsonwebtoken");
const Users = require("../models/Schema");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, "token");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

const checkRole = (roles) => (req, res, next) => {
  verifyToken(req, res, async () => {
    const user = await Users.findById(req.user.id);
    if (!roles.includes(user.role)) {
      return res
        .status(400)
        .json({ message: "Access Denied: Unauthorized Role" });
    }
    next();
  });
};





module.exports = { checkRole, verifyToken };
