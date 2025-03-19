"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.PreferenceSettings = exports.SocialSettings = exports.GeneralSettings = void 0;
exports.getSettingsByType = getSettingsByType;
exports.updateSettingsByType = updateSettingsByType;
const mongoose_1 = __importStar(require("mongoose"));
// General Settings Schema
const generalSettingsSchema = new mongoose_1.Schema({
    siteTitle: {
        type: String,
        required: true,
        default: 'Portfolio & Blog',
    },
    siteDescription: {
        type: String,
        required: true,
        default: 'Full Stack Developer specializing in Next.js and TypeScript',
    },
    contactEmail: {
        type: String,
        required: true,
        default: 'contact@example.com',
    },
    phoneNumber: {
        type: String,
        required: false,
        default: '',
    },
    location: {
        type: String,
        required: false,
        default: '',
    },
    resumeUrl: {
        type: String,
        required: false,
        default: '',
    },
    footerText: {
        type: String,
        required: true,
        default: `© ${new Date().getFullYear()} Portfolio. All rights reserved.`,
    },
}, { timestamps: true });
// Social Settings Schema
const socialSettingsSchema = new mongoose_1.Schema({
    github: {
        type: String,
        default: 'https://github.com',
    },
    linkedin: {
        type: String,
        default: 'https://linkedin.com',
    },
    twitter: {
        type: String,
        default: 'https://twitter.com',
    },
    instagram: {
        type: String,
        default: '',
    },
    facebook: {
        type: String,
        default: '',
    },
    youtube: {
        type: String,
        default: '',
    },
}, { timestamps: true });
// Preference Settings Schema
const preferenceSettingsSchema = new mongoose_1.Schema({
    enableBlog: {
        type: Boolean,
        default: true,
    },
    enableComments: {
        type: Boolean,
        default: true,
    },
    enableDarkMode: {
        type: Boolean,
        default: true,
    },
    enableAnalytics: {
        type: Boolean,
        default: false,
    },
    maintenanceMode: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
// Create models
exports.GeneralSettings = mongoose_1.default.model('GeneralSettings', generalSettingsSchema);
exports.SocialSettings = mongoose_1.default.model('SocialSettings', socialSettingsSchema);
exports.PreferenceSettings = mongoose_1.default.model('PreferenceSettings', preferenceSettingsSchema);
/**
 * Helper function to get settings by type
 */
function getSettingsByType(type) {
    return __awaiter(this, void 0, void 0, function* () {
        let Model;
        switch (type) {
            case 'general':
                Model = exports.GeneralSettings;
                break;
            case 'social':
                Model = exports.SocialSettings;
                break;
            case 'preferences':
                Model = exports.PreferenceSettings;
                break;
            default:
                throw new Error(`Invalid setting type: ${type}`);
        }
        // Try to get existing settings
        let settings = yield Model.findOne().lean();
        // If no settings exist, create a new document with default values
        if (!settings) {
            const newSettings = new Model();
            const savedSettings = yield newSettings.save();
            // Convert to plain object
            settings = savedSettings.toObject();
        }
        return settings;
    });
}
/**
 * Helper function to update settings by type
 */
function updateSettingsByType(type, data) {
    return __awaiter(this, void 0, void 0, function* () {
        let Model;
        switch (type) {
            case 'general':
                Model = exports.GeneralSettings;
                break;
            case 'social':
                Model = exports.SocialSettings;
                break;
            case 'preferences':
                Model = exports.PreferenceSettings;
                break;
            default:
                throw new Error(`Invalid setting type: ${type}`);
        }
        // Find the first document and update it (or create if it doesn't exist)
        const updated = yield Model.findOneAndUpdate({}, // Empty filter to match first document
        { $set: data }, {
            new: true, // Return the updated document
            upsert: true, // Create if it doesn't exist
            setDefaultsOnInsert: true, // Use schema defaults if creating
            runValidators: true, // Run validators
        }).lean();
        return updated;
    });
}
