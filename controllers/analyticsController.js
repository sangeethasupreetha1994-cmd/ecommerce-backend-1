const getRecommendations = async (req, res) => {

    try {

        const recommendations = [
            "iPhone",
            "Laptop",
            "Headphones"
        ];

        res.status(200).json({
            recommendations
        });

    } catch (err) {

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    getRecommendations
};