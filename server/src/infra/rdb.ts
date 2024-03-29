import { DataSource } from "typeorm"
import { list } from "./entity"

export const getDataSource = async () => {
  const ds = new DataSource({
      type: "postgres",
      host: "rdb",
      port: process.env.PG_PORT,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      synchronize: true,
      logging: false,
      entities: list,
      migrations: [],
      subscribers: [],
  });
  await ds.initialize();
  return ds;
};
