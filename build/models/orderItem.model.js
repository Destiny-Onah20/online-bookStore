"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../configs/config"));
const sequelize_1 = require("sequelize");
const users_model_1 = __importDefault(require("./users.model"));
class OrderItems extends sequelize_1.Model {
}
OrderItems.init({
    orderItemId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    customerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    totalPrice: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
}, {
    sequelize: config_1.default,
    tableName: "orderItems",
});
OrderItems.belongsTo(users_model_1.default, { foreignKey: "customerId" });
users_model_1.default.hasMany(OrderItems, { foreignKey: "customerId" });
// Order.sync({ alter: true }).then(() => {
//   logger.info("Order Table created!")
// }).catch((error) => {
//   logger.info(error.message)
// });
exports.default = OrderItems;
