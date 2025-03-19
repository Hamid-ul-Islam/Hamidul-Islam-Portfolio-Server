import express from 'express'
import {
	getGeneralSettings,
	getSocialSettings,
	getPreferenceSettings,
	updateGeneralSettings,
	updateSocialSettings,
	updatePreferenceSettings,
	getAllSettings,
} from '../controllers/settingsController'

const router = express.Router()

// GET /api/settings - Get all settings
router.get('/', getAllSettings)

// GET /api/settings/general - Get general settings
router.get('/general', getGeneralSettings)

// GET /api/settings/social - Get social settings
router.get('/social', getSocialSettings)

// GET /api/settings/preferences - Get preference settings
router.get('/preferences', getPreferenceSettings)

// PUT /api/settings/general - Update general settings
router.put('/general', updateGeneralSettings)

// PUT /api/settings/social - Update social settings
router.put('/social', updateSocialSettings)

// PUT /api/settings/preferences - Update preference settings
router.put('/preferences', updatePreferenceSettings)

export default router
