const sharp = require("sharp");
const pool = require("../db");
const filterObj = require("../utils/filterObj");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const twilio = require("twilio");
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

  const getRequisitionQuery = `select * from requisitions where id=${requisition_id}`;
  const getDriverQuery = `select * from drivers where id=${driver_id}`;
  const fetchedRequisition = await pool.execute(getRequisitionQuery);
  const requisition = fetchedRequisition[0][0];

  const teacher_id = requisition.teacher_id;
  const getTeacherQuery = `select * from teachers where id=${teacher_id}`;
  const fetchedTeacher = await pool.execute(getTeacherQuery);
  const teacher_name = fetchedTeacher[0][0].fullname;

  const fetchedDriver = await pool.execute(getDriverQuery);
  const driver = fetchedDriver[0][0];
  const alterQuery = `UPDATE requisitions
  SET status = 'granted'
  WHERE id = ${requisition_id}`;

  await pool.execute(alterQuery);

  const grantedRequsition = await pool.query(
    "INSERT INTO granted_requisitions SET ?",
    newGrantedRequisition
  );

  selected_date = requisition.selected_date;
  const date = selected_date.getUTCDate() + 1;
  const month = selected_date.getUTCMonth() + 1;
  const year = selected_date.getUTCFullYear();

  //TODO add drivers number after getting a paid account from twilio

  driverPhoneNumber = driver.phone;

  await sendSms(
    "+8801819439269",
    `A requisition granted for ${requisition.destination} on ${
      date + "/" + month + "/" + year
    } ${formatStartTime(requisition.start_time)} for ${teacher_name}`
  );

  res.status(200).json({
    message: "successfully granted",
    data: grantedRequsition[0],
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

  const alterQuery2 = `UPDATE requisitions
  SET created_at = ${Date.now()}
  WHERE id = ${requisition_id}`;

  await pool.execute(alterQuery2);

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

exports.getAGranted = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new AppError("provide the required fields", 400));
  }
  const query = `SELECT requisitions.need,requisitions.id,teachers.fullname as teacher_name,teachers.department,teachers.designation, teachers.phone,requisitions.start_time,requisitions.end_time,requisitions.selected_date,requisitions.destination,requisitions.reason_for_vehicle, drivers.fullname as driver_name, drivers.phone as driver_phone, drivers.vehicle_no,granted_requisitions.status,granted_requisitions.created_at FROM drivers INNER JOIN granted_requisitions ON drivers.id=granted_requisitions.driver_id INNER JOIN requisitions on granted_requisitions.requisition_id=requisitions.id INNER join teachers on requisitions.teacher_id=teachers.id WHERE granted_requisitions.requisition_id=?`;
  const users = await pool.execute(query, [id]);
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

exports.getARejected = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new AppError("provide the required fields", 400));
  }
  const query =
    "select username,fullname,phone,department,requisitions.id as requisition_id,designation,start_time,end_time,selected_date,destination,reason_for_vehicle,status,created_at,need from requisitions inner join teachers on requisitions.teacher_id=teachers.id where requisitions.id=? AND requisitions.status='rejected'";
  const pending_requisition = await pool.execute(query, [id]);
  res.status(200).json({
    message: "successful",
    data: pending_requisition[0],
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
  const query = `SELECT teachers.fullname as teacher_name,teachers.phone,requisitions.id,requisitions.start_time,requisitions.end_time,requisitions.selected_date,requisitions.destination,drivers.fullname FROM drivers INNER JOIN granted_requisitions ON drivers.id=granted_requisitions.driver_id INNER JOIN requisitions on granted_requisitions.requisition_id=requisitions.id INNER join teachers on requisitions.teacher_id=teachers.id WHERE drivers.id=${id} && granted_requisitions.status='granted'`;
  const users = await pool.execute(query);
  res.status(200).json({
    message: "successful",
    total: users[0].length,
    data: users[0],
  });
});

