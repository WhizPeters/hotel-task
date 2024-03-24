import jwt from 'jsonwebtoken';
import Admin from '../model/admin.js';
import User from '../model/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

// Middleware to verify cookies for admin
export const cookiesVerifyAdmin = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {email} = decoded.email;
        const isAdminAuthorized = await Admin.findOne({ email:email});

        if (!isAdminAuthorized) {
            return res.status(401).json({
                message: "Admin is not authorized"
            });
        }

        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decoded.exp && decoded.exp < currentTime) {
            return res.status(401).json({
                message: "Token has expired"
            });
        }

        req.decoded = decoded;
        next();
    } catch (error) {
        console.error("Error verifying admin token:", error);
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

// Middleware to verify cookies for user
export const cookiesVerifyUser = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {email} = decoded.email;
        const isUserAuthorized = await User.findOne({ email: email });
        // console.log(isUserAuthorized);

        if (!isUserAuthorized) {
            return res.status(401).json({
                message: "User is not authorized"
            });
        }

        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decoded.exp && decoded.exp < currentTime) {
            return res.status(401).json({
                message: "Token has expired"
            });
        }

        req.decoded = decoded;
        next();
    } catch (error) {
        console.error("Error verifying user token:", error);
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}
