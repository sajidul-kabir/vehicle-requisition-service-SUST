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
router
  .route("/me")
  .patch(
    teacherController.uploadUserPhoto,
    teacherController.resizeUserPhoto,
    teacherController.updateTeacher
  );
router.route("/complete/:id").patch(teacherController.markCompleted);
router.route("/cancel/:id").delete(teacherController.cancelARequisition);
module.exports = router;
