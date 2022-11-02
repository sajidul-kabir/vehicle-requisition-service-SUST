const express = require("express");
const transportController = require("../controllers/transportController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware.protectRoute);

// Blog CRUD
router.route("/").get(transportController.getAllTransports);
router.route("/pending").get(transportController.getAllPendingRequisitions);
router
  .route("/pending/:requisitionId")
  .get(transportController.getAPendingRequisition);

module.exports = router;
