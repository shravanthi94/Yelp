//Require the backend database - mysql
const mysql = require("mysql");

const mysqlConnect = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "password",
  port: 3306,
  database: "yelp"
});

mysqlConnect.getConnection((err) => {
  if (err) {
    console.log(`Errors: ${err}`);
  } else {
    console.log(`Successfully connected to the DB.`);
  }
});

module.exports = mysqlConnect;
