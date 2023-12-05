import sequelize from "../configs/config";
import { Model, DataTypes, Optional } from "sequelize";
import Book from "./book.model";
import logger from "../utils/logger";

interface ReviewInterface {
  id: number;
  bookId: number;
  userId: number;
  comment: string,
  rating: number;
  createdAt: Date;
  updatedAt: Date
};

type reviewOptions = Optional<ReviewInterface, "id" | "updatedAt" | "createdAt">;

class Review extends Model<ReviewInterface, reviewOptions> implements ReviewInterface {
  declare id: number;
  declare bookId: number;
  declare userId: number;
  declare comment: string;
  declare rating: number;
  declare updatedAt: Date;
  declare createdAt: Date;
};

Review.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rating: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
}, {
  sequelize,
  tableName: "reviews"
});

Review.belongsToMany(Book, {
  foreignKey: "bookId", otherKey: "userId",
  through: "id"
});
Book.hasMany(Review, { foreignKey: "bookId" });

Review.sync({ alter: true }).then(() => {
  logger.info("Order Table created!")
}).catch((error) => {
  logger.info(error.message)
});

export default Review;