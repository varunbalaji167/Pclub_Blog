const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    console.log(req.headers.authorization);
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).send({ message: "No token provided" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded JWT Payload:", decoded);  // Log the decoded token to check its structure

        // Use decoded.id if that’s the correct field from the JWT
        req.userId = decoded.id || decoded.userId; // Use decoded.id or decoded.userId, depending on your token structure
        req.userData = decoded;  // Optionally, attach the full decoded data

        next();
    } catch (error) {
        res.status(401).send({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;