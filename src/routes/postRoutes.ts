import express from 'express'
import {
	getPosts,
	getPublishedPosts,
	getFeaturedPosts,
	getPostById,
	getPostBySlug,
	createPost,
	updatePost,
	deletePost,
} from '../controllers/postController'

const router = express.Router()

// GET /api/posts - Get all posts
router.get('/', getPosts)

// GET /api/posts/published - Get published posts
router.get('/published', getPublishedPosts)

// GET /api/posts/featured - Get featured posts
router.get('/featured', getFeaturedPosts)

// GET /api/posts/id/:id - Get a post by ID
router.get('/id/:id', getPostById)

// GET /api/posts/slug/:slug - Get a post by slug
router.get('/slug/:slug', getPostBySlug)

// POST /api/posts - Create a new post
router.post('/', createPost)

// PUT /api/posts/:id - Update a post
router.put('/:id', updatePost)

// DELETE /api/posts/:id - Delete a post
router.delete('/:id', deletePost)

export default router
