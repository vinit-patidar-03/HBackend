const ClassRoomModel = require("../models/ClassRoom");
const UserModel = require("../models/User");

const createRoom = async (req, res) => {
    const { name, startTime, endTime, days } = req.body;

    try {
        const room = await ClassRoomModel.create({ name, startTime, endTime, days });
        res.status(201).json({ success: true, room });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getRooms = async (req, res) => {
    try {
        const rooms = await ClassRoomModel.find().populate('teacher');
        res.status(200).json({ success: true, rooms });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });

    }
}

const getRoomDetails = async (req, res) => {
    try {
        const room = await ClassRoomModel.findById(req.params.id).populate('teacher').populate('students');
        res.status(200).json({ success: true, room });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const assignUser = async (req, res) => {
    const { userId, id } = req.body;

    try {
        let user = await UserModel.findById(userId).select('-password');

        if (user.classRoom) {
            return res.status(400).json({ success: false, message: "User already belong to another class" });
        }

        let room;
        if (user.role === "T") {
            room = await ClassRoomModel.findByIdAndUpdate(id, {
                $set: { teacher: userId }
            }, { new: true });
        } else {
            room = await ClassRoomModel.findByIdAndUpdate(id, {
                $push: { students: userId }
            }, { new: true });
        }

        user = await UserModel.findByIdAndUpdate(userId, { $set: { classRoom: id } }, { new: true });
        res.status(200).json({ success: true, room, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const removeUser = async (req, res) => {
    const { userId, id } = req.body;

    try {
        let user = await UserModel.findById(userId).select('-password');
        let room;
        if (user.role === "T") {
            room = await ClassRoomModel.findByIdAndUpdate(id, {
                $set: { teacher: null }
            }, { new: true });
        } else {
            room = await ClassRoomModel.findByIdAndUpdate(id, {
                $pull: { students: userId }
            }, { new: true });
        }

        user = await UserModel.findByIdAndUpdate(userId, { $set: { classRoom: null } }, { new: true });
        res.status(200).json({ success: true, room, user });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { createRoom, getRooms, getRoomDetails, assignUser, removeUser };