const express = require("express");

const router = express.Router();

const userController =
require("../controllers/userProfile");

// GET ALL USERS
router.get(
    "/",
    userController.getUsers
);

// GET SINGLE USER
router.get(
    "/:id",
    userController.getSingleUser
);

// UPDATE USER
router.put(
    "/:id",
    userController.updateUser
);

// DELETE USER
router.delete(
    "/:id",
    userController.deleteUser
);

module.exports = router;