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
exports.validateAdmin = exports.validateUserInput = void 0;
const zod_1 = require("zod");
const schemaObj = zod_1.z.object({
    body: zod_1.z.object({}),
    query: zod_1.z.object({}),
    params: zod_1.z.object({}),
});
const validateUserInput = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        schemaObj.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        yield schema.parseAsync(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const theExpectedZodErrorMessage = error.errors.map((error) => error.message);
            return res.status(400).json({
                message: theExpectedZodErrorMessage[0]
            });
        }
        return res.status(500).json({
            message: error.message,
            status: "zod Failed",
        });
    }
});
exports.validateUserInput = validateUserInput;
const validateAdmin = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        schemaObj.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        yield schema.parseAsync(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const theExpectedZodErrorMessage = error.errors.map((error) => error.message);
            return res.status(400).json({
                message: theExpectedZodErrorMessage[0]
            });
        }
        return res.status(500).json({
            message: error.message,
            status: "zod Failed",
        });
    }
});
exports.validateAdmin = validateAdmin;
