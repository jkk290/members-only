const pool = require('./pool');

async function addUser(user) {
    await pool.query('INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)', [
        user.firstName,
        user.lastName,
        user.username,
        user.password
    ]);
};

module.exports = {
    addUser
};