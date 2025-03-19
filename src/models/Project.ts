import mongoose, { Schema, Document } from 'mongoose'

export interface IProject extends Document {
	title: string
	slug: string
	description: string
	longDescription?: string
	image: string
	gallery?: string[]
	tags: string[]
	demoUrl?: string
	githubUrl?: string
	featured: boolean
	date: string
	status: 'published' | 'draft' | 'archived'
	problem?: string
	solution?: string
	technologies?: string[]
	role?: string
	client?: string
	duration?: string
	createdAt: Date
	updatedAt: Date
}

const projectSchema = new Schema(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		longDescription: { type: String },
		image: { type: String, required: true },
		gallery: [{ type: String }],
		tags: [{ type: String }],
		demoUrl: { type: String },
		githubUrl: { type: String },
		featured: { type: Boolean, default: false },
		date: { type: String, required: true },
		status: {
			type: String,
			enum: ['published', 'draft', 'archived'],
			default: 'draft',
		},
		problem: { type: String },
		solution: { type: String },
		technologies: [{ type: String }],
		role: { type: String },
		client: { type: String },
		duration: { type: String },
	},
	{ timestamps: true },
)

const Project = mongoose.model<IProject>('Project', projectSchema)

export default Project
