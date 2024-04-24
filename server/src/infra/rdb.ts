import { DataSource, EntityManager } from 'typeorm';
import { list } from 'src/entity/index.js';

export class RecordAlreadyExistError extends Error {
  constructor(
    readonly table: string,
    readonly data: object,
    readonly message: string,
  ) {
    super();
  }
}

export class RecordNotFoundError extends Error {
  constructor(
    readonly table: string,
    readonly keys: object,
    readonly message: string,
  ) {
    super();
  }
}

export async function transact<T>(source: DataSource, callback: (manager: EntityManager) => Promise<T>): Promise<T> {
  const queryRunner = source.createQueryRunner();
  await queryRunner.connect();

  await queryRunner.startTransaction();

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
    type: 'postgres',
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT as string), // TODO 本当はnull checkしたほうがいい
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
