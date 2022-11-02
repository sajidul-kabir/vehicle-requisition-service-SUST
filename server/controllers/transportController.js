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

exports.getAllPendingRequisitions = catchAsync(async (req, res, next) => {
  const query =
    "select username,fullname,requisitions.id as requisition_id,start_time,end_time,selected_date,destination,reason_for_vehicle,status,created_at,need from requisitions inner join teachers on requisitions.teacher_id=teachers.id where requisitions.status='pending'";
  const pending_requisitions = await pool.execute(query);
  res.status(200).json({
    message: "successful",
    total: pending_requisitions[0].length,
    data: pending_requisitions[0],
  });
});

exports.getAPendingRequisition = catchAsync(async (req, res, next) => {
  const id = req.params.requisitionId;
  if (!id) {
    return next(new AppError("provide the required fields", 400));
  }
  const query =
    "select username,fullname,phone,department,requisitions.id as requisition_id,designation,start_time,end_time,selected_date,destination,reason_for_vehicle,status,created_at,need from requisitions inner join teachers on requisitions.teacher_id=teachers.id where requisitions.id=?";
  const pending_requisition = await pool.execute(query, [id]);
  res.status(200).json({
    message: "successful",
    data: pending_requisition[0],
  });
});
