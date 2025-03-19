import { Request, Response } from 'express'
import Post, { IPost } from '../models/Post'
import { serializeMdx } from '../utils/serializeMdx'

// @desc    Get all posts with filters
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req: Request, res: Response) => {
	try {
		const { status, featured, tag, limit = 10, page = 1 } = req.query

		// Build filter object
		const filter: any = {}

		if (status) filter.status = status
		if (featured) filter.featured = featured === 'true'
		if (tag) filter.tags = { $in: [tag] }

		// Calculate pagination
		const skip = (Number(page) - 1) * Number(limit)

		// Execute query
		const posts = await Post.find(filter)
			.sort({ date: -1 })
			.limit(Number(limit))
			.skip(skip)

		// Get total count
		const total = await Post.countDocuments(filter)

		res.json({
			posts,
			pagination: {
				total,
				page: Number(page),
				pages: Math.ceil(total / Number(limit)),
			},
		})
	} catch (error) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Server error',
		})
	}
}

// @desc    Get published posts
// @route   GET /api/posts/published
// @access  Public
export const getPublishedPosts = async (req: Request, res: Response) => {
	try {
		const { limit = 10, page = 1 } = req.query

		// Calculate pagination
		const skip = (Number(page) - 1) * Number(limit)

		// Execute query
		const posts = await Post.find({ status: 'published' })
			.sort({ date: -1 })
			.limit(Number(limit))
			.skip(skip)

		// Get total count
		const total = await Post.countDocuments({ status: 'published' })

		res.json({
			posts,
			pagination: {
				total,
				page: Number(page),
				pages: Math.ceil(total / Number(limit)),
			},
		})
	} catch (error) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Server error',
		})
	}
}

// @desc    Get featured posts
// @route   GET /api/posts/featured
// @access  Public
export const getFeaturedPosts = async (req: Request, res: Response) => {
	try {
		const posts = await Post.find({
			featured: true,
			status: 'published',
		})
			.sort({ date: -1 })
			.limit(6)

		res.json(posts)
	} catch (error) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Server error',
		})
	}
}

// @desc    Get a post by ID
// @route   GET /api/posts/id/:id
// @access  Public
export const getPostById = async (
	req: Request,
	res: Response,
): Promise<any> => {
	try {
		const post = await Post.findById(req.params.id)

		if (!post) {
			return res.status(404).json({ message: 'Post not found' })
		}

		const postObj = post.toObject()
		const serializedContent = await serializeMdx(postObj.content)
		postObj.content = serializedContent as any
		res.json(postObj)
	} catch (error) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Server error',
		})
	}
}

// @desc    Get a post by slug
// @route   GET /api/posts/slug/:slug
// @access  Public
export const getPostBySlug = async (
	req: Request,
	res: Response,
): Promise<any> => {
	try {
		const post = await Post.findOne({ slug: req.params.slug })

		if (!post) {
			return res.status(404).json({ message: 'Post not found' })
		}
		const postObj = post.toObject()
		const serializedContent = await serializeMdx(postObj.content)
		postObj.content = serializedContent as any
		res.json(postObj)
	} catch (error) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Server error',
		})
	}
}

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req: Request, res: Response): Promise<any> => {
	try {
		// Check if slug already exists
		const existingPost = await Post.findOne({ slug: req.body.slug })
		if (existingPost) {
			return res.status(400).json({ message: 'Slug already exists' })
		}

		const post = new Post(req.body)
		const createdPost = await post.save()
		res.status(201).json(createdPost)
	} catch (error) {
		res.status(400).json({
			message: error instanceof Error ? error.message : 'Invalid post data',
		})
	}
}

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req: Request, res: Response): Promise<any> => {
	try {
		const post = await Post.findById(req.params.id)

		if (!post) {
			return res.status(404).json({ message: 'Post not found' })
		}

		// Check if slug is changed and already exists
		if (req.body.slug && req.body.slug !== post.slug) {
			const existingPost = await Post.findOne({ slug: req.body.slug })
			if (existingPost) {
				return res.status(400).json({ message: 'Slug already exists' })
			}
		}

		const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})

		res.json(updatedPost)
	} catch (error) {
		res.status(400).json({
			message: error instanceof Error ? error.message : 'Invalid post data',
		})
	}
}

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req: Request, res: Response): Promise<any> => {
	try {
		const post = await Post.findById(req.params.id)

		if (!post) {
			return res.status(404).json({ message: 'Post not found' })
		}

		await Post.findByIdAndDelete(req.params.id)
		res.json({ message: 'Post removed' })
	} catch (error) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Server error',
		})
	}
}
