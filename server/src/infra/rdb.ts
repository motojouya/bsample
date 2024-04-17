import { DataSource, EntityManager } from "typeorm"
import { list } from "entity"

export class RecordAlreadyExistError extends Error {
  constructor(
    readonly table: string,
    readonly data: object,
    readonly message: string,
  ) { super(); }
}

export class RecordNotFoundError extends Error {
  constructor(
    readonly table: string,
    readonly keys: object,
    readonly message: string,
  ) { super(); }
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

// export async function transact<T, R>(records: T, source: DataSource, callback: ((repostories: { [K keyof T]: Repository<T[K]>; }) => Promise<R>)): Promise<R> {
//   const queryRunner = source.createQueryRunner();
//   await queryRunner.connect();
// 
//   // TODO managerから、entityを指定して、型安全に取得できるっぽいのでmanagerを渡す形でもいいかも
//   // https://typeorm.io/working-with-entity-manager
//   const manager = queryRunner.manager;
//   const repositories = {};
//   for (const key in records) {
//     repositories[key] = manager.getRepository(records[key]);
//   }
// 
//   const result = await callback(repositories);
// 
//   if (result instanceof Error) {
//     await queryRunner.rollbackTransaction();
//   } else {
//     await queryRunner.commitTransaction();
//   }
//   await queryRunner.release();
// 
//   return result;
// }

export async function transact<T>(source: DataSource, callback: ((manager: EntityManager) => Promise<T>)): Promise<T> {
  const queryRunner = source.createQueryRunner();
  await queryRunner.connect();

  const result = await callback(queryRunner.manager);

  if (result instanceof Error) {
    await queryRunner.rollbackTransaction();
  } else {
    await queryRunner.commitTransaction();
  }
  await queryRunner.release();

  return result;
}

export const getDataSource = async () => {
  const ds = new DataSource({
      type: "postgres",
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
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
