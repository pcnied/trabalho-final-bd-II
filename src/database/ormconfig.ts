import "dotenv/config";
import { DataSourceOptions } from "typeorm";

const basePath = process.env.NODE_ENV === "dev" ? "src" : "dist";

const configs: DataSourceOptions = {
  type: "postgres",
  url: process.env.URL_DATABASE,
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: [`${basePath}/database/entities/**/*`],
  migrations: [`${basePath}/database/migrations/**/*`],
  ssl: {
    rejectUnauthorized: false,
  },
};

export default configs;
