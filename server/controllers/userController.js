const pool = require("../db");
const filterObj = require("../utils/filterObj");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getMe = catchAsync(async (req, res, next) => {
  const { username, role } = req.body;
  //const username = req.user;
  let username_query;
  if (role === "teacher") {
    username_query = "SELECT * FROM teachers where username=?";
  } else if (role === "transport") {
    username_query = "SELECT * FROM transport_section where username=?";
  } else if (role === "driver") {
    username_query = "SELECT * FROM drivers where username=?";
  } else {
    return next(new AppError("Invalid role", 400));
  }

  const user = await pool.execute(username_query, [username]);
  res.status(200).json({
    message: "successful",
    data: user[0],
  });
});
