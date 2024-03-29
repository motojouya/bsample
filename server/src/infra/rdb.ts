import { DataSource, Repository } from "typeorm"
import { list } from "./entity"

export class RecordAlreadyExistError {
  constructor(
    readonly table: string,
    readonly data: object,
    readonly message: string,
  ) {}
}

export class RecordNotFoundError {
  constructor(
    readonly table: string,
    readonly keys: object,
    readonly message: string,
  ) {}
}

// export type TransactCallback<T, R> = (tem: TransactionalEntityManager) => Promise<R>
// export type Transact = (source: DataSource, callback: TransactCallback<T>) => Promise<T>
// export const transact = async (source, callback) => source.manager.transaction(callback);

// export type Transact<T, R> = (records: T, source: DataSource, callback: ((repostories: { [K keyof T]: Repository<T[K]>; }) => Promise<R>)) => Promise<R>
// export const transact = async (records, source, callback) => {
//   return await source.manager.transaction(() => {
//     const repositories = {};
//     for (const key in records) {
//       repositories[key] = source.getRepository(records[key]);
//     }
//     return await callback(repositories);
//   });
// };

export async function transact<T, R>(records: T, source: DataSource, callback: ((repostories: { [K keyof T]: Repository<T[K]>; }) => Promise<R>)): Promise<R> {
  return await source.manager.transaction(() => {
    const repositories = {};
    for (const key in records) {
      repositories[key] = source.getRepository(records[key]);
    }
    return await callback(repositories);
  });
};

export const getDataSource = async () => {
  const ds = new DataSource({
      type: "postgres",
      host: process.env.PG_HOST,
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
