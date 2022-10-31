const express = require("express");
const teacherController = require("../controllers/teacherController");

const router = express.Router();

//router.use(authMiddleware.protectRoute);

// Blog CRUD
router.route("/").get(teacherController.getAllTeachers);

module.exports = router;
