const productModel = require("../models/product");

// CREATE PRODUCT (FIXED + VALIDATION)
const createProduct = async (req, res) => {
    try {
        const {
            productName,
            brand,
            category,
            price,
            stock,
            image,
            description
        } = req.body;

        // VALIDATION
        if (
            !productName ||
            !brand ||
            !category ||
            !price ||
            !stock ||
            !image ||
            !description
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const product = await productModel.create({
            productName,
            brand,
            category,
            price,
            stock,
            image,
            description
        });

        res.status(201).json({
            success: true,
            product
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};


// GET PRODUCTS
const getProducts = async (req, res) => {
    try {
        const { category, search, sort } = req.query;

        let query = {};

        if (category) {
            query.category = category;
        }

        if (search) {
            query.productName = {
                $regex: search,
                $options: "i"
            };
        }

        let productsQuery = productModel.find(query);

        if (sort === "low") {
            productsQuery = productsQuery.sort({ price: 1 });
        }

        if (sort === "high") {
            productsQuery = productsQuery.sort({ price: -1 });
        }

        const products = await productsQuery;

        res.status(200).json({
            success: true,
            products
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};


// GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};


// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            success: true,
            product: updatedProduct
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};


// DELETE PRODUCT
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(
            req.params.id
        );

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
};