const express = require("express");

const app = express();

require("dotenv").config();

const cors = require("cors");

const dbConnection =
require("./config/dbConnection");

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


// CORS
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://your-netlify-site.netlify.app"
    ],
    credentials: true,
}));


app.use(express.json());


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