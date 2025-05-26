const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.create({ username, password });
  res.json({ token: generateToken(user._id) });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.json({ token: generateToken(user._id) });
};
