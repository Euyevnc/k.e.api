const mysql = require('mysql2');

function createPool(config: Record<string, unknown>) {
  return mysql.createPool(config);
}

export default createPool;
