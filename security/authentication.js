const userModel = require("../models/user");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");


// REGISTER
const registerUser = async (req, res) => {

    const {
        username,
        email,
        password
    } = req.body;

    try {

        // CHECK EMAIL
        const emailCheck =
        await userModel.findOne({ email });

        if(emailCheck){

            return res.status(400).json({
                message: "User already exists"
            });

        }

        // HASH PASSWORD
        const hashedPassword =
        await bcrypt.hash(password, 10);

        // CREATE USER
        const user =
        await userModel.create({

            username,
            email,
            password: hashedPassword

        });

        // RESPONSE
        res.status(201).json({

            message: "Registration Successful",

            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
};


// LOGIN
const loginUser = async (req, res) => {

    const {
        email,
        password
    } = req.body;

    try {

        // FIND USER
        const user =
        await userModel.findOne({ email });

        if(!user){

            return res.status(404).json({
                message: "User not found"
            });

        }

        // CHECK PASSWORD
        const passwordMatch =
        await bcrypt.compare(
            password,
            user.password
        );

        if(!passwordMatch){

            return res.status(401).json({
                message: "Invalid Password"
            });

        }

        // GENERATE TOKEN
        const token = jwt.sign(

            {
                userId: user._id,
                email: user.email,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "24h"
            }

        );

        // RESPONSE
        res.status(200).json({

            message: "Login Successful",

            token,

            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
};


module.exports = {
    registerUser,
    loginUser
};