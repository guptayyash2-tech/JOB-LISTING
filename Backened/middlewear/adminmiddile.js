const jwt = require("jsonwebtoken");

const Admin = require("../mongo/adminlogin/admin");
const adminprotect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // ✅ Get token from header
      token = req.headers.authorization.split(" ")[1];

      // ✅ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Find admin by ID (not password)
      req.admin = await Admin.findById(decoded.id).select("-password");

      if (!req.admin) {
        return res.status(404).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = adminprotect;
