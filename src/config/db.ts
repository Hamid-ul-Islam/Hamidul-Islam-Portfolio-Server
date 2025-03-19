import mongoose from 'mongoose'

export const connectDB = async () => {
	try {
		const uri = process.env.MONGODB_URI
		if (!uri) {
			throw new Error('MongoDB URI is not defined')
		}
		const conn = await mongoose.connect(uri)
		console.log(`MongoDB Connected: ${conn.connection.host}`)
	} catch (error) {
		console.error(
			`Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
		)
		process.exit(1)
	}
}
