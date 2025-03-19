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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePreferenceSettings = exports.updateSocialSettings = exports.updateGeneralSettings = exports.getPreferenceSettings = exports.getSocialSettings = exports.getGeneralSettings = exports.getAllSettings = void 0;
const Settings_1 = require("../models/Settings");
// @desc    Get all settings
// @route   GET /api/settings
// @access  Public
const getAllSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const general = yield (0, Settings_1.getSettingsByType)('general');
        const social = yield (0, Settings_1.getSettingsByType)('social');
        const preferences = yield (0, Settings_1.getSettingsByType)('preferences');
        res.json({
            general,
            social,
            preferences,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Server error',
        });
    }
});
exports.getAllSettings = getAllSettings;
// @desc    Get general settings
// @route   GET /api/settings/general
// @access  Public
const getGeneralSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const settings = yield (0, Settings_1.getSettingsByType)('general');
        res.json(settings);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Server error',
        });
    }
});
exports.getGeneralSettings = getGeneralSettings;
// @desc    Get social settings
// @route   GET /api/settings/social
// @access  Public
const getSocialSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const settings = yield (0, Settings_1.getSettingsByType)('social');
        res.json(settings);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Server error',
        });
    }
});
exports.getSocialSettings = getSocialSettings;
// @desc    Get preference settings
// @route   GET /api/settings/preferences
// @access  Public
const getPreferenceSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const settings = yield (0, Settings_1.getSettingsByType)('preferences');
        res.json(settings);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Server error',
        });
    }
});
exports.getPreferenceSettings = getPreferenceSettings;
// @desc    Update general settings
// @route   PUT /api/settings/general
// @access  Private
const updateGeneralSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const settings = yield (0, Settings_1.updateSettingsByType)('general', req.body);
        res.json(settings);
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Invalid settings data',
        });
    }
});
exports.updateGeneralSettings = updateGeneralSettings;
// @desc    Update social settings
// @route   PUT /api/settings/social
// @access  Private
const updateSocialSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const settings = yield (0, Settings_1.updateSettingsByType)('social', req.body);
        res.json(settings);
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Invalid settings data',
        });
    }
});
exports.updateSocialSettings = updateSocialSettings;
// @desc    Update preference settings
// @route   PUT /api/settings/preferences
// @access  Private
const updatePreferenceSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const settings = yield (0, Settings_1.updateSettingsByType)('preferences', req.body);
        res.json(settings);
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Invalid settings data',
        });
    }
});
exports.updatePreferenceSettings = updatePreferenceSettings;
