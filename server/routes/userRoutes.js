const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

router.use(authMiddleware.protectRoute);

router.route("/me").get(userController.getMe);
module.exports = router;
