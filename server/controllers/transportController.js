const pool = require("../db");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Selectiong All teachers
exports.getAllTransports = catchAsync(async (req, res, next) => {
  const query = "SELECT * FROM transport_section";
  const users = await pool.execute(query);
  res.status(200).json({
    message: "successful",
    total: users[0].length,
    data: users[0],
  });
});
