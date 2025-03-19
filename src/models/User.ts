import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
	clerkId: string
	name: string
	email: string
	avatar?: string
	createdAt: Date
	updatedAt: Date
}

export type User = Omit<IUser, keyof Document | 'createdAt' | 'updatedAt'> & {
	_id: string
	createdAt?: string
	updatedAt?: string
}

export type UserUpdateData = {
	name?: string
	avatar?: string
	email?: string
	clerkId?: string
}

const userSchema = new Schema(
	{
		clerkId: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		avatar: { type: String },
	},
	{ timestamps: true },
)

const User = mongoose.model<IUser>('User', userSchema)

export default User
