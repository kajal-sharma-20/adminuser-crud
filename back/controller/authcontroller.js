import jwt from "jsonwebtoken";

export const verifyAdminToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Not an admin token" });
    }
    return res.status(200).json({ role: decoded.role });
  } catch (error) {
    console.error("Admin token verification error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const verifyUserToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === "admin") {
      return res.status(403).json({ message: "Admin token not allowed" });
    }
    return res.status(200).json({ role: decoded.role || null });
  } catch (error) {
    console.error("User token verification error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};