import Admin from "../model/adminmodel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";


import jwt from "jsonwebtoken";
dotenv.config();

export const adminlogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Clear usertoken to prevent overlap
    res.clearCookie("usertoken", {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      path: "/",
    });

    // Set admintoken cookie
    res.cookie("admintoken", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 hour
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// Create Admin Only If Not Exists
export const createAdminIfNotExists = async () => {
  try {
    const existingAdmin = await Admin.findOne();
    if (!existingAdmin) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD, 
      });
      console.log("Admin created!");
    }
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

//logout
export const adminlogout = (req, res) => {
  res.clearCookie("admintoken", {
    httpOnly: true,
    sameSite: "Lax", // or "None" with HTTPS
    secure: false,   // true if HTTPS
  });
  res.status(200).json({ message: "Logout successful" });
};
