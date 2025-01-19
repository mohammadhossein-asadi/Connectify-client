import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    // Public routes don't need authentication
    if (req.path === "/posts" && req.method === "GET") {
      return next();
    }

    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (jwtError) {
      console.error("JWT Verification failed:", jwtError);
      return res.status(401).json({ error: "Invalid token" });
    }
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
