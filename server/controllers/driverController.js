const pool = require("../db");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Selectiong All teachers
exports.getAllDrivers = catchAsync(async (req, res, next) => {
  const query = "SELECT * FROM drivers order by drivers.id";
  const users = await pool.execute(query);
  res.status(200).json({
    message: "successful",
    total: users[0].length,
    data: users[0],
  });
});

exports.getMySchedule = catchAsync(async (req, res, next) => {
  const query = `SELECT teachers.fullname as teacher_name,teachers.phone,requisitions.start_time,requisitions.end_time,requisitions.selected_date,requisitions.destination,drivers.fullname FROM drivers INNER JOIN granted_requisitions ON drivers.id=granted_requisitions.driver_id INNER JOIN requisitions on granted_requisitions.requisition_id=requisitions.id INNER join teachers on requisitions.teacher_id=teachers.id WHERE drivers.id=${req.user} && granted_requisitions.status='granted'`;
  const users = await pool.execute(query);
  res.status(200).json({
    message: "successful",
    total: users[0].length,
    data: users[0],
  });
});
