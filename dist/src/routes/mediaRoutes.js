"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mediaController_1 = require("../controllers/mediaController");
const router = express_1.default.Router();
// GET /api/media - Get all media items
router.get('/', mediaController_1.getAllMedia);
// GET /api/media/:id - Get a media item by ID
router.get('/:id', mediaController_1.getMediaById);
// POST /api/media - Upload a media item
router.post('/', mediaController_1.uploadMedia);
// PUT /api/media/:id - Update a media item
router.put('/:id', mediaController_1.updateMedia);
// DELETE /api/media/:id - Delete a media item
router.delete('/:id', mediaController_1.deleteMedia);
exports.default = router;
