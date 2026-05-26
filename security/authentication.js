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

        const emailCheck =
        await userModel.findOne({ email });

        if(emailCheck){
            return res.status(400).json({
                message:
                "User already exists"
            });
        }

        const hashedPassword =
        await bcrypt.hash(password, 10);

        const user =
        await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json(user);

    } catch (err) {

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

        const user =
        await userModel.findOne({ email });

        if(!user){
            return res.status(404).json({
                message:
                "User not found"
            });
        }

        const passwordMatch =
        await bcrypt.compare(
            password,
            user.password
        );

        if(!passwordMatch){
            return res.status(401).json({
                message:
                "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.role
            },

            process.env.jwt_secret,

            {
                expiresIn: "24h"
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token
        });

    } catch (err) {

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};