import mongoose, { Schema, Document } from 'mongoose'

export interface IPost extends Document {
	title: string
	slug: string
	excerpt: string
	content: string
	image: string
	tags: string[]
	date: string
	status: 'published' | 'draft' | 'archived'
	author?: {
		name: string
		avatar?: string
	}
	readingTime?: number
	featured?: boolean
	createdAt: Date
	updatedAt: Date
}

const postSchema = new Schema(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		excerpt: { type: String, required: true },
		content: { type: String, required: true },
		image: { type: String, required: true },
		tags: [{ type: String }],
		date: { type: String, required: true },
		status: {
			type: String,
			enum: ['published', 'draft', 'archived'],
			default: 'draft',
		},
		author: {
			name: { type: String },
			avatar: { type: String },
		},
		readingTime: { type: Number },
		featured: { type: Boolean, default: false },
	},
	{ timestamps: true },
)

const Post = mongoose.model<IPost>('Post', postSchema)

export default Post
