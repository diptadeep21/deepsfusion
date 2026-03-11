import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create JWT token
const createToken = (id) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ id }, secret, { expiresIn: "7d" });
};

// =====================
// USER LOGIN (ONLY role: "user")
// =====================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    // ❗ Only allow users (NOT admins)
    const user = await userModel.findOne({ email, role: "user" });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid user credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid user credentials" });
    }

    const token = createToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// =====================
// USER REGISTER
// =====================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters"
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role: "user"
    });

    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// =====================
// ADMIN LOGIN (ONLY role: "admin")
// =====================
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const admin = await userModel.findOne({ email, role: "admin" });

    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid admin credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid admin credentials" });
    }

    const token = createToken(admin._id);

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { loginUser, registerUser, adminLogin };
