"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByEmail = exports.getUserByClerkId = exports.getUserById = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find().select('-__v');
        res.json(users);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Server error',
        });
    }
});
exports.getUsers = getUsers;
// @desc    Get user by ID
// @route   GET /api/users/id/:id
// @access  Private/Admin
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id).select('-__v');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Server error',
        });
    }
});
exports.getUserById = getUserById;
// @desc    Get user by Clerk ID
// @route   GET /api/users/clerk/:clerkId
// @access  Private
const getUserByClerkId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ clerkId: req.params.clerkId }).select('-__v');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Server error',
        });
    }
});
exports.getUserByClerkId = getUserByClerkId;
// @desc    Get user by Email
// @route   GET /api/users/email/:email
// @access  Private
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email: req.params.email }).select('-__v');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Server error',
        });
    }
});
exports.getUserByEmail = getUserByEmail;
// @desc    Create a new user
// @route   POST /api/users
// @access  Private
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clerkId, name, email, avatar } = req.body;
        // Check if user with clerkId already exists
        const userExists = yield User_1.default.findOne({ clerkId });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Check if email is already in use
        const emailExists = yield User_1.default.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const user = new User_1.default({
            clerkId,
            name,
            email,
            avatar,
        });
        const createdUser = yield user.save();
        res.status(201).json(createdUser);
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Invalid user data',
        });
    }
});
exports.createUser = createUser;
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updateData = {};
        // Only update fields that are sent
        if (req.body.name)
            updateData.name = req.body.name;
        if (req.body.avatar)
            updateData.avatar = req.body.avatar;
        if (req.body.email) {
            // Check if email is already in use by another user
            const emailExists = yield User_1.default.findOne({
                email: req.body.email,
                _id: { $ne: req.params.id },
            });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            updateData.email = req.body.email;
        }
        const updatedUser = yield User_1.default.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        res.json(updatedUser);
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Invalid user data',
        });
    }
});
exports.updateUser = updateUser;
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        yield User_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'User removed' });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Server error',
        });
    }
});
exports.deleteUser = deleteUser;
