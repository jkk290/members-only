const pool = require('./pool');

async function addUser(user) {
    await pool.query('INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)', [
        user.firstName,
        user.lastName,
        user.username,
        user.password
    ]);
};

async function getUser(username) {
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (rows.length > 0) {
        return rows[0];
    } else {
        console.log('User not found');
    };
};

async function getUserById(id) {
    const { rows } = await pool.query('SELECT * FROM USERS WHERE id = $1', [id]);
    
    if (rows.length > 0) {
        return rows[0];
    } else {
        console.log('User not found');
    };
};

module.exports = {
    addUser,
    getUser,
    getUserById
};