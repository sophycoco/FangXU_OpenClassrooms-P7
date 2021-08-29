const mysql = require('mysql');
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

module.exports = conn;