const express = require("express");
const driverController = require("../controllers/driverController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware.protectRoute);

// Blog CRUD
router.route("/").get(driverController.getAllDrivers);
router.route("/my-schedule").get(driverController.getMySchedule);
router.route("/completed").get(driverController.getMyCompletedRequisitions);

router
  .route("/me")
  .patch(
    driverController.uploadUserPhoto,
    driverController.resizeUserPhoto,
    driverController.updateDriver
  );
module.exports = router;
