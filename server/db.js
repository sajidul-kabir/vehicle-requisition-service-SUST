const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
let pool = mysql.createPool(process.env.DATABASE_URL);
console.log("database connected");
pool = pool.promise();

module.exports = pool;
