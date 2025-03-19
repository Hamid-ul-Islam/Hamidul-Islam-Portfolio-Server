"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const router = express_1.default.Router();
// GET /api/posts - Get all posts
router.get('/', postController_1.getPosts);
// GET /api/posts/published - Get published posts
router.get('/published', postController_1.getPublishedPosts);
// GET /api/posts/featured - Get featured posts
router.get('/featured', postController_1.getFeaturedPosts);
// GET /api/posts/id/:id - Get a post by ID
router.get('/id/:id', postController_1.getPostById);
// GET /api/posts/slug/:slug - Get a post by slug
router.get('/slug/:slug', postController_1.getPostBySlug);
// POST /api/posts - Create a new post
router.post('/', postController_1.createPost);
// PUT /api/posts/:id - Update a post
router.put('/:id', postController_1.updatePost);
// DELETE /api/posts/:id - Delete a post
router.delete('/:id', postController_1.deletePost);
exports.default = router;