exports.getAllAvailableDrivers = catchAsync(async (req, res, next) => {
  let { selected_date, start_time, end_time } = req.body;

  if (!selected_date || !start_time || !end_time) {
    return next(new AppError("provide the required fields", 400));
  }
  function addMinutes(time, minsToAdd) {
    function D(J) {
      return (J < 10 ? "0" : "") + J;
    }
    var piece = time.split(":");
    var mins = piece[0] * 60 + +piece[1] + +minsToAdd;

    return D(((mins % (24 * 60)) / 60) | 0) + ":" + D(mins % 60);
  }

  function subMinutes(time, minsToAdd) {
    function D(J) {
      return (J < 10 ? "0" : "") + J;
    }
    var piece = time.split(":");
    var mins = piece[0] * 60 + +piece[1] + -minsToAdd;

    return D(((mins % (24 * 60)) / 60) | 0) + ":" + D(mins % 60);
  }

  let end_time2 = subMinutes(end_time, "1");
  let start_time2 = addMinutes(start_time, "1");

  //console.log(start_time, end_time);

  const query = `SELECT drivers.id,drivers.fullname,drivers.phone,drivers.vehicle_no from drivers INNER join granted_requisitions on drivers.id=granted_requisitions.driver_id INNER join requisitions on granted_requisitions.requisition_id=requisitions.id WHERE requisitions.selected_date=? AND (requisitions.start_time  BETWEEN ? AND ? || requisitions.end_time  BETWEEN  ? AND ?) group by drivers.id`;
  const availableDrivers = await pool.execute(query, [
    selected_date,
    start_time,
    end_time2,
    start_time2,
    end_time,
  ]);
  res.status(200).json({
    message: "successful",
    total: availableDrivers[0].length,
    data: availableDrivers[0],
  });
});

const sendSms = async (driverPhoneNumber, driverSms) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  let message = await client.messages.create({
    body: driverSms,
    from: process.env.TWILIO_NUMBER,
    to: driverPhoneNumber,
  });
  console.log(message);
};

const formatStartTime = (start_time) => {
  time = start_time.split(":");
  let hour = time[0];
  let minute = time[1];
  let status = "AM";
  if (hour > 12) {
    hour -= 12;
    status = "PM";
  }
  return `${hour}:${minute} ${status}`;
};

exports.getAllRunningOrCompleted = catchAsync(async (req, res, next) => {
  const query = `SELECT requisitions.need,requisitions.id,teachers.fullname as teacher_name,teachers.phone,requisitions.start_time,requisitions.end_time,requisitions.selected_date,requisitions.destination,drivers.fullname as driver_name,granted_requisitions.status,granted_requisitions.created_at FROM drivers INNER JOIN granted_requisitions ON drivers.id=granted_requisitions.driver_id INNER JOIN requisitions on granted_requisitions.requisition_id=requisitions.id INNER join teachers on requisitions.teacher_id=teachers.id WHERE granted_requisitions.status='completed' order by  granted_requisitions.created_at desc`;
  const users = await pool.execute(query);
  res.status(200).json({
    message: "successful",
    total: users[0].length,
    data: users[0],
  });
});

exports.markCompleted = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  let query =
    "update granted_requisitions set status='actually_completed' where requisition_id=?";
  await pool.execute(query, [id]);

  query = "update requisitions set status='completed' where id=?";
  await pool.execute(query, [id]);

  query = `select * from teachers inner join requisitions on teachers.id=requisitions.teacher_id where requisitions.id=${id}`;
  const teacher = await pool.execute(query);
  const teacher_id = teacher[0][0].id;

  const newTrip = {
    requisition_id: id,
    teacher_id,
  };
  console.log(newTrip);
  const completed = await pool.query("INSERT INTO trip SET ?", newTrip);
  console.log(completed);
  res.status(200).json({
    message: "successfully updated",
    completed,
  });
});

// Updating User
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("user_photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `transport-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`img/transport-officials/${req.file.filename}`);

  next();
});

exports.updateTransport = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "username",
    "fullname",
    "phone",
    "email",
    "password",
    "user_photo"
  );
  if (req.file) filteredBody.user_photo = req.file.filename;

  //Hashing Password
  if (filteredBody.password) {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(filteredBody.password, salt);
    filteredBody.password = hash;
  }
  let username_query = "SELECT * FROM transport_section WHERE id=?";
  let any_user = await pool.query(username_query, [req.user]);
  // console.log(any_user[0]);
  // if (any_user[0].length > 0) {
  //   if (req.user != filteredBody.username)
  //     return next(new AppError("Invalid username", 404));
  // }
  let update_query = "UPDATE transport_section SET ? WHERE id = ?";
  await pool.query(update_query, [filteredBody, req.user]);

  res.status(200).json({
    status: "successfully updated",
  });
});
