"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../configs/config"));
const sequelize_1 = require("sequelize");
const logger_1 = __importDefault(require("../utils/logger"));
;
class Category extends sequelize_1.Model {
}
Category.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
}, {
    sequelize: config_1.default,
    tableName: "category"
});
Category.sync({ alter: true }).then(() => {
    logger_1.default.info("Order Table created!");
}).catch((error) => {
    logger_1.default.info(error.message);
});
exports.default = Category;
