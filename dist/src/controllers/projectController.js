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
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectBySlug = exports.getProjectById = exports.getFeaturedProjects = exports.getProjects = void 0;
const Project_1 = __importDefault(require("../models/Project"));
// @desc    Get all projects with filters
// @route   GET /api/projects
// @access  Public
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const projects = yield Project_1.default.find(filter)
            .sort({ date: -1 })
            .limit(Number(limit))
            .skip(skip);
        // Get total count
        const total = yield Project_1.default.countDocuments(filter);
        res.json({
            projects,
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
exports.getProjects = getProjects;
// @desc    Get featured projects
// @route   GET /api/projects/featured
// @access  Public
const getFeaturedProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield Project_1.default.find({
            featured: true,
            status: 'published',
        })
            .sort({ date: -1 })
            .limit(6);
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Server error',
        });
    }
});
exports.getFeaturedProjects = getFeaturedProjects;
// @desc    Get a project by ID
// @route   GET /api/projects/id/:id
// @access  Public
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project_1.default.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Server error',
        });
    }
});
exports.getProjectById = getProjectById;
// @desc    Get a project by slug
// @route   GET /api/projects/slug/:slug
// @access  Public
const getProjectBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project_1.default.findOne({ slug: req.params.slug });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Server error',
        });
    }
});
exports.getProjectBySlug = getProjectBySlug;
// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if slug already exists
        const existingProject = yield Project_1.default.findOne({ slug: req.body.slug });
        if (existingProject) {
            return res.status(400).json({ message: 'Slug already exists' });
        }
        const project = new Project_1.default(req.body);
        const createdProject = yield project.save();
        res.status(201).json(createdProject);
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Invalid project data',
        });
    }
});
exports.createProject = createProject;
// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project_1.default.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        // Check if slug is changed and already exists
        if (req.body.slug && req.body.slug !== project.slug) {
            const existingProject = yield Project_1.default.findOne({ slug: req.body.slug });
            if (existingProject) {
                return res.status(400).json({ message: 'Slug already exists' });
            }
        }
        const updatedProject = yield Project_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.json(updatedProject);
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Invalid project data',
        });
    }
});
exports.updateProject = updateProject;
// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project_1.default.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        yield Project_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project removed' });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Server error',
        });
    }
});
exports.deleteProject = deleteProject;
