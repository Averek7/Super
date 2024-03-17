const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'user123',
    password:'pass123',
    database: 'test'
})

module.exports = pool;