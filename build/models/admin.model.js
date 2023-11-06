"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../configs/config"));
const sequelize_1 = require("sequelize");
class Admin extends sequelize_1.Model {
}
;
Admin.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    typeOfAdmin: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "Self published"
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    socialMediaHandle: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    aboutAuthor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    isAdmin: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    verifyNumber: {
        type: sequelize_1.DataTypes.STRING,
    },
    cloudId: {
        type: sequelize_1.DataTypes.STRING,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
}, {
    sequelize: config_1.default,
    tableName: 'admin'
});
// Admin.sync({ alter: true }).then(() => {
//   logger.info("Table created Success!")
// }).catch((error) => {
//   logger.error(error.message)
// });
exports.default = Admin;
