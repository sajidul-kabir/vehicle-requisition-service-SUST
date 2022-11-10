const express = require("express");
const transportController = require("../controllers/transportController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware.protectRoute);

// Blog CRUD
router.route("/").get(transportController.getAllTransports);
router.route("/pending").get(transportController.getAllPendingRequisitions);
router.get("/driver-schedules", transportController.seeDriverSchedules);

router
  .route("/pending/grant")
  .get(transportController.getAllGranted)
  .post(transportController.grantARequisition);

router.route("/pending/grant/:id").get(transportController.getAGranted);
router.route("/pending/reject/:id").get(transportController.getARejected);
router
  .route("/pending/reject")
  .get(transportController.getAllRejected)
  .post(transportController.rejectARequisition);
router.post(
  "/driver-schedules/available",
  transportController.getAllAvailableDrivers
);

router
  .route("/pending/:requisitionId")
  .get(transportController.getAPendingRequisition);
//router.route("/granted/:id").get(transportController.getAGranted);
router.route("/drivers/:id").get(transportController.getADriversSchedule);

module.exports = router;
