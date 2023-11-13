import sequelize from "../configs/config";
import { FullOrderBody } from "../interfaces/orderitems.interface";
import { Model, DataTypes, Optional } from "sequelize";
import Users from "./users.model";
import logger from "../utils/logger";


type fullOrderOptions = Optional<FullOrderBody, "createdAt" | "updatedAt" | "orderItemId">;

class OrderItems extends Model<FullOrderBody, fullOrderOptions> implements fullOrderOptions {
  declare orderItemId: number;
  declare customerId: number;
  declare totalPrice: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

OrderItems.init({
  orderItemId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
}, {
  sequelize,
  tableName: "orderItems",
}
);

OrderItems.belongsTo(Users, { foreignKey: "customerId" });
Users.hasMany(OrderItems, { foreignKey: "customerId" });


// OrderItems.sync({ alter: true }).then(() => {
//   logger.info("Order Table created!")
// }).catch((error) => {
//   logger.info(error.message)
// });

export default OrderItems;