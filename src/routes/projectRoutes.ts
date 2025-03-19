import express from 'express'
import {
	getProjects,
	getProjectById,
	getProjectBySlug,
	createProject,
	updateProject,
	deleteProject,
	getFeaturedProjects,
} from '../controllers/projectController'

const router = express.Router()

// GET /api/projects - Get all projects
router.get('/', getProjects)

// GET /api/projects/featured - Get featured projects
router.get('/featured', getFeaturedProjects)

// GET /api/projects/:id - Get a project by ID
router.get('/id/:id', getProjectById)

// GET /api/projects/slug/:slug - Get a project by slug
router.get('/slug/:slug', getProjectBySlug)

// POST /api/projects - Create a new project
router.post('/', createProject)

// PUT /api/projects/:id - Update a project
router.put('/:id', updateProject)

// DELETE /api/projects/:id - Delete a project
router.delete('/:id', deleteProject)

export default router
