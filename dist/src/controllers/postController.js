"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPostBySlug = exports.getPostById = exports.getFeaturedPosts = exports.getPublishedPosts = exports.getPosts = void 0;
const Post_1 = __importDefault(require("../models/Post"));
// @desc    Get all posts with filters
// @route   GET /api/posts
// @access  Public
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, featured, tag, limit = 10, page = 1 } = req.query;
        // Build filter object
        const filter = {};
        if (status)
            filter.status = status;
        if (featured)
            filter.featured = featured === 'true';
        if (tag)
            filter.tags = { $in: [tag] };
        // Calculate pagination
        const skip = (Number(page) - 1) * Number(limit);
        // Execute query
        const posts = yield Post_1.default.find(filter)
            .sort({ date: -1 })
            .limit(Number(limit))
            .skip(skip);
        // Get total count
        const total = yield Post_1.default.countDocuments(filter);
        res.json({
            posts,
            pagination: {
                total,
                page: Number(page),
                pages: Math.ceil(total / Number(limit)),
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Server error',
        });
    }
});
exports.getPosts = getPosts;
// @desc    Get published posts
// @route   GET /api/posts/published
// @access  Public
const getPublishedPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit = 10, page = 1 } = req.query;
        // Calculate pagination
        const skip = (Number(page) - 1) * Number(limit);
        // Execute query
        const posts = yield Post_1.default.find({ status: 'published' })
            .sort({ date: -1 })
            .limit(Number(limit))
            .skip(skip);
        // Get total count
        const total = yield Post_1.default.countDocuments({ status: 'published' });
        res.json({
            posts,
            pagination: {
                total,
                page: Number(page),
                pages: Math.ceil(total / Number(limit)),
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Server error',
        });
    }
});
exports.getPublishedPosts = getPublishedPosts;
// @desc    Get featured posts
// @route   GET /api/posts/featured
// @access  Public
const getFeaturedPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find({
            featured: true,
            status: 'published',
        })
            .sort({ date: -1 })
            .limit(6);
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Server error',
        });
    }
});
exports.getFeaturedPosts = getFeaturedPosts;
// @desc    Get a post by ID
// @route   GET /api/posts/id/:id
// @access  Public
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Server error',
        });
    }
});
exports.getPostById = getPostById;
// @desc    Get a post by slug
// @route   GET /api/posts/slug/:slug
// @access  Public
const getPostBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findOne({ slug: req.params.slug });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Server error',
        });
    }
});
exports.getPostBySlug = getPostBySlug;
// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if slug already exists
        const existingPost = yield Post_1.default.findOne({ slug: req.body.slug });
        if (existingPost) {
            return res.status(400).json({ message: 'Slug already exists' });
        }
        const post = new Post_1.default(req.body);
        const createdPost = yield post.save();
        res.status(201).json(createdPost);
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Invalid post data',
        });
    }
});
exports.createPost = createPost;
// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        // Check if slug is changed and already exists
        if (req.body.slug && req.body.slug !== post.slug) {
            const existingPost = yield Post_1.default.findOne({ slug: req.body.slug });
            if (existingPost) {
                return res.status(400).json({ message: 'Slug already exists' });
            }
        }
        const updatedPost = yield Post_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.json(updatedPost);
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Invalid post data',
        });
    }
});
exports.updatePost = updatePost;
// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        yield Post_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post removed' });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Server error',
        });
    }
});
exports.deletePost = deletePost;
