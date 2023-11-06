import sequelize from "../configs/config";
import { Model, Optional, DataTypes, STRING } from "sequelize";

import { UsersInterface } from "../interfaces/users.interface";
import logger from "../utils/logger";


class Users extends Model<UsersInterface> implements UsersInterface {
  declare id: number;
  declare user_id: string;
  declare username: string;
  declare email: string;
  declare password: string;
  declare token: string;
  declare profileImage: string | undefined;
  declare verify: boolean;
  declare verifyNumber: string;
  declare cloudId: string;
  declare createdAt: Date;
  declare updatedAt: Date
};


Users.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profileImage: {
    type: DataTypes.STRING,
  },
  verify: {
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
  tableName: 'users'
});


// Users.sync({ alter: true }).then(() => {
//   logger.info("Table created Success!")
// }).catch((error) => {
//   logger.error(error.message)
// });

export default Users;