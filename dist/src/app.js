"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const mediaRoutes_1 = __importDefault(require("./routes/mediaRoutes"));
const settingsRoutes_1 = __importDefault(require("./routes/settingsRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
// Initialize Express app
const app = (0, express_1.default)();
exports.app = app;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/posts', postRoutes_1.default);
app.use('/api/projects', projectRoutes_1.default);
app.use('/api/media', mediaRoutes_1.default);
app.use('/api/settings', settingsRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});
// Error handling middleware
app.use(errorHandler_1.errorHandler);
