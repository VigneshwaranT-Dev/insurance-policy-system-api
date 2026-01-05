const { User } = require("../models/index");
const jwt = require("jsonwebtoken");

/**
 * Generate JWT Token
 */

const generateJwtToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

/**
 * @desc Register new user
 * @route POST /api/auth/register
 * @access Public
 */

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    const token = generateJwtToken(user._id);

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * @desc Login User
 * @route POST /api/auth/login
 * @access Public
 */

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateJwtToken(user._id);

    res.status(200).json({
      message: "User LoggedIn Successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
