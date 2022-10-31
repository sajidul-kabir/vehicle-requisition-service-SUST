const express = require("express");
const driverController = require("../controllers/driverController");

const router = express.Router();

//router.use(authMiddleware.protectRoute);

// Blog CRUD
router.route("/").get(driverController.getAllDrivers);

module.exports = router;
