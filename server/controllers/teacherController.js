const pool = require("../db");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Selectiong All teachers
exports.getAllTeachers = catchAsync(async (req, res, next) => {
  const query = "SELECT * FROM teachers";
  const users = await pool.execute(query);
  res.status(200).json({
    message: "successful",
    total: users[0].length,
    data: users[0],
  });
});

exports.submitRequisition = catchAsync(async (req, res, next) => {
  const {
    start_time,
    end_time,
    selected_date,
    destination,
    need,
    reason_for_vehicle,
  } = req.body;

  if (
    !start_time ||
    !end_time ||
    !selected_date ||
    !destination ||
    !need ||
    !reason_for_vehicle
  ) {
    return next(new AppError("provide the required fields", 400));
  }

  const newRequisition = {
    start_time,
    end_time,
    selected_date,
    destination,
    need,
    reason_for_vehicle,
    teacher_id: req.user,
  };

  const requsition = await pool.query(
    "INSERT INTO requisitions SET ?",
    newRequisition
  );

  res.status(200).json({
    message: "successfully submitted",
    data: requsition,
  });
});

exports.getMyHistory = catchAsync(async (req, res, next) => {
  const query = `select username,fullname,requisitions.id as requisition_id,start_time,end_time,selected_date,destination,reason_for_vehicle,status,created_at,need from requisitions inner join teachers on requisitions.teacher_id=teachers.id where teachers.id=${req.user}`;
  const history = await pool.execute(query);
  res.status(200).json({
    message: "successful",
    total: history[0].length,
    data: history[0],
  });
});
