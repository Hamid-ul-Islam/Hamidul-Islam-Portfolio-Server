import dotenv from 'dotenv'
dotenv.config()

import { app } from './src/app'
import { connectDB } from './src/config/db'

const PORT = process.env.PORT || 5000

// Start the server
const startServer = async () => {
	try {
		// Connect to MongoDB
		await connectDB()

		// Start Express server
		app.listen(PORT, () => {
			console.log(
				`Server running in ${
					process.env.NODE_ENV || 'development'
				} mode on port ${PORT}`,
			)
		})
	} catch (error) {
		console.error(
			`Error starting server: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`,
		)
		process.exit(1)
	}
}

startServer()
