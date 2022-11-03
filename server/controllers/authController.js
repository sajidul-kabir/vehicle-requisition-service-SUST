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

    const teacher = await pool.query("INSERT INTO teachers SET ?", newTeacher);
    //console.log(teacher[0].insertId);
    const accessToken = generateToken(teacher[0].insertId);

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

    const transport = await pool.query(
      "INSERT INTO transport_section SET ?",
      newTransport
    );
    const accessToken = generateToken(transport[0].insertId);

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

    const driver = await pool.query("INSERT INTO drivers SET ?", newDriver);
    const accessToken = generateToken(driver[0].insertId);

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

exports.login = catchAsync(async (req, res, next) => {
  const { role } = req.body;
  if (!role) {
    return next(new AppError("Specify a role", 400));
  }

  const { username, password } = req.body;

  //Check whether credentials are provided
  if (!username || !password) {
    return next(new AppError("provide the required fields", 400));
  }
  let user;

  if (role === "teacher") {
    //Check whether username matches
    const username_query = "SELECT * FROM teachers WHERE username=?";
    user = await pool.query(username_query, [username]);
  } else if (role === "transport") {
    //Check whether username matches
    const username_query = "SELECT * FROM transport_section WHERE username=?";
    user = await pool.query(username_query, [username]);
  } else if (role === "driver") {
    //Check whether username matches
    const username_query = "SELECT * FROM drivers WHERE username=?";
    user = await pool.query(username_query, [username]);
  }

  if (user[0].length === 0) {
    return next(new AppError("Invalid username", 404));
  }

  //Check whether password matches
  if (
    user[0].length > 0 &&
    (await bcrypt.compare(password, user[0][0].password))
  ) {
    // console.log(user[0][0]);
    var accessToken = generateToken(user[0][0].id);
    var cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: false,
    };
    //console.log(accessToken, cookieOptions);
    res.cookie("jwt", accessToken, cookieOptions);

    res.status(200).json({
      message: "successfully Logged in",
      accessToken,
      role,
      username,
    });
  } else {
    return next(new AppError("Wrong Password", 404));
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
