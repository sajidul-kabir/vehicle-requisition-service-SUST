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
    "select username,fullname,requisitions.id as requisition_id,start_time,end_time,selected_date,destination,reason_for_vehicle,status,created_at,need from requisitions inner join teachers on requisitions.teacher_id=teachers.id where requisitions.status='pending' order by created_at desc";
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

exports.grantARequisition = catchAsync(async (req, res, next) => {
  const { requisition_id, driver_id } = req.body;

  if (!requisition_id || !driver_id) {
    return next(new AppError("provide the required fields", 400));
  }

  const newGrantedRequisition = {
    requisition_id,
    driver_id,
    granted_by: req.user,
  };

  const alterQuery = `UPDATE requisitions
  SET status = 'granted'
  WHERE id = ${requisition_id}`;

  await pool.execute(alterQuery);

  const grantedRequsition = await pool.query(
    "INSERT INTO granted_requisitions SET ?",
    newGrantedRequisition
  );
  res.status(200).json({
    message: "successfully granted",
    data: grantedRequsition,
  });
});

exports.rejectARequisition = catchAsync(async (req, res, next) => {
  const { requisition_id } = req.body;

  if (!requisition_id) {
    return next(new AppError("provide the required fields", 400));
  }

  const alterQuery = `UPDATE requisitions
  SET status = 'rejected'
  WHERE id = ${requisition_id}`;

  await pool.execute(alterQuery);

  // const alterQuery2 = `UPDATE requisitions
  // SET created_at = ${Date.now()}
  // WHERE id = ${requisition_id}`;

  // await pool.execute(alterQuery2);

  res.status(200).json({
    message: "rejected",
  });
});

exports.getAllGranted = catchAsync(async (req, res, next) => {
  const query = `SELECT requisitions.need,requisitions.id,teachers.fullname as teacher_name,teachers.phone,requisitions.start_time,requisitions.end_time,requisitions.selected_date,requisitions.destination,drivers.fullname as driver_name,granted_requisitions.status,granted_requisitions.created_at FROM drivers INNER JOIN granted_requisitions ON drivers.id=granted_requisitions.driver_id INNER JOIN requisitions on granted_requisitions.requisition_id=requisitions.id INNER join teachers on requisitions.teacher_id=teachers.id WHERE granted_requisitions.status='granted' order by  granted_requisitions.created_at desc`;
  const users = await pool.execute(query);
  res.status(200).json({
    message: "successful",
    total: users[0].length,
    data: users[0],
  });
});

exports.getAllRejected = catchAsync(async (req, res, next) => {
  const query = `select username,fullname,requisitions.id as requisition_id,start_time,end_time,selected_date,destination,reason_for_vehicle,status,created_at,need from requisitions inner join teachers on requisitions.teacher_id=teachers.id where requisitions.status='rejected' order by created_at desc`;
  const users = await pool.execute(query);
  res.status(200).json({
    message: "successful",
    total: users[0].length,
    data: users[0],
  });
});

exports.seeDriverSchedules = catchAsync(async (req, res, next) => {
  const query = `SELECT teachers.fullname as teacher_name,teachers.phone,requisitions.start_time,requisitions.end_time,requisitions.selected_date,requisitions.destination,drivers.fullname FROM drivers INNER JOIN granted_requisitions ON drivers.id=granted_requisitions.driver_id INNER JOIN requisitions on granted_requisitions.requisition_id=requisitions.id INNER join teachers on requisitions.teacher_id=teachers.id WHERE granted_requisitions.status='granted' order by drivers.fullname`;
  const users = await pool.execute(query);
  res.status(200).json({
    message: "successful",
    total: users[0].length,
    data: users[0],
  });
});
exports.getADriversSchedule = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const query = `SELECT teachers.fullname as teacher_name,teachers.phone,requisitions.start_time,requisitions.end_time,requisitions.selected_date,requisitions.destination,drivers.fullname FROM drivers INNER JOIN granted_requisitions ON drivers.id=granted_requisitions.driver_id INNER JOIN requisitions on granted_requisitions.requisition_id=requisitions.id INNER join teachers on requisitions.teacher_id=teachers.id WHERE drivers.id=${id} && granted_requisitions.status='granted'`;
  const users = await pool.execute(query);
  res.status(200).json({
    message: "successful",
    total: users[0].length,
    data: users[0],
  });
});
