import sequelize from "../configs/config";
import { Model, DataTypes, Optional } from "sequelize";
import { BookInterface } from "../interfaces/books.interface";
import logger from "../utils/logger";
import Admin from "./admin.model";

type BookOptionalInterfaces = Optional<BookInterface, "id" | "updatedAt" | "createdAt">;

class Book extends Model<BookInterface, BookOptionalInterfaces> implements BookInterface {
  declare id: number;
  declare adminId: number;
  declare title: string;
  declare description: string;
  declare author: string;
  declare bookImage: string;
  declare cloudId: string;
  declare price: number;
  declare stock: number;
  declare createdAt: Date;
  declare updatedAt: Date;
};

Book.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bookImage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cloudId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  tableName: "Book"
});

Book.belongsTo(Admin, { foreignKey: "adminId" });
Admin.hasMany(Book, { foreignKey: "adminId" })

// Book.sync({ alter: true }).then(() => {
//   logger.info("Table created Success!")
// }).catch((error) => {
//   logger.error(error.message)
// });

export default Book;