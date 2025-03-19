"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const settingsController_1 = require("../controllers/settingsController");
const router = express_1.default.Router();
// GET /api/settings - Get all settings
router.get('/', settingsController_1.getAllSettings);
// GET /api/settings/general - Get general settings
router.get('/general', settingsController_1.getGeneralSettings);
// GET /api/settings/social - Get social settings
router.get('/social', settingsController_1.getSocialSettings);
// GET /api/settings/preferences - Get preference settings
router.get('/preferences', settingsController_1.getPreferenceSettings);
// PUT /api/settings/general - Update general settings
router.put('/general', settingsController_1.updateGeneralSettings);
// PUT /api/settings/social - Update social settings
router.put('/social', settingsController_1.updateSocialSettings);
// PUT /api/settings/preferences - Update preference settings
router.put('/preferences', settingsController_1.updatePreferenceSettings);
exports.default = router;
