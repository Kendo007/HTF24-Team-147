import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    // Verify token and get user ID
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // Fetch user data from the database based on the decoded ID
    const user = await User.findById(decoded._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
		}

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

