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
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    
    if (rows.length > 0) {
        return rows[0];
    } else {
        console.log('User not found');
    };
};

async function getAllMessages() {
    const { rows } = await pool.query(
        'SELECT m.id, m.title, m.msg, m.date_added, u.first_name, u.last_name FROM messages as m JOIN users as u ON m.author = u.id'
    );

    if (rows.length > 0) {
        return rows;
    } else {
        console.log('No messages in the database');
    };
};

async function addMsg(message) {
    await pool.query('INSERT INTO messages (title, msg, date_added, author) VALUES ($1, $2, $3, $4)', [
        message.title,
        message.msg,
        message.date,
        message.author
    ]);
};

async function deleteMsg(id) {
    await pool.query('DELETE FROM messages where id = $1', [id]);
};

async function getMembershipPw() {
    const { rows } = await pool.query('SELECT * FROM membership_pw');

    return rows[0];
}

async function activateMembership(id) {
    await pool.query('UPDATE users SET membership = true WHERE id = $1', [id]);
}

module.exports = {
    addUser,
    getUser,
    getUserById,
    getAllMessages,
    addMsg,
    deleteMsg,
    getMembershipPw,
    activateMembership
};