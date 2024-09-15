const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
  // Get the token from the request headers (Authorization: Bearer <token>)
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Access denied.' });
  }

  try {
    // Verify the token using JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");

    // Check if the user has the 'admin' role
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // Attach the decoded token info to the request object (e.g., email and role)
    req.user = {
      email: decoded.email,
      role: decoded.role
    };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Check if the error is due to token expiration
    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token has expired. Please log in again.' });
      }
    console.error('Invalid token:', error);
    return res.status(401).json({ message: 'Invalid token. Access denied.' });
  }
};

module.exports = adminAuth;
