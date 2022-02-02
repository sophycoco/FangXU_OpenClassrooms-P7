const mysql = require('mysql2');
require('dotenv').config();

const conn = mysql.createConnection({
  host: process.env.DB_LOCALHOST,
  user: process.env.DB_IDENTIFIANT,
  password: process.env.DB_PASSWORD,
  database: 'groupomania'
});

conn.connect(
    function(err) {
        if (err) {
            console.log('Unable to connect to the database:', err);
            throw err;
        } else {
            console.log("Connection has been established successfully.");
        }
    });

module.exports = conn;
/*
module.exports = (req, res, next) => {
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
};*/