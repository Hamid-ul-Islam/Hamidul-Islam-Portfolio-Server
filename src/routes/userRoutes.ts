import express from 'express'
import {
	getUsers,
	getUserById,
	getUserByClerkId,
	createUser,
	updateUser,
	deleteUser,
	getUserByEmail,
} from '../controllers/userController'

const router = express.Router()

// GET /api/users - Get all users
router.get('/', getUsers)

// GET /api/users/:id - Get user by ID
router.get('/id/:id', getUserById)

// GET /api/users/clerk/:clerkId - Get user by Clerk ID
router.get('/clerk/:clerkId', getUserByClerkId)

// GET /api/users/email/:email - Get user by Email
router.get('/email/:email', getUserByEmail)

// POST /api/users - Create a new user
router.post('/', createUser)

// PUT /api/users/:id - Update a user
router.put('/:id', updateUser)

// DELETE /api/users/:id - Delete a user
router.delete('/:id', deleteUser)

export default router
