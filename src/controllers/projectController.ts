import { Request, Response } from 'express'
import Project, { IProject } from '../models/Project'

// @desc    Get all projects with filters
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req: Request, res: Response) => {
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
		const projects = await Project.find(filter)
			.sort({ date: -1 })
			.limit(Number(limit))
			.skip(skip)

		// Get total count
		const total = await Project.countDocuments(filter)

		res.json({
			projects,
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

// @desc    Get featured projects
// @route   GET /api/projects/featured
// @access  Public
export const getFeaturedProjects = async (req: Request, res: Response) => {
	try {
		const projects = await Project.find({
			featured: true,
			status: 'published',
		})
			.sort({ date: -1 })
			.limit(6)

		res.json(projects)
	} catch (error) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Server error',
		})
	}
}

// @desc    Get a project by ID
// @route   GET /api/projects/id/:id
// @access  Public
export const getProjectById = async (req: Request, res: Response):Promise<any> => {
	try {
		const project = await Project.findById(req.params.id)

		if (!project) {
			return res.status(404).json({ message: 'Project not found' })
		}

		res.json(project)
	} catch (error) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Server error',
		})
	}
}

// @desc    Get a project by slug
// @route   GET /api/projects/slug/:slug
// @access  Public
export const getProjectBySlug = async (req: Request, res: Response):Promise<any> => {
	try {
		const project = await Project.findOne({ slug: req.params.slug })

		if (!project) {
			return res.status(404).json({ message: 'Project not found' })
		}

		res.json(project)
	} catch (error) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Server error',
		})
	}
}

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
export const createProject = async (req: Request, res: Response):Promise<any> => {
	try {
		// Check if slug already exists
		const existingProject = await Project.findOne({ slug: req.body.slug })
		if (existingProject) {
			return res.status(400).json({ message: 'Slug already exists' })
		}

		const project = new Project(req.body)
		const createdProject = await project.save()
		res.status(201).json(createdProject)
	} catch (error) {
		res.status(400).json({
			message: error instanceof Error ? error.message : 'Invalid project data',
		})
	}
}

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = async (req: Request, res: Response):Promise<any> => {
	try {
		const project = await Project.findById(req.params.id)

		if (!project) {
			return res.status(404).json({ message: 'Project not found' })
		}

		// Check if slug is changed and already exists
		if (req.body.slug && req.body.slug !== project.slug) {
			const existingProject = await Project.findOne({ slug: req.body.slug })
			if (existingProject) {
				return res.status(400).json({ message: 'Slug already exists' })
			}
		}

		const updatedProject = await Project.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true },
		)

		res.json(updatedProject)
	} catch (error) {
		res.status(400).json({
			message: error instanceof Error ? error.message : 'Invalid project data',
		})
	}
}

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = async (req: Request, res: Response):Promise<any> => {
	try {
		const project = await Project.findById(req.params.id)

		if (!project) {
			return res.status(404).json({ message: 'Project not found' })
		}

		await Project.findByIdAndDelete(req.params.id)
		res.json({ message: 'Project removed' })
	} catch (error) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Server error',
		})
	}
}
