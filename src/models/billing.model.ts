import sequelize from "../configs/config";
import { Model, Optional, DataTypes } from "sequelize";
import { BillingInterface } from "../interfaces/billing.interface";
import logger from "../utils/logger";
import Users from "./users.model";

type billingOptions = Optional<BillingInterface, "id" | "createdAt" | "updatedAt">;

class Billing extends Model<BillingInterface, billingOptions> implements BillingInterface {
  public id!: number;
  public fullName!: string;
  public email!: string;
  public phoneNumber!: string;
  public user!: number;
  public country!: string;
  public homeAddress!: string;
  public state!: string;
  public town!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Billing.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  town: {
    type: DataTypes.STRING,
    allowNull: false
  },
  homeAddress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
}, {
  sequelize,
  tableName: "billing"
});

Billing.belongsTo(Users, { foreignKey: "user" });
Users.hasMany(Billing, { foreignKey: "user" })

// Billing.sync({ alter: true }).then(() => {
//   logger.info("Table created Success!")
// }).catch((error) => {
//   logger.error(error.message)
// });

export default Billing;