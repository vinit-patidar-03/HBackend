const ClassRoomModel = require("../models/ClassRoom");
const UserModel = require("../models/User");
const jwt = require('jsonwebtoken');

const LoginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Please ask your admin to create an account for you." });
        }

        if (user.password.toLowerCase() !== password.toLowerCase()) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user._id, email, role: user.role }, process.env.JWT_SECRET);
        res.status(201).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const CreateUserController = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await UserModel.findOne({ email });

        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        user = await UserModel.create({ name, email, password, role });
        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getUserController = async (req, res) => {
    const id = req.user.id;

    try {
        const user = await UserModel.findById(id).select('-password');
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getAllUsers = async (req, res) => {
    const { role } = req.user;
    if (role === "P") {
        try {
            let users = await UserModel.find().select('-password').populate('classRoom');
            users = users.filter(user => user.role !== "P");
            res.status(200).json({ success: true, users });
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id);
        if (user.classRoom) {
            if (user.role === "T") {
                await ClassRoomModel.findByIdAndUpdate(user.classRoom, { $set: { teacher: null } });
            }
            else {
                await ClassRoomModel.findByIdAndUpdate(user.classRoom, { $pull: { students: id } });
            }
        }
        await UserModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        let user = await UserModel.findByIdAndUpdate(id, { $set: { name, email, password } }, { new: true }).populate('classRoom');
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { LoginController, CreateUserController, getUserController, getAllUsers, deleteUser, updateUser };