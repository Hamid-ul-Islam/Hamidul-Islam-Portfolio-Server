import { Request, Response } from 'express'
import User, { IUser, UserUpdateData } from '../models/User'

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find().select('-__v')
		res.json(users)
	} catch (error) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Server error',
		})
	}
}

// @desc    Get user by ID
// @route   GET /api/users/id/:id
// @access  Private/Admin
export const getUserById = async (
	req: Request,
	res: Response,
): Promise<any> => {
	try {
		const user = await User.findById(req.params.id).select('-__v')

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		res.json(user)
	} catch (error) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Server error',
		})
	}
}

// @desc    Get user by Clerk ID
// @route   GET /api/users/clerk/:clerkId
// @access  Private
export const getUserByClerkId = async (
	req: Request,
	res: Response,
): Promise<any> => {
	try {
		const user = await User.findOne({ clerkId: req.params.clerkId }).select(
			'-__v',
		)

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		res.json(user)
	} catch (error) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Server error',
		})
	}
}

// @desc    Get user by Email
// @route   GET /api/users/email/:email
// @access  Private
export const getUserByEmail = async (
	req: Request,
	res: Response,
): Promise<any> => {
	try {
		const user = await User.findOne({ email: req.params.email }).select(
			'-__v',
		)

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		res.json(user)
	} catch (error) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Server error',
		})
	}
}

// @desc    Create a new user
// @route   POST /api/users
// @access  Private
export const createUser = async (req: Request, res: Response): Promise<any> => {
	try {
		const { clerkId, name, email, avatar } = req.body

		// Check if user with clerkId already exists
		const userExists = await User.findOne({ clerkId })
		if (userExists) {
			return res.status(400).json({ message: 'User already exists' })
		}

		// Check if email is already in use
		const emailExists = await User.findOne({ email })
		if (emailExists) {
			return res.status(400).json({ message: 'Email already in use' })
		}

		const user = new User({
			clerkId,
			name,
			email,
			avatar,
		})

		const createdUser = await user.save()
		res.status(201).json(createdUser)
	} catch (error) {
		res.status(400).json({
			message: error instanceof Error ? error.message : 'Invalid user data',
		})
	}
}

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
export const updateUser = async (req: Request, res: Response): Promise<any> => {
	try {
		const user = await User.findById(req.params.id)

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		const updateData: UserUpdateData = {}

		// Only update fields that are sent
		if (req.body.name) updateData.name = req.body.name
		if (req.body.avatar) updateData.avatar = req.body.avatar
		if (req.body.email) {
			// Check if email is already in use by another user
			const emailExists = await User.findOne({
				email: req.body.email,
				_id: { $ne: req.params.id },
			})

			if (emailExists) {
				return res.status(400).json({ message: 'Email already in use' })
			}

			updateData.email = req.body.email
		}

		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			updateData,
			{ new: true, runValidators: true },
		)

		res.json(updatedUser)
	} catch (error) {
		res.status(400).json({
			message: error instanceof Error ? error.message : 'Invalid user data',
		})
	}
}

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req: Request, res: Response): Promise<any> => {
	try {
		const user = await User.findById(req.params.id)

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		await User.findByIdAndDelete(req.params.id)
		res.json({ message: 'User removed' })
	} catch (error) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Server error',
		})
	}
}
