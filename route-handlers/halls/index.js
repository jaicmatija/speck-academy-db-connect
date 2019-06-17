const express = require('express');
const {
    getHalls,
    getHallById,
    createHall,
    updateHall,
    deleteHall
} = require('./controller');

const router = new express.Router();

router.route('/')
    .get(getHalls)
    .post(createHall);
router.route('/:id')
    .get(getHallById)
    .put(updateHall)
    .delete(deleteHall);

module.exports = router;