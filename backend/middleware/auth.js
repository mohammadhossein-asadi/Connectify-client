import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = async (req, res, next) => {
  try {
    // Public routes don't need authentication
    if (req.path === "/posts" && req.method === "GET") {
      return next();
    }

    let token = req.header("Authorization");

    if (!token) {
      console.log("No token provided");
      return res
        .status(403)
        .json({ message: "Access Denied - No token provided" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token verified:", verified);
      req.user = verified;
      next();
    } catch (jwtError) {
      console.error("JWT Verification failed:", jwtError.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
