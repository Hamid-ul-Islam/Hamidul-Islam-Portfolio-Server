import express from 'express'
import {
	getAllMedia,
	getMediaById,
	uploadMedia,
	updateMedia,
	deleteMedia,
} from '../controllers/mediaController'

const router = express.Router()

// GET /api/media - Get all media items
router.get('/', getAllMedia)

// GET /api/media/:id - Get a media item by ID
router.get('/:id', getMediaById)

// POST /api/media - Upload a media item
router.post('/', uploadMedia)

// PUT /api/media/:id - Update a media item
router.put('/:id', updateMedia)

// DELETE /api/media/:id - Delete a media item
router.delete('/:id', deleteMedia)

export default router
