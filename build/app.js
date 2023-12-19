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
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const bull_board_1 = require("bull-board");
const express_rate_limit_1 = require("express-rate-limit");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const admin_route_1 = __importDefault(require("./routes/admin.route"));
const book_route_1 = __importDefault(require("./routes/book.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const orderItem_router_1 = __importDefault(require("./routes/orderItem.router"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const billing_route_1 = __importDefault(require("./routes/billing.route"));
const email_queue_1 = __importDefault(require("./queues/email.queue"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
const { router } = (0, bull_board_1.createBullBoard)([]);
app.use("/admin/queue", router);
const limiter = (0, express_rate_limit_1.rateLimit)({
    max: 3,
    windowMs: 60 * 60 * 1000,
    message: (req, res) => {
        return res.status(400).json({
            message: "Too many request from this IP address, Please try again later!"
        });
    }
});
app.post("/send-mail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, email_queue_1.default)(req.body);
    res.send("ok");
}));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/admin/login", limiter);
app.use((0, express_fileupload_1.default)({
    useTempFiles: true
}));
app.set('view engine', 'pug');
app.set('view', path_1.default.join(__dirname, 'public'));
app.use("/api/v1", user_route_1.default);
app.use("/api/v1", admin_route_1.default);
app.use("/api/v1", book_route_1.default);
app.use("/api/v1", order_route_1.default);
app.use("/api/v1", orderItem_router_1.default);
app.use("/api/v1", category_route_1.default);
app.use("/api/v1", billing_route_1.default);
app.all("*", (req, res) => {
    res.status(404).json({
        message: `This Route ${req.originalUrl} does not exist on this Server`
    });
});
exports.default = app;
