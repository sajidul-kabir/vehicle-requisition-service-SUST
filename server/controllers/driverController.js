const pool = require("../db");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Selectiong All teachers
exports.getAllDrivers = catchAsync(async (req, res, next) => {
  const query = "SELECT * FROM drivers";
  const users = await pool.execute(query);
  res.status(200).json({
    message: "successful",
    total: users[0].length,
    data: users[0],
  });
});
