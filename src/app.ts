import express, { Request, Response } from 'express'
import cors from 'cors'
import postRoutes from './routes/postRoutes'
import projectRoutes from './routes/projectRoutes'
import mediaRoutes from './routes/mediaRoutes'
import settingsRoutes from './routes/settingsRoutes'
import userRoutes from './routes/userRoutes'
import { errorHandler } from './middleware/errorHandler'

// Initialize Express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/posts', postRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/media', mediaRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/users', userRoutes)

// Basic route
app.get('/', (req: Request, res: Response) => {
	res.send('API is running...')
})

// Error handling middleware
app.use(errorHandler)

export { app }
