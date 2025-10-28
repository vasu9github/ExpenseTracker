import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password, 
    });

    if (user) {
      const token = generateToken(user._id);
      res.status(201).json({
        success: true,
        data: { _id: user._id, name: user.name, email: user.email, token },
      });
    } else {
      res.status(400).json({ success: false, error: 'Invalid user data' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }

    const user = await User.findOne({ email, password });
    if (user) {
      const token = generateToken(user._id);
      res.status(200).json({
        success: true,
        data: { _id: user._id, name: user.name, email: user.email, token },
      });
    } else {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};