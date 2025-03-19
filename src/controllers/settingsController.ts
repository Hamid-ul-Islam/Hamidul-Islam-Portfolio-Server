import { Request, Response } from 'express'
import {
	getSettingsByType,
	updateSettingsByType,
	SettingType,
} from '../models/Settings'

// @desc    Get all settings
// @route   GET /api/settings
// @access  Public
export const getAllSettings = async (req: Request, res: Response) => {
	try {
		const general = await getSettingsByType('general')
		const social = await getSettingsByType('social')
		const preferences = await getSettingsByType('preferences')

		res.json({
			general,
			social,
			preferences,
		})
	} catch (error) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Server error',
		})
	}
}

// @desc    Get general settings
// @route   GET /api/settings/general
// @access  Public
export const getGeneralSettings = async (req: Request, res: Response) => {
	try {
		const settings = await getSettingsByType('general')
		res.json(settings)
	} catch (error) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Server error',
		})
	}
}

// @desc    Get social settings
// @route   GET /api/settings/social
// @access  Public
export const getSocialSettings = async (req: Request, res: Response) => {
	try {
		const settings = await getSettingsByType('social')
		res.json(settings)
	} catch (error) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Server error',
		})
	}
}

// @desc    Get preference settings
// @route   GET /api/settings/preferences
// @access  Public
export const getPreferenceSettings = async (req: Request, res: Response) => {
	try {
		const settings = await getSettingsByType('preferences')
		res.json(settings)
	} catch (error) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Server error',
		})
	}
}

// @desc    Update general settings
// @route   PUT /api/settings/general
// @access  Private
export const updateGeneralSettings = async (req: Request, res: Response) => {
	try {
		const settings = await updateSettingsByType('general', req.body)
		res.json(settings)
	} catch (error) {
		res.status(400).json({
			message: error instanceof Error ? error.message : 'Invalid settings data',
		})
	}
}

// @desc    Update social settings
// @route   PUT /api/settings/social
// @access  Private
export const updateSocialSettings = async (req: Request, res: Response) => {
	try {
		const settings = await updateSettingsByType('social', req.body)
		res.json(settings)
	} catch (error) {
		res.status(400).json({
			message: error instanceof Error ? error.message : 'Invalid settings data',
		})
	}
}

// @desc    Update preference settings
// @route   PUT /api/settings/preferences
// @access  Private
export const updatePreferenceSettings = async (req: Request, res: Response) => {
	try {
		const settings = await updateSettingsByType('preferences', req.body)
		res.json(settings)
	} catch (error) {
		res.status(400).json({
			message: error instanceof Error ? error.message : 'Invalid settings data',
		})
	}
}
