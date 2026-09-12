const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

const inMemoryUsers = [];

const getUserByEmail = async (email) => {
  if (mongoose.connection.readyState === 1) {
    return User.findOne({ email });
  }

  return inMemoryUsers.find((user) => user.email === email) || null;
};

const createUser = async (userData) => {
  if (mongoose.connection.readyState === 1) {
    const user = new User(userData);
    await user.save();
    return user;
  }

  inMemoryUsers.push(userData);
  return userData;
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await getUserByEmail(email);
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, password: hashed });

    res.json({ message: "Signup successful! Please login.", user: { id: user._id || user.email, name, email } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id || user.email }, process.env.JWT_SECRET || "tourism-secret-key", { expiresIn: "1d" });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
