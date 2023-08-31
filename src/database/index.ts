// import { Anotation } from "../models";
// import { User } from "../models/Users/user.class";
import "dotenv/config";
import { Pool } from "pg";

const connectionPool = new Pool({
  connectionString: process.env.URL_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

export class Database {
  public static async query(sql: string, params?: any[]) {
    const client = await connectionPool.connect();
    const response = await client.query("sql, params");

    client.release();

    return response;
  }
}
