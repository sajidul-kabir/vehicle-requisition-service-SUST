const express = require("express");
const transportController = require("../controllers/transportController");

const router = express.Router();

//router.use(authMiddleware.protectRoute);

// Blog CRUD
router.route("/").get(transportController.getAllTransports);

module.exports = router;
