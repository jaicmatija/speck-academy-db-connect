const db = require('../../db/connect');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getUsers = (request, response) => {
    db.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        console.log(results.rows);
        response.status(200).json(results.rows);
    });
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    db.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length > 0) {
            response.status(200).json(results.rows[0]);
        } else {
            response.status(200).send({
                message: "User with that ID doesn't exist."
            });
        }
    });
};

const createUser = (request, response) => {
    const {
        username,
        password,
        firstname,
        lastname
    } = request.body;

    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    db.query(
        'INSERT INTO users (username, hashedpassword, firstname, lastname) VALUES ($1, $2, $3, $4)',
        [username, hashedPassword, firstname, lastname],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(201).send({
                message: 'User added'
            });
        });
};

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const {
        username,
        password,
        firstname,
        lastname
    } = request.body;
    const updatedAt = new Date();
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    db.query(
        'UPDATE users SET username = $1, hashedPassword = $2, firstname = $3, lastname = $4, updatedAt = $5 WHERE id = $6',
        [username, hashedPassword, firstname, lastname, updatedAt, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`User modified with ID: ${id}`);
        }
    );
};

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    db.query('DELETE FROM reservations WHERE userFK = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }

    });

    db.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User deleted with ID: ${id}`);
    });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};