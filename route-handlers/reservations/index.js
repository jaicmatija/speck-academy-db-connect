const express = require('express');
const {
    getReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation
} = require('./controller');

const router = new express.Router();

router.route('/')
    .get(getReservations)
    .post(createReservation);
router.route('/:id')
    .get(getReservationById)
    .put(updateReservation)
    .delete(deleteReservation);

module.exports = router;