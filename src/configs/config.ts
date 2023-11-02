import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: <any>process.env.DB_PORT,
  dialect: "mysql",
  define: {
    timestamps: true
  }
});

export default sequelize;