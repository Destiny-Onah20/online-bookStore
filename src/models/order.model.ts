import sequelize from "../configs/config";
import logger from "../utils/logger";
import { Model, DataTypes, Optional } from "sequelize";
import { OrderItems } from "../interfaces/order.interface"
import Admin from "./admin.model";
import Users from "./users.model";

type orderOptionals = Optional<OrderItems, "id" | "createdAt" | "updatedAt">;

class Order extends Model<OrderItems, orderOptionals> implements OrderItems {
  declare id: number;
  declare customerId: number;
  declare adminId: number;
  declare bookId: number;
  declare quantity: number;
  declare price: number;
  declare createdAt: Date;
  declare updatedAt: Date;
};


Order.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price: {
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
  tableName: "orders"
});

Order.belongsTo(Users, { foreignKey: "customerId" });
Users.hasMany(Order, { foreignKey: "customerId" });


// Order.sync({ alter: true }).then(() => {
//   logger.info("Order Table created!")
// }).catch((error) => {
//   logger.info(error.message)
// });

export default Order;