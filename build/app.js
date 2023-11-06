"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const admin_route_1 = __importDefault(require("./routes/admin.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.set('view engine', 'pug');
app.set('view', path_1.default.join(__dirname, 'public'));
app.use("/api/v1", user_route_1.default);
app.use("/api/v1", admin_route_1.default);
app.all("*", (req, res) => {
    res.status(404).json({
        message: `This Route ${req.originalUrl} does not exist on this Server`
    });
});
exports.default = app;
