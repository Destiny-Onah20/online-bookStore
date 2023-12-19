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
exports.emailQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const bull_board_1 = require("bull-board");
const bullAdapter_1 = require("bull-board/bullAdapter");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.emailQueue = new bull_1.default("email", {
    redis: process.env.REDIS_UR
});
const { setQueues } = (0, bull_board_1.createBullBoard)([]);
setQueues([
    new bullAdapter_1.BullAdapter(exports.emailQueue)
]);
const sendMail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.emailQueue.add(data, {});
});
exports.default = sendMail;
