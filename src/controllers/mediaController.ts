import { Request, Response } from 'express'
import Media, { IMedia } from '../models/Media'

// @desc    Get all media items
// @route   GET /api/media
// @access  Public
export const getAllMedia = async (req: Request, res: Response) => {
	try {
		const { limit = 20, page = 1, type } = req.query

		// Build filter object
		const filter: any = {}

		if (type) filter.type = type

		// Calculate pagination
		const skip = (Number(page) - 1) * Number(limit)

		// Execute query
		const mediaItems = await Media.find(filter)
			.sort({ uploadedAt: -1 })
			.limit(Number(limit))
			.skip(skip)

		// Get total count
		const total = await Media.countDocuments(filter)

		res.json({
			media: mediaItems,
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

// @desc    Get a media item by ID
// @route   GET /api/media/:id
// @access  Public
export const getMediaById = async (
	req: Request,
	res: Response,
): Promise<any> => {
	try {
		const media = await Media.findById(req.params.id)

		if (!media) {
			return res.status(404).json({ message: 'Media not found' })
		}

		res.json(media)
	} catch (error) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Server error',
		})
	}
}

// @desc    Upload a media item
// @route   POST /api/media
// @access  Private
export const uploadMedia = async (req: Request, res: Response) => {
	try {
		// Note: In a real-world scenario, you would handle file uploads here
		// using a library like multer, and possibly upload to a cloud storage
		// This is a simplified version

		const mediaData = {
			name: req.body.name,
			url: req.body.url,
			type: req.body.type,
			size: req.body.size,
			dimensions: req.body.dimensions,
			uploadedAt: new Date().toISOString(),
		}

		const media = new Media(mediaData)
		const uploadedMedia = await media.save()

		res.status(201).json(uploadedMedia)
	} catch (error) {
		res.status(400).json({
			message: error instanceof Error ? error.message : 'Invalid media data',
		})
	}
}

// @desc    Update a media item
// @route   PUT /api/media/:id
// @access  Private
export const updateMedia = async (
	req: Request,
	res: Response,
): Promise<any> => {
	try {
		const media = await Media.findById(req.params.id)

		if (!media) {
			return res.status(404).json({ message: 'Media not found' })
		}

		const updatedMedia = await Media.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true },
		)

		res.json(updatedMedia)
	} catch (error) {
		res.status(400).json({
			message: error instanceof Error ? error.message : 'Invalid media data',
		})
	}
}

// @desc    Delete a media item
// @route   DELETE /api/media/:id
// @access  Private
export const deleteMedia = async (
	req: Request,
	res: Response,
): Promise<any> => {
	try {
		const media = await Media.findById(req.params.id)

		if (!media) {
			return res.status(404).json({ message: 'Media not found' })
		}

		// Note: In a real-world scenario, you would also delete the file from storage

		await Media.findByIdAndDelete(req.params.id)
		res.json({ message: 'Media removed' })
	} catch (error) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Server error',
		})
	}
}
