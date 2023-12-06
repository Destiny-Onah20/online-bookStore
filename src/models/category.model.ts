import sequelize from "../configs/config";
import { Model, DataTypes, Optional, UUID } from "sequelize";
import logger from "../utils/logger";

interface categoryInterface {
  id: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
};




class Category extends Model<categoryInterface> implements categoryInterface {
  declare id: number;
  declare category: string;
  declare updatedAt: Date;
  declare createdAt: Date;
}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
}, {
  sequelize,
  tableName: "category"
});

// Category.sync({ alter: true }).then(() => {
//   logger.info("Category Table created!")
// }).catch((error) => {
//   logger.info(error.message)
// });

export default Category;