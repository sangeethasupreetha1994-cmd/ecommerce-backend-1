const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {

    try {

        const authHeaders =
        req.headers.authorization;

        if(
            !authHeaders ||
            !authHeaders.startsWith("Bearer ")
        ){
            return res.status(401).json({
                message:
                "Unauthorized"
            });
        }

        const token =
        authHeaders.split(" ")[1];

        const decoded =
        jwt.verify(
            token,
            process.env.jwt_secret
        );

        req.userId = decoded.userId;

        req.role = decoded.role;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid Token"
        });
    }
};

module.exports = authMiddleware;