const express = require("express");
const teacherController = require("../controllers/teacherController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware.protectRoute);

// Blog CRUD
router
  .route("/")
  .get(teacherController.getAllTeachers)
  .post(teacherController.submitRequisition);

router.route("/history").get(teacherController.getMyHistory);
router.route("/my-schedule").get(teacherController.getMySchedule);
module.exports = router;
