const orderModel = require("../models/order");

// CREATE ORDER
const createOrder = async (req, res) => {

    try {

        const order = await orderModel.create({
            ...req.body,
            user: req.userId
        });

        res.status(201).json(order);

    } catch (err) {

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// GET ORDERS
const getOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({
            user: req.userId
        });

        res.status(200).json(orders);

    } catch (err) {

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = {createOrder,getOrders};