const { Pool } = require('pg');

const pool = new Pool({
  host: '138.68.87.73',
  user: 'matijaja',
  password: 'TDd7#r7Z',
  database: 'db_matijaja',
  port: 5432,
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
}

