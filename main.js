const express = require("express");

const app = express();

require("dotenv").config();

const cors = require("cors");

const dbConnection =
require("./config/dbConnection");


// CORS
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://mern-stack-ecommerce-1.netlify.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));


app.use(express.json());


// ROUTES
const authenticationRoutes =
require("./routes/authenticationRoutes");

const userProfileRoutes =
require("./routes/userProfileRoutes");

const productRoutes =
require("./routes/productRoutes");

const orderRoutes =
require("./routes/orderRoutes");

const analyticsRoutes =
require("./routes/analyticsRoutes");


// API ROUTES
app.use("/auth", authenticationRoutes);

app.use("/users", userProfileRoutes);

app.use("/products", productRoutes);

app.use("/orders", orderRoutes);

app.use("/analytics", analyticsRoutes);


// DATABASE
dbConnection();


// SERVER
app.listen(process.env.PORT, () => {

    console.log(
        `Server is running on port ${process.env.PORT}`
    );

});