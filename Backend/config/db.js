/* eslint-disable no-console */
//  Require the backend database - mysql
const mysql = require('mysql');

const mysqlConnect = mysql.createPool({
  connectionLimit: 500,
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: 3306,
  database: 'yelp',
});

mysqlConnect.getConnection((err) => {
  if (err) {
    console.log(`Errors: ${err}`);
  } else {
    console.log('Successfully connected to the DB.');
  }
});

module.exports = mysqlConnect;

// const dbConnection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'yelp',
//   insecureAuth: true,
// });

// try {
//   console.log('Trying to establish database connection...');
//   dbConnection.connect();
//   console.log('Connection Established!');
// } catch (error) {
//   console.log(`Connection could not be established:${error}`);
// }

// module.exports = dbConnection;
