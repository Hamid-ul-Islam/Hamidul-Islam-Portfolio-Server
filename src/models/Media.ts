import mongoose, { Schema, Document } from 'mongoose'

export interface IMedia extends Document {
	name: string
	url: string
	type: string
	size: number
	dimensions?: {
		width: number
		height: number
	}
	uploadedAt: string
	createdAt: Date
	updatedAt: Date
}

const mediaSchema = new Schema(
	{
		name: { type: String, required: true },
		url: { type: String, required: true },
		type: { type: String, required: true },
		size: { type: Number, required: true },
		dimensions: {
			width: { type: Number },
			height: { type: Number },
		},
		uploadedAt: { type: String, required: true },
	},
	{ timestamps: true },
)

const Media = mongoose.model<IMedia>('Media', mediaSchema)

export default Media
