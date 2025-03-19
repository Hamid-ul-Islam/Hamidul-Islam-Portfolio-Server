# Express API for Portfolio & Blog

This is an Express API server that replaces Next.js API routes for a portfolio
and blog application.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- RESTful API endpoints for blog posts, projects, media, users, and settings
- MongoDB integration with Mongoose
- TypeScript support
- Structured MVC architecture
- Error handling middleware
- Authentication placeholder (for Clerk integration)

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd express-api
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/your-database
NODE_ENV=development
```

4. Start the development server

```bash
npm run dev
```

5. Build for production

```bash
npm run build
npm start
```

## Folder Structure

```
express-api/
├── src/
│   ├── config/
│   │   └── db.ts                 # Database connection
│   ├── controllers/
│   │   ├── postController.ts     # Post route handlers
│   │   ├── projectController.ts  # Project route handlers
│   │   ├── mediaController.ts    # Media route handlers
│   │   ├── settingsController.ts # Settings route handlers
│   │   └── userController.ts     # User route handlers
│   ├── routes/
│   │   ├── postRoutes.ts         # Post routes
│   │   ├── projectRoutes.ts      # Project routes
│   │   ├── mediaRoutes.ts        # Media routes
│   │   ├── settingsRoutes.ts     # Settings routes
│   │   └── userRoutes.ts         # User routes
│   ├── models/
│   │   ├── Post.ts               # Post model
│   │   ├── Project.ts            # Project model
│   │   ├── Media.ts              # Media model
│   │   ├── Settings.ts           # Settings models
│   │   └── User.ts               # User model
│   ├── middleware/
│   │   ├── errorHandler.ts       # Error handling middleware
│   │   └── authMiddleware.ts     # Authentication middleware
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   └── app.ts                    # Express app setup
├── .env                          # Environment variables
├── .gitignore                    # Git ignore file
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
└── server.ts                     # Entry point
```

## API Endpoints

### Posts

- `GET /api/posts` - Get all posts with pagination and filters
- `GET /api/posts/published` - Get published posts
- `GET /api/posts/featured` - Get featured posts
- `GET /api/posts/id/:id` - Get a post by ID
- `GET /api/posts/slug/:slug` - Get a post by slug
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

### Projects

- `GET /api/projects` - Get all projects with pagination and filters
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/id/:id` - Get a project by ID
- `GET /api/projects/slug/:slug` - Get a project by slug
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Media

- `GET /api/media` - Get all media items with pagination
- `GET /api/media/:id` - Get a media item by ID
- `POST /api/media` - Upload a media item
- `PUT /api/media/:id` - Update a media item
- `DELETE /api/media/:id` - Delete a media item

### Settings

- `GET /api/settings` - Get all settings
- `GET /api/settings/general` - Get general settings
- `GET /api/settings/social` - Get social settings
- `GET /api/settings/preferences` - Get preference settings
- `PUT /api/settings/general` - Update general settings
- `PUT /api/settings/social` - Update social settings
- `PUT /api/settings/preferences` - Update preference settings

### Users

- `GET /api/users` - Get all users
- `GET /api/users/id/:id` - Get a user by ID
- `GET /api/users/clerk/:clerkId` - Get a user by Clerk ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

## Models

### Post Model

```typescript
interface IPost {
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
```

### Project Model

```typescript
interface IProject {
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
```

### Media Model

```typescript
interface IMedia {
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
```

### Settings Models

```typescript
// General Settings
interface IGeneralSettings {
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

// Social Settings
interface ISocialSettings {
	github: string
	linkedin: string
	twitter: string
	instagram: string
	facebook?: string
	youtube?: string
	createdAt: Date
	updatedAt: Date
}

// Preference Settings
interface IPreferenceSettings {
	enableBlog: boolean
	enableComments: boolean
	enableDarkMode: boolean
	enableAnalytics: boolean
	maintenanceMode?: boolean
	createdAt: Date
	updatedAt: Date
}
```

### User Model

```typescript
interface IUser {
	clerkId: string
	name: string
	email: string
	avatar?: string
	createdAt: Date
	updatedAt: Date
}
```

## Authentication

This API uses a placeholder authentication system designed to work with Clerk
authentication. The authentication middleware
(`src/middleware/authMiddleware.ts`) provides two main functions:

- `protect`: Middleware to protect routes, requiring authentication
- `adminOnly`: Middleware for admin-only routes

To properly implement Clerk authentication:

1. Install Clerk SDK in your Express app:

```bash
npm install @clerk/clerk-sdk-node
```

2. Update the authentication middleware to verify tokens using Clerk's SDK.

Example usage in a route:

```typescript
import { protect, adminOnly } from '../middleware/authMiddleware'

// Protected route
router.post('/', protect, createPost)

// Admin-only route
router.delete('/:id', protect, adminOnly, deletePost)
```

## Error Handling

The API uses a centralized error handling middleware that catches errors and
formats them consistently. Errors are returned in the following format:

```json
{
	"message": "Error message",
	"stack": "Error stack trace (development mode only)"
}
```

## Deployment

### Deploying to a VPS or Dedicated Server

1. Clone the repository on your server
2. Install dependencies: `npm install`
3. Build the app: `npm run build`
4. Set up environment variables in a `.env` file
5. Use a process manager like PM2 to run the app:

```bash
npm install -g pm2
pm2 start dist/server.js --name "express-api"
```

### Deploying to Vercel

1. Update `package.json` to include a Vercel build configuration:

```json
"scripts": {
  "vercel-build": "tsc"
}
```

2. Create a `vercel.json` file:

```json
{
	"version": 2,
	"builds": [
		{
			"src": "dist/server.js",
			"use": "@vercel/node"
		}
	],
	"routes": [
		{
			"src": "/(.*)",
			"dest": "dist/server.js"
		}
	]
}
```

3. Deploy using the Vercel CLI:

```bash
npm install -g vercel
vercel
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for
details.
