const authMiddleware = (req, res, next) => {
    // Check if user is authenticated
    if (req.user) {
      // User is authenticated, allow access to endpoint
      next();
    } else {
      // User is not authenticated, return error
      res.status(401).json({ message: 'You must be logged in to access this resource' });
    }
  };
  