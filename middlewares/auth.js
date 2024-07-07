const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");


exports.auth = async (req, res, next) => {
    try {

        const token = req.cookies.token || req.header['Authorization'].split(' ')[1]  // // can be req.headers['Authorization'].replace('Bearer ' , '')

        if (!token) {
            return res.status(400).json({ success: false, message: "Provide the token!" });
        }

        // verfiy the token
        try {
            const userInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = userInfo;

        } catch (err) {
            console.log(err, "error to verify token , auth middleware");
            return res.status(400).json({
                success: true,
                message: "Invalid token",
                error: err.message
            })
        }

        // pass control to next middleware function
        next();

    } catch (error) {
        console.log("Error in isAuth middleware", error);
        return res.status(400).json({
            success: false,
            message: "You are not authenticate",
            error: error.message
        })
    }
}



exports.isCustomer = async (req, res, next) => {
    try {

        if( req.user.accountType !== "isCustomer"){
            return res.status(401).json({success:false, message : "User is not authorize as Customer"});
        }

        // pass control to next middleware function
        next();

    } catch (error) {
        console.log("Error in isCustomer middleware", error);
        return res.status(500).json({
            success: true,
            message: "User is not authorize as Customer",
            error: error.message
        })
    }
}



exports.isAdmin = async (req, res, next) => {
    try {

        if( req.user.accountType !== "Admin"){
            return res.status(401).json({success:false, message : "User is not authorize as admin"});
        }

        // pass control to next middleware function
        next();

    } catch (error) {
        console.log("Error in isAdmin middleware", error);
        return res.status(500).json({
            success: true,
            message: "User is not authorize as admin",
            error: error.message
        })
    }
}