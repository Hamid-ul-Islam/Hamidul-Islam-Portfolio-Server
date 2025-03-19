import mongoose, { Schema, Document } from 'mongoose'

// General Settings Interface
export interface IGeneralSettings extends Document {
	siteTitle: string
	siteDescription: string
	contactEmail: string
	phoneNumber: string
	location: string
	resumeUrl: string
	footerText: string
	createdAt: Date
	updatedAt: Date
}

// Social Settings Interface
export interface ISocialSettings extends Document {
	github: string
	linkedin: string
	twitter: string
	instagram: string
	facebook?: string
	youtube?: string
	createdAt: Date
	updatedAt: Date
}

// Preference Settings Interface
export interface IPreferenceSettings extends Document {
	enableBlog: boolean
	enableComments: boolean
	enableDarkMode: boolean
	enableAnalytics: boolean
	maintenanceMode?: boolean
	createdAt: Date
	updatedAt: Date
}

// General Settings Schema
const generalSettingsSchema: Schema = new Schema(
	{
		siteTitle: {
			type: String,
			required: true,
			default: 'Portfolio & Blog',
		},
		siteDescription: {
			type: String,
			required: true,
			default: 'Full Stack Developer specializing in Next.js and TypeScript',
		},
		contactEmail: {
			type: String,
			required: true,
			default: 'contact@example.com',
		},
		phoneNumber: {
			type: String,
			required: false,
			default: '',
		},
		location: {
			type: String,
			required: false,
			default: '',
		},
		resumeUrl: {
			type: String,
			required: false,
			default: '',
		},
		footerText: {
			type: String,
			required: true,
			default: `© ${new Date().getFullYear()} Portfolio. All rights reserved.`,
		},
	},
	{ timestamps: true },
)

// Social Settings Schema
const socialSettingsSchema: Schema = new Schema(
	{
		github: {
			type: String,
			default: 'https://github.com',
		},
		linkedin: {
			type: String,
			default: 'https://linkedin.com',
		},
		twitter: {
			type: String,
			default: 'https://twitter.com',
		},
		instagram: {
			type: String,
			default: '',
		},
		facebook: {
			type: String,
			default: '',
		},
		youtube: {
			type: String,
			default: '',
		},
	},
	{ timestamps: true },
)

// Preference Settings Schema
const preferenceSettingsSchema: Schema = new Schema(
	{
		enableBlog: {
			type: Boolean,
			default: true,
		},
		enableComments: {
			type: Boolean,
			default: true,
		},
		enableDarkMode: {
			type: Boolean,
			default: true,
		},
		enableAnalytics: {
			type: Boolean,
			default: false,
		},
		maintenanceMode: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
)

// Export types for data fetch
export type GeneralSettings = Omit<
	IGeneralSettings,
	keyof Document | 'createdAt' | 'updatedAt'
> & {
	_id?: string
	createdAt?: string
	updatedAt?: string
}

export type SocialSettings = Omit<
	ISocialSettings,
	keyof Document | 'createdAt' | 'updatedAt'
> & {
	_id?: string
	createdAt?: string
	updatedAt?: string
}

export type PreferenceSettings = Omit<
	IPreferenceSettings,
	keyof Document | 'createdAt' | 'updatedAt'
> & {
	_id?: string
	createdAt?: string
	updatedAt?: string
}

export type SettingType = 'general' | 'social' | 'preferences'

export type Settings = {
	general: GeneralSettings
	social: SocialSettings
	preferences: PreferenceSettings
}

// Create models
export const GeneralSettings = mongoose.model<IGeneralSettings>(
	'GeneralSettings',
	generalSettingsSchema,
)
export const SocialSettings = mongoose.model<ISocialSettings>(
	'SocialSettings',
	socialSettingsSchema,
)
export const PreferenceSettings = mongoose.model<IPreferenceSettings>(
	'PreferenceSettings',
	preferenceSettingsSchema,
)

/**
 * Helper function to get settings by type
 */
export async function getSettingsByType(type: SettingType): Promise<any> {
	let Model: any

	switch (type) {
		case 'general':
			Model = GeneralSettings
			break
		case 'social':
			Model = SocialSettings
			break
		case 'preferences':
			Model = PreferenceSettings
			break
		default:
			throw new Error(`Invalid setting type: ${type}`)
	}

	// Try to get existing settings
	let settings = await Model.findOne().lean()

	// If no settings exist, create a new document with default values
	if (!settings) {
		const newSettings = new Model()
		const savedSettings = await newSettings.save()
		// Convert to plain object
		settings = savedSettings.toObject()
	}

	return settings
}

/**
 * Helper function to update settings by type
 */
export async function updateSettingsByType(
	type: SettingType,
	data: any,
): Promise<any> {
	let Model: any

	switch (type) {
		case 'general':
			Model = GeneralSettings
			break
		case 'social':
			Model = SocialSettings
			break
		case 'preferences':
			Model = PreferenceSettings
			break
		default:
			throw new Error(`Invalid setting type: ${type}`)
	}

	// Find the first document and update it (or create if it doesn't exist)
	const updated = await Model.findOneAndUpdate(
		{}, // Empty filter to match first document
		{ $set: data },
		{
			new: true, // Return the updated document
			upsert: true, // Create if it doesn't exist
			setDefaultsOnInsert: true, // Use schema defaults if creating
			runValidators: true, // Run validators
		},
	).lean()

	return updated
}
