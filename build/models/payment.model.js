"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../configs/config"));
const orderItem_model_1 = __importDefault(require("../models/orderItem.model"));
const sequelize_1 = require("sequelize");
class Payment extends sequelize_1.Model {
}
Payment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    totalAmount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    reference: {
        type: sequelize_1.DataTypes.STRING,
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
    }
}, {
    sequelize: config_1.default,
    tableName: 'payments'
});
Payment.belongsTo(orderItem_model_1.default, { foreignKey: "orderId" });
orderItem_model_1.default.hasMany(Payment, { foreignKey: "orderId" });
// Payment.sync({ alter: true }).then(() => {
//   logger.info("Order Table created!")
// }).catch((error) => {
//   logger.info(error.message)
// });
exports.default = Payment;
