const userModel = require("../models/user");

// GET ALL USERS
const getUsers = async (req, res) => {

    try {

        const users =
        await userModel.find()
        .select("-password");

        res.status(200).json(users);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// GET SINGLE USER
const getSingleUser = async (req, res) => {

    try {

        const user =
        await userModel.findById(
            req.params.id
        ).select("-password");

        if (!user) {

            return res.status(404).json({
                message: "User Not Found"
            });
        }

        res.status(200).json(user);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// UPDATE USER
const updateUser = async (req, res) => {

    try {

        const updatedUser =
        await userModel.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        ).select("-password");

        res.status(200).json(updatedUser);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// DELETE USER
const deleteUser = async (req, res) => {

    try {

        await userModel.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message:
            "User Deleted Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser
};