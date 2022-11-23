const sharp = require("sharp");
const pool = require("../db");
const filterObj = require("../utils/filterObj");
const multer = require("multer");
const bcrypt = require("bcryptjs");
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

  req.file.filename = `teacher-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`img/teachers/${req.file.filename}`);

  next();
});

exports.updateTeacher = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "username",
    "fullname",
    "phone",
    "email",
    "department",
    "designation",
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
  let username_query = "SELECT * FROM teachers WHERE id=?";
  let any_user = await pool.query(username_query, [req.user]);
  // console.log(any_user[0]);
  // if (any_user[0].length > 0) {
  //   if (req.user != filteredBody.username)
  //     return next(new AppError("Invalid username", 404));
  // }
  let update_query = "UPDATE teachers SET ? WHERE id = ?";
  await pool.query(update_query, [filteredBody, req.user]);

  res.status(200).json({
    status: "successfully updated",
  });
});
