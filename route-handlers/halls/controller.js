const db = require('../../db/connect');

const getHalls = (request, response) => {
    db.query('SELECT * FROM halls ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        console.log(results.rows);
        response.status(200).json(results.rows);
    });
};

const getHallById = (request, response) => {
    const id = parseInt(request.params.id);

    db.query('SELECT * FROM halls WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length > 0) {
            response.status(200).json(results.rows[0]);
        } else {
            response.status(200).send({
                message: "Hall with that ID doesn't exist."
            });
        }
    });
};

const createHall = (request, response) => {
    const {
        name,
        address
    } = request.body;

    db.query('INSERT INTO halls (name, address) VALUES ($1, $2)', [name, address], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send({
            message: 'Hall added'
        });
    });
};

const updateHall = (request, response) => {
    const id = parseInt(request.params.id);
    const {
        name,
        address
    } = request.body;
    const updatedAt = new Date();

    db.query(
        'UPDATE halls SET name = $1, address = $2, updatedAt = $3 WHERE id = $4',
        [name, address, updatedAt, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`Hall modified with ID: ${id}`);
        }
    );
};

const deleteHall = (request, response) => {
    const id = parseInt(request.params.id);

    db.query('DELETE FROM halls WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Hall deleted with ID: ${id}`);
    });
};

module.exports = {
    getHalls,
    getHallById,
    createHall,
    updateHall,
    deleteHall
};