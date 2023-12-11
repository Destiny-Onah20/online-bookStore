"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../configs/config"));
const sequelize_1 = require("sequelize");
const admin_model_1 = __importDefault(require("./admin.model"));
class Book extends sequelize_1.Model {
    static search(query) {
        return Book.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        title: {
                            [sequelize_1.Op.like]: `%${query}%`,
                        },
                    },
                    {
                        author: {
                            [sequelize_1.Op.like]: `%${query}%`,
                        },
                    }
                ],
            },
        });
    }
}
;
Book.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    adminId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    bookImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    cloudId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    pdfFile: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    pdfCloudId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize: config_1.default,
    tableName: "Book"
});
Book.belongsTo(admin_model_1.default, { foreignKey: "adminId" });
admin_model_1.default.hasMany(Book, { foreignKey: "adminId" });
// Book.sync({ alter: true }).then(() => {
//   logger.info("Table created Success!")
// }).catch((error) => {
//   logger.error(error.message)
// });
exports.default = Book;
