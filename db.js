const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost', 
    user: 'root',
    password: 'ifsp',
    database: 'sistema_auth'
});

module.exports = pool;