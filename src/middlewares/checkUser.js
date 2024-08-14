const jwt = require('jsonwebtoken');

const checkUser = (req, res, next) => {

    const token = req.headers.authtoken;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid Token" });
    }
}

module.exports = checkUser;