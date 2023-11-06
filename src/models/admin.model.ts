import sequelize from "../configs/config";
import { Model, Optional, DataTypes, } from "sequelize";
import logger from "../utils/logger";

import { AdminInterface } from "../interfaces/admin.interface";


type AdminInterfaceOption = Optional<AdminInterface, "id" | "createdAt" | "updatedAt" | "cloudId" | "imageUrl" | "isAdmin" | "token" | "verified">;

class Admin extends Model<AdminInterface, AdminInterfaceOption> implements AdminInterface {
  declare id: number;
  declare fullName: string;
  declare password: string;
  declare email: string;
  declare createdAt: Date;
  declare updatedAt: Date
  declare token: string;
  declare imageUrl: string;
  declare phoneNumber: string;
  declare aboutAuthor: string;
  declare typeOfAdmin: string;
  declare address: string;
  declare socialMediaHandle: string;
  declare isAdmin: boolean;
  declare verified: boolean;
  declare verifyNumber: string;
  declare cloudId: string;
};

Admin.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  typeOfAdmin: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "Self published"
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  socialMediaHandle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  aboutAuthor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  verifyNumber: {
    type: DataTypes.STRING,
  },
  cloudId: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
}, {
  sequelize,
  tableName: 'admin'
});

// Admin.sync({ alter: true }).then(() => {
//   logger.info("Table created Success!")
// }).catch((error) => {
//   logger.error(error.message)
// });

export default Admin;