import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("\nVerifying Token in Middleware");
  // console.log("Authorization Header:", authHeader);
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  const token = authHeader.split(' ')[1];
  
  // console.log("Token Received:", token);
  // console.log("JWT Secret used for verification:", process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token Decoded Successfully:", decoded);
    const user = await User.findById(decoded.userId); 
    if (!user) {
      console.log("User not found for ID:", decoded.userId);
      return res.status(401).json({ message: 'Unauthorized: Invalid user' });
    }
    req.user = user;
    next();
  } catch (error) {
    
    //console.error("!!! Token Verification Error !!!:", error.message);
    res.status(401).json({ message: 'Unauthorized: Invalid token', error: error.message });
  }
};
export default authMiddleware;
