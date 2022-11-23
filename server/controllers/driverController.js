const sharp = require("sharp");
const pool = require("../db");
const filterObj = require("../utils/filterObj");
const multer = require("multer");
const bcrypt = require("bcryptjs");
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
  const query = `SELECT teachers.fullname as teacher_name,teachers.phone,requisitions.id,requisitions.start_time,requisitions.end_time,requisitions.selected_date,requisitions.destination,drivers.fullname FROM drivers INNER JOIN granted_requisitions ON drivers.id=granted_requisitions.driver_id INNER JOIN requisitions on granted_requisitions.requisition_id=requisitions.id INNER join teachers on requisitions.teacher_id=teachers.id WHERE drivers.id=${req.user} && granted_requisitions.status='granted'`;
  const users = await pool.execute(query);
  res.status(200).json({
    message: "successful",
    total: users[0].length,
    data: users[0],
  });
});

exports.getMyCompletedRequisitions = catchAsync(async (req, res, next) => {
  const query = `SELECT teachers.fullname as teacher_name,teachers.phone,requisitions.id,requisitions.start_time,requisitions.end_time,requisitions.selected_date,requisitions.destination,drivers.fullname,granted_requisitions.created_at  FROM drivers INNER JOIN granted_requisitions ON drivers.id=granted_requisitions.driver_id INNER JOIN requisitions on granted_requisitions.requisition_id=requisitions.id INNER join teachers on requisitions.teacher_id=teachers.id WHERE drivers.id=${req.user} && granted_requisitions.status='actually_completed' order by granted_requisitions.created_at DESC`;
  //const query2 = `SELECT teachers.fullname as teacher_name,teachers.phone,requisitions.id,requisitions.start_time,requisitions.end_time,requisitions.selected_date,requisitions.destination,drivers.fullname from teachers inner join trip on teachers.id=trip.teacher_id inner join requisitions on trip.requisition_id=requisitions.id inner join granted_requisitions on granted_requisitions.requisition_id=requisitions.id inner join drivers on granted_requisitions.driver_id=drivers.id where drivers.id=${req.user}`;
  const users = await pool.execute(query);
  res.status(200).json({
    message: "successful",
    total: users[0].length,
    data: users[0],
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

  req.file.filename = `driver-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`img/drivers/${req.file.filename}`);

  next();
});

exports.updateDriver = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "username",
    "fullname",
    "phone",
    "vehicle_no",
    "vehicle_model",
    "duty_start_time",
    "duty_end_time",
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
  let username_query = "SELECT * FROM drivers WHERE id=?";
  let any_user = await pool.query(username_query, [req.user]);
  // console.log(any_user[0]);
  // if (any_user[0].length > 0) {
  //   if (req.user != filteredBody.username)
  //     return next(new AppError("Invalid username", 404));
  // }
  let update_query = "UPDATE drivers SET ? WHERE id = ?";
  await pool.query(update_query, [filteredBody, req.user]);

  res.status(200).json({
    status: "successfully updated",
  });
});
