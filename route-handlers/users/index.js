const express = require('express');
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('./controller');

const router = new express.Router();

router.route('/')
    .get(getUsers)
    .post(createUser);
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;