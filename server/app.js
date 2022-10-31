const express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const teacherRouter = require("./routes/teacherRoutes");
const transportRouter = require("./routes/transportRoutes");
const driverRouter = require("./routes/driverRoutes");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.use(cors({ origin: ["http://localhost:8080"], credentials: true }));
app.use(express.json());
app.use(cookieParser());

// REST architecture
app.use("/api/users", userRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/transport", transportRouter);
app.use("/api/drivers", driverRouter);

//Error Handling for all undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Global Error handler
app.use(globalErrorHandler);

module.exports = app;
