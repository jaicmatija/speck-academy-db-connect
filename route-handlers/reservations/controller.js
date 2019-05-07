const db = require('../../db/connect');

const getReservations = (request, response) => {
    db.query('SELECT * FROM reservations ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        console.log(results.rows);
        response.status(200).json(results.rows);
    });
};

const getReservationById = (request, response) => {
    const id = parseInt(request.params.id);

    db.query('SELECT * FROM reservations WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length > 0) {
            response.status(200).json(results.rows[0]);
        } else {
            response.status(200).send({
                message: "Reservation with that ID doesn't exist."
            });
        }
    });
};

const createReservation = (request, response) => {
    const { body } = request;
    const userFK = parseInt(body.userFK);
    const hallFK = parseInt(body.hallFK);
    const reservationStatus = parseInt(body.reservationStatus);
    const reservedFrom = new Date(body.reservedFrom);
    const reservedUntil = new Date(body.reservedUntil);

    db.query(
        'INSERT INTO reservations (userFK, hallFK, reservationStatus, reservedFrom, reservedUntil) VALUES ($1, $2, $3, $4, $5)',
        [userFK, hallFK, reservationStatus, reservedFrom, reservedUntil],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(201).send({
                message: 'Reservation added'
            });
        });
};

const updateReservation = (request, response) => {
    const { body } = request;
    const id = parseInt(body.params.id);
    const userFK = parseInt(body.userFK);
    const hallFK = parseInt(body.hallFK);
    const reservationStatus = parseInt(body.reservationStatus);
    const reservedFrom = new Date(body.reservedFrom);
    const reservedUntil = new Date(body.reservedUntil);
    const updatedAt = new Date();

    db.query(
        'UPDATE reservations SET userFK = $1, hallFK = $2, reservationStatus = $3, reservedFrom = $4, reservedUntil = $5, updatedAt = $6 WHERE id = $7',
        [userFK, hallFK, reservationStatus, reservedFrom, reservedUntil, updatedAt, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`Reservation modified with ID: ${id}`);
        }
    );
};

const deleteReservation = (request, response) => {
    const id = parseInt(request.params.id);

    db.query('DELETE FROM reservations WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Reservation deleted with ID: ${id}`);
    });
};

module.exports = {
    getReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation
};