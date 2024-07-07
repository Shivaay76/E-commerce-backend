const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Cart = require("../models/Cart")


// ****************** Singup  **********************
exports.signup = async (req, res) => {
    try {
        const { username, email, password, confirmPassword, accountType } = req.body;

        if (!username || !email || !password || !accountType || !confirmPassword) {
            return res.status(400).json({ success: false, message: "Provide all the required fields!" });
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Password and Confirm Password do not match. Please try again.", });
        }


        // hash the password
        const hashPassword = await bcrypt.hash(password, 10);


        // create a entry in DB
        const userDoc = await User.create({
            username,
            email,
            password: hashPassword,
            accountType,
            img: `https://ui-avatars.com/api/?name=${username}`,
        });

        // create a cart to user
        const cart = Cart.create({
            user: userDoc._id,
        });



        return res.status(200).json({
            success: true,
            message: "User created.",
            userDoc
        });


    } catch (error) {
        console.log("Error in signup handler", error);
        return res.status(500).json({
            success: false,
            message: "couldn't signup",
            error: error.message
        })
    }
}


// ***************** Login ******************************
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: "Provide all the required fields!" });
        }

        // is user exist
        const userDoc = await User.findOne({ username });

        if (!userDoc) {
            return res.status(400).json({ success: false, message: "User is not found!" });
        }

        //  verfiy the password
        const isAuthenticate = await bcrypt.compare(password, userDoc.password);

        if (!isAuthenticate) {
            return res.status(400).json({ success: false, message: "Password is not matched!" });
        }

        // generate a token
        const payload = {
            id: userDoc._id,
            username: userDoc.username,
            email: userDoc.email,
            accountType: userDoc.accountType,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);


        return res.status(200).cookie("token", token).json({
            success: true,
            message: "User loggedIn",
            userDoc,
            token
        });


    } catch (error) {
        console.log("Error in login handler", error);
        return res.status(500).json({
            success: false,
            message: "couldn't login",
            error: error.message
        })
    }
}