const express = require("express");

const router = express.Router();

const analyticsController = require("../controllers/analyticsController");

router.get(
    "/recommendations",
    analyticsController.getRecommendations
);

module.exports = router;