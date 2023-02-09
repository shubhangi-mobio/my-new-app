
/* all the jsonwebtoken  auth code will go here */

const jwt = require("jsonwebtoken");
const User = require('../models/user')

exports.protect = async (req, res, next) => {
// const verifyToken = async (req, res, next) => {
    // const token = req.header('Authorization')

    // // const token = req.body.token || req.query.token || req.header['Authorization'];
    // if (!token) {
    //     return res.status(200).json({ success: false, message: 'Token is required.' });
    // }
    // try {
    //     const descode = jwt.verify(token, process.env.JWT_SECRET);
    //     req.user = descode;
    // } catch (error) {
    //     console.log(error)
    //     return res.status(400).json({ message: error.message });
    // }
    // return next()
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
        // Set token from cookie
    }
    // else if (req.cookies.token) {
    //   token = req.cookies.token;
    // }

    // Make sure token exists
    if (!token) {
        return res.status(200).json({ success: false, message: 'Token is required.' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);

        next();
    } catch (err) {
        return res.status(400).json({ message: error.message });
    }
}


// module.exports = verifyToken;
