import { DataSource, QueryRunner } from "typeorm";
import configs from "./ormconfig";

export const pgHelper = {
  client: null as unknown as DataSource,

  async connect(): Promise<void> {
    this.client = new DataSource(configs);
    await this.client.initialize();
  },

  async disconnect(): Promise<void> {
    await this.client.destroy();
    this.client = null as any;
  },
};
