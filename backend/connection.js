/*const mysql = require('mysql');
require('dotenv').config();

const conn = mysql.createConnection({
  host : process.env.DB_HOST,
// TBC
  user : 'me',
  password : 'secret',
  database : 'groupomania'
});

conn.connect(
    function(err) {
        if (err) {
            console.log('error connecting: ' + err.stack);
            throw err;
        } else {
            console.log("Connected ! ");
        }
    });

module.exports = conn;*/

module.exports = (req, res, next) => {
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
};