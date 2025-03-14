const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

// Registration Route
router.post("/register", register);

// Login Route
router.post("/login", login);

// Logout Route (protected)
router.post("/logout", verifyToken, logout);

// Forgot Password Route
router.post("/forgot-password", forgotPassword);

// Reset Password Route
router.post("/reset-password/:token", resetPassword);

module.exports = router;
