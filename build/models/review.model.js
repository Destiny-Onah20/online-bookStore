"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../configs/config"));
const sequelize_1 = require("sequelize");
const book_model_1 = __importDefault(require("./book.model"));
const logger_1 = __importDefault(require("../utils/logger"));
;
class Review extends sequelize_1.Model {
}
;
Review.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    bookId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    comment: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
}, {
    sequelize: config_1.default,
    tableName: "reviews"
});
Review.belongsToMany(book_model_1.default, {
    foreignKey: "bookId", otherKey: "userId",
    through: "id"
});
book_model_1.default.hasMany(Review, { foreignKey: "bookId" });
Review.sync({ alter: true }).then(() => {
    logger_1.default.info("Order Table created!");
}).catch((error) => {
    logger_1.default.info(error.message);
});
exports.default = Review;
