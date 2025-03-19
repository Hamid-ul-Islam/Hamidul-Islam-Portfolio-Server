"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const router = express_1.default.Router();
// GET /api/projects - Get all projects
router.get('/', projectController_1.getProjects);
// GET /api/projects/featured - Get featured projects
router.get('/featured', projectController_1.getFeaturedProjects);
// GET /api/projects/:id - Get a project by ID
router.get('/id/:id', projectController_1.getProjectById);
// GET /api/projects/slug/:slug - Get a project by slug
router.get('/slug/:slug', projectController_1.getProjectBySlug);
// POST /api/projects - Create a new project
router.post('/', projectController_1.createProject);
// PUT /api/projects/:id - Update a project
router.put('/:id', projectController_1.updateProject);
// DELETE /api/projects/:id - Delete a project
router.delete('/:id', projectController_1.deleteProject);
exports.default = router;
