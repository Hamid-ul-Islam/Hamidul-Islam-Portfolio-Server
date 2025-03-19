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
exports.deleteMedia = exports.updateMedia = exports.uploadMedia = exports.getMediaById = exports.getAllMedia = void 0;
const Media_1 = __importDefault(require("../models/Media"));
// @desc    Get all media items
// @route   GET /api/media
// @access  Public
const getAllMedia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit = 20, page = 1, type } = req.query;
        // Build filter object
        const filter = {};
        if (type)
            filter.type = type;
        // Calculate pagination
        const skip = (Number(page) - 1) * Number(limit);
        // Execute query
        const mediaItems = yield Media_1.default.find(filter)
            .sort({ uploadedAt: -1 })
            .limit(Number(limit))
            .skip(skip);
        // Get total count
        const total = yield Media_1.default.countDocuments(filter);
        res.json({
            media: mediaItems,
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
exports.getAllMedia = getAllMedia;
// @desc    Get a media item by ID
// @route   GET /api/media/:id
// @access  Public
const getMediaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const media = yield Media_1.default.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }
        res.json(media);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Server error',
        });
    }
});
exports.getMediaById = getMediaById;
// @desc    Upload a media item
// @route   POST /api/media
// @access  Private
const uploadMedia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Note: In a real-world scenario, you would handle file uploads here
        // using a library like multer, and possibly upload to a cloud storage
        // This is a simplified version
        const mediaData = {
            name: req.body.name,
            url: req.body.url,
            type: req.body.type,
            size: req.body.size,
            dimensions: req.body.dimensions,
            uploadedAt: new Date().toISOString(),
        };
        const media = new Media_1.default(mediaData);
        const uploadedMedia = yield media.save();
        res.status(201).json(uploadedMedia);
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Invalid media data',
        });
    }
});
exports.uploadMedia = uploadMedia;
// @desc    Update a media item
// @route   PUT /api/media/:id
// @access  Private
const updateMedia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const media = yield Media_1.default.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }
        const updatedMedia = yield Media_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.json(updatedMedia);
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Invalid media data',
        });
    }
});
exports.updateMedia = updateMedia;
// @desc    Delete a media item
// @route   DELETE /api/media/:id
// @access  Private
const deleteMedia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const media = yield Media_1.default.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }
        // Note: In a real-world scenario, you would also delete the file from storage
        yield Media_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'Media removed' });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Server error',
        });
    }
});
exports.deleteMedia = deleteMedia;
