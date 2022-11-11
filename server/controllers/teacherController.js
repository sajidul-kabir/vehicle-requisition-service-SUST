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
  const query = `select username,fullname,requisitions.id as requisition_id,start_time,end_time,selected_date,destination,reason_for_vehicle,status,created_at,need from requisitions inner join teachers on requisitions.teacher_id=teachers.id where teachers.id=${req.user} order by created_at desc`;
  const history = await pool.execute(query);
  res.status(200).json({
    message: "successful",
    total: history[0].length,
    data: history[0],
  });
});

exports.getMySchedule = catchAsync(async (req, res, next) => {
  const query = `SELECT requisitions.need,requisitions.id,teachers.fullname as teacher_name,teachers.phone,requisitions.start_time,requisitions.end_time,requisitions.selected_date,requisitions.destination,drivers.fullname as driver_name,granted_requisitions.status,granted_requisitions.created_at FROM teachers inner join requisitions on teachers.id=requisitions.teacher_id inner join granted_requisitions on requisitions.id=granted_requisitions.requisition_id inner join drivers on granted_requisitions.driver_id=drivers.id WHERE teachers.id=${req.user} && granted_requisitions.status='granted' order by requisitions.selected_date`;
  const schedule = await pool.execute(query);
  res.status(200).json({
    message: "successful",
    total: schedule[0].length,
    data: schedule[0],
  });
});

exports.cancelARequisition = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const query = "DELETE FROM requisitions where id=?";
  const users = await pool.execute(query, [id]);
  res.status(200).json({
    message: "successfully deleted",
  });
});

exports.markCompleted = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const query =
    "update granted_requisitions set status='completed' where requisition_id=?";
  const users = await pool.execute(query, [id]);
  res.status(200).json({
    message: "successfully updated",
  });
});
