"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./configs/config"));
const logger_1 = __importDefault(require("./utils/logger"));
dotenv_1.default.config();
const port = process.env.PORT;
config_1.default.authenticate().then(() => {
    logger_1.default.info("Database connected!");
}).then(() => {
    app_1.default.listen(port, () => {
        logger_1.default.info(`Server listening on port: ${port}`);
    });
}).catch((error) => {
    logger_1.default.error(error.message);
});
