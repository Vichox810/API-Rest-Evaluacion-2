const mysql = require('mysql2');
// Se recomienda usar createPool para mejor rendimiento
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Potopelao8190',
  database: 'tablas_3_4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
module.exports = pool.promise(); // Exportar como promesas