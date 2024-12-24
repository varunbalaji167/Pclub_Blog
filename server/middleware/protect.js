// middleware/protect.js
const protect = (req, res, next) => {
    console.log(req.userId); 
    if (!req.userId) {
      return res.status(403).json({ message: "Permission denied. Please log in." });
    }
    next();
  };
  
  module.exports = protect;