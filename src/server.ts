import app from "./app";
import dotenv from "dotenv";
import sequelize from "./configs/config";
import logger from "./utils/logger";
dotenv.config();


const port = process.env.PORT;

sequelize.authenticate().then(() => {
  logger.info("Database connected!")
}).then(() => {
  app.listen(port, () => {
    logger.info(`Server listening on port: ${port}`)
  })
}).catch((error) => {
  logger.error(error.message)
})
