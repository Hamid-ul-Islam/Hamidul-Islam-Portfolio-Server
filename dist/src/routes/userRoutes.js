"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// GET /api/users - Get all users
router.get('/', userController_1.getUsers);
// GET /api/users/:id - Get user by ID
router.get('/id/:id', userController_1.getUserById);
// GET /api/users/clerk/:clerkId - Get user by Clerk ID
router.get('/clerk/:clerkId', userController_1.getUserByClerkId);
// GET /api/users/email/:email - Get user by Email
router.get('/email/:email', userController_1.getUserByEmail);
// POST /api/users - Create a new user
router.post('/', userController_1.createUser);
// PUT /api/users/:id - Update a user
router.put('/:id', userController_1.updateUser);
// DELETE /api/users/:id - Delete a user
router.delete('/:id', userController_1.deleteUser);
exports.default = router;
