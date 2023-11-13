import sequelize from "../configs/config";
import orderItems from "../models/orderItem.model";
import logger from "../utils/logger";
import { paymentInterface } from "../interfaces/payment.interface";
import { Model, DataTypes, Optional } from "sequelize";


type OptionalPaymentFields = Optional<paymentInterface, "id" | "createdAt" | "updatedAt">

class Payment extends Model<paymentInterface, OptionalPaymentFields> implements paymentInterface {
  declare id: number;
  declare orderId: number;
  declare totalAmount: number;
  declare status: boolean;
  declare createdAt: Date;
  declare updatedAt: Date
}

Payment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalAmount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
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
  }
}, {
  sequelize,
  tableName: 'payments'
});

Payment.belongsTo(orderItems, { foreignKey: "orderId" });
orderItems.hasMany(Payment, { foreignKey: "orderId" });

Payment.sync({ alter: true }).then(() => {
  logger.info("Order Table created!")
}).catch((error) => {
  logger.info(error.message)
});

export default Payment;