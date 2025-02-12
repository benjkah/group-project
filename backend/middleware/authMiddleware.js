const jwt = require("jsonwebtoken");

function authenticateUser(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from request headers

    if (!token) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.person_id = decoded.person_id; // Attach person_id to request
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}

module.exports = { authenticateUser };
