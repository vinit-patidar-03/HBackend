const express = require('express');
const { createRoom, getRooms, getRoomDetails, assignUser, removeUser } = require('../controllers/RoomControllers');
const router = express.Router();

router.post('/createRoom', createRoom);
router.get('/getRooms', getRooms);
router.get('/getRoomDetails/:id', getRoomDetails);
router.put('/assignUser', assignUser);
router.put('/removeUser', removeUser);

module.exports = router;