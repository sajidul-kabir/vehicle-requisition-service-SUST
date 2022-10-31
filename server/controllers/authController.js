const pool = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
  const { role } = req.body;
  if (!role) {
    return next(new AppError("Specify a role", 400));
  }

  // ------------------------------ TEACHER SIGNUP -----------------------------
  if (role === "teacher") {
    const {
      username,
      fullname,
      department,
      designation,
      phone,
      email,
      password,
    } = req.body;

    if (
      !username ||
      !email ||
      !fullname ||
      !password ||
      !phone ||
      !department ||
      !designation
    ) {
      return next(new AppError("provide the required fields", 400));
    }

    //Hashing Password
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);

    const newTeacher = {
      username,
      fullname,
      department,
      designation,
      phone,
      email,
      password: hash,
    };

    await pool.query("INSERT INTO teachers SET ?", newTeacher);
    const accessToken = generateToken(username);

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.cookie("jwt", accessToken, cookieOptions);
    res.status(201).json({
      message: "successful",
      accessToken,
      newTeacher,
      role,
    });
  }

  // ------------------------------ TRANSPORT SECTION SIGNUP -----------------------------
  else if (role === "transport") {
    const { username, fullname, phone, email, password } = req.body;

    if (!username || !email || !fullname || !password || !phone) {
      return next(new AppError("provide the required fields", 400));
    }

    //Hashing Password
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);

    const newTransport = {
      username,
      fullname,
      phone,
      email,
      password: hash,
    };

    await pool.query("INSERT INTO transport_section SET ?", newTransport);
    const accessToken = generateToken(username);

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.cookie("jwt", accessToken, cookieOptions);
    res.status(201).json({
      message: "successful",
      accessToken,
      newTransport,
      role,
    });
  }

  // ------------------------------ DRIVER SIGNUP -----------------------------
  else if (role === "driver") {
    const { username, fullname, phone, vehicle_no, password } = req.body;

    if (!username || !vehicle_no || !fullname || !password || !phone) {
      return next(new AppError("provide the required fields", 400));
    }

    //Hashing Password
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);

    const newDriver = {
      username,
      fullname,
      phone,
      vehicle_no,
      password: hash,
    };

    await pool.query("INSERT INTO drivers SET ?", newDriver);
    const accessToken = generateToken(username);

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.cookie("jwt", accessToken, cookieOptions);
    res.status(201).json({
      message: "successful",
      accessToken,
      newDriver,
      role,
    });
  } else {
    return next(new AppError("Invalid role", 400));
  }
});

//Token Creation
const generateToken = (user) => {
  return jwt.sign(user, process.env.ACCESSKEY);
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "Logged out" });
};
