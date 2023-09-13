import { DataSource } from "typeorm";
import configs from "./ormconfig";

export const dataSource = new DataSource(configs);
